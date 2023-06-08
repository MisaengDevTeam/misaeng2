import prisma from '@/app/lib/prismaDb';
import { NextResponse } from 'next/server';
import { RentListing } from '@prisma/client';
import { ObjectId } from 'mongodb';
import mgClientPromise from '@/app/lib/mongodb';
interface CoorMap {
  [key: string]: [number, number];
}

interface MapListingItem {
  buildingId: string;
  price: number[];
  coordinate: [number, number];
}

export async function GET(request: Request) {
  const client = await mgClientPromise;
  const rentCollection = client.db('misaeng').collection('RentListing');
  const buildingCollection = client.db('misaeng').collection('Building');

  const mapListing: Record<string, MapListingItem> = {};

  const recentListings = await rentCollection
    .find(
      {},
      {
        projection: {
          _id: 1,
          category: 1,
          buildingId: 1,
          bedCount: 1,
          bathCount: 1,
          price: 1,
          imageSrc: 1,
          moveDate: 1,
        },
      }
    )
    .sort({ createdAt: -1 })
    .toArray();

  const rawData = await rentCollection
    .find({}, { projection: { buildingId: 1, price: 1 } })
    .toArray();

  const uniqueBids = new Set(rawData.map((rental) => rental.buildingId));

  // Fetch building data for each unique bid

  const buildingData = await Promise.all(
    Array.from(uniqueBids).map(async (bid) => {
      const building = await buildingCollection.findOne({
        _id: new ObjectId(bid),
      });
      return {
        bid: bid.toString(),
        coor: building?.coordinate,
        neighborhoodOne: building?.neighborhoodOne,
        neighborhoodTwo: building?.neighborhoodTwo,
      };
    })
  );

  // Create a bid to coor map and neighborhoods map for easy lookup
  const bidToCoorMap: CoorMap = {};
  buildingData.forEach((item) => {
    bidToCoorMap[item.bid] = item.coor;
  });

  rawData.forEach((item) => {
    const { buildingId, price } = item;
    if (mapListing[buildingId]) {
      mapListing[buildingId]['price'].push(price);
    } else {
      mapListing[buildingId] = {
        buildingId,
        price: [parseInt(price)],
        coordinate: bidToCoorMap[buildingId],
      };
    }
  });

  return NextResponse.json({ recentListings, mapListing });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { rentId, buildingId } = body;

  const client = await mgClientPromise;
  const rentCollection = client.db('misaeng').collection('RentListing');
  const buildingCollection = client.db('misaeng').collection('Building');
  const buildingToSubwayCollection = client
    .db('misaeng')
    .collection('BuildingToSubway');

  if (buildingId) {
    const recentListings = await rentCollection
      .find(
        { buildingId: new ObjectId(buildingId) },
        {
          projection: {
            _id: 1,
            category: 1,
            buildingId: 1,
            bedCount: 1,
            bathCount: 1,
            price: 1,
            imageSrc: 1,
            moveDate: 1,
          },
        }
      )
      .sort({ writeTime: -1 })
      .toArray();
    return NextResponse.json({ recentListings });
  }
  if (rentId) {
    const listingInfo = await rentCollection
      .find({ _id: new ObjectId(rentId) })
      .toArray();
    const buildingInfo = await buildingCollection
      .find({
        _id: listingInfo[0].buildingId,
      })
      .toArray();
    const buildingToSubwayInfo = await buildingToSubwayCollection
      .find({
        buildingId: new ObjectId(listingInfo[0].buildingId),
      })
      .toArray();
    // console.log('bid', listingInfo[0].buildingId.toString());
    return NextResponse.json({
      listingInfo,
      buildingInfo,
      buildingToSubwayInfo,
    });
  }
  return NextResponse.json({});
}
