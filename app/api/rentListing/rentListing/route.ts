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
  // const body = await request.json();
  // const { start, num } = body;
  // console.log(start, num);
  const rentCollection = client.db('misaeng').collection('RentListing');
  const buildingCollection = client.db('misaeng').collection('Building');

  const mapListing: Record<string, MapListingItem> = {};

  const rawData = await rentCollection
    .find({}, { projection: { buildingId: 1, price: 1 } })
    .toArray();

  const dataLength = rawData.length;

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

  return NextResponse.json({ mapListing, dataLength });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { rentId, buildingId, rentOption, start } = body;

  const client = await mgClientPromise;
  const rentCollection = client.db('misaeng').collection('RentListing');
  const buildingCollection = client.db('misaeng').collection('Building');
  const buildingToSubwayCollection = client
    .db('misaeng')
    .collection('BuildingToSubway');
  const reviewCollection = client.db('misaeng').collection('Review');

  if (start) {
    const startNumber = parseInt(start);
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
      .skip(startNumber)
      .limit(20)
      .toArray();

    return NextResponse.json({ recentListings, mapListing });
  }
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
      .sort({ price: 1 })
      .toArray();
    return NextResponse.json({ recentListings });
  }
  if (rentId) {
    const listingInfo = await rentCollection
      .find(
        { _id: new ObjectId(rentId) },
        {
          projection: {
            _id: 1,
            amenity: 1,
            bathCount: 1,
            bedCount: 1,
            broker: 1,
            buildingId: 1,
            category: 1,
            contact: 1,
            createdAt: 1,
            description: 1,
            feature: 1,
            imageSrc: 1,
            length: 1,
            moveDate: 1,
            price: 1,
            title: 1,
            userId: 1,
            utility: 1,
          },
        }
      )
      .toArray();
    const buildingInfo = await buildingCollection
      .find(
        {
          _id: listingInfo[0].buildingId,
        },
        {
          projection: {
            _id: 1,
            coordinate: 1,
          },
        }
      )
      .toArray();
    const buildingToSubwayInfo = await buildingToSubwayCollection
      .find({
        buildingId: new ObjectId(listingInfo[0].buildingId),
      })
      .toArray();
    const reviewInfo = await reviewCollection
      .find({
        buildingId: new ObjectId(listingInfo[0].buildingId),
      })
      .limit(10)
      .toArray();
    return NextResponse.json({
      listingInfo,
      buildingInfo,
      buildingToSubwayInfo,
      reviewInfo,
    });
  }

  if (rentOption) {
    const {
      bed: bedCount,
      bath: bathCount,
      rentMinPrice: price,
      review: generalRate,
      broker,
      category,
      subway,
    } = rentOption;

    const searchedMapListing: Record<string, MapListingItem> = {};

    let query: {
      bedCount?: string;
      bathCount?: string;
      price?: { $lte: number };
      generalRate?: { $gt: number };
      broker?: string;
      category?: string;
      subway?: string;
    } = {};

    if (bedCount != null) {
      query.bedCount = bedCount;
    }
    if (bathCount != null) {
      query.bathCount = bathCount;
    }
    if (price != null) {
      query.price = { $lte: parseInt(price) };
    }
    if (generalRate != null) {
      // query the review collection later
    }
    if (category != null) {
      query.category = category;
    }
    if (broker != null) {
      query.broker = broker;
    }
    if (subway != null) {
      // query the buildingToSubway collection later
    }

    const searchedListing = await rentCollection
      .find(query, {
        projection: {
          _id: 1,
          amenity: 1,
          bathCount: 1,
          bedCount: 1,
          broker: 1,
          buildingId: 1,
          category: 1,
          contact: 1,
          createdAt: 1,
          description: 1,
          feature: 1,
          imageSrc: 1,
          length: 1,
          moveDate: 1,
          price: 1,
          title: 1,
          userId: 1,
          utility: 1,
        },
      })
      .sort({ price: 1 })
      .toArray();

    const rawData = await rentCollection
      .find(query, { projection: { buildingId: 1, price: 1 } })
      .toArray();

    const uniqueBids = new Set(rawData.map((rental) => rental.buildingId));

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

    const bidToCoorMap: CoorMap = {};
    buildingData.forEach((item) => {
      bidToCoorMap[item.bid] = item.coor;
    });

    rawData.forEach((item) => {
      const { buildingId, price } = item;
      if (searchedMapListing[buildingId]) {
        searchedMapListing[buildingId]['price'].push(price);
      } else {
        searchedMapListing[buildingId] = {
          buildingId,
          price: [parseInt(price)],
          coordinate: bidToCoorMap[buildingId],
        };
      }
    });

    return NextResponse.json({ searchedListing, searchedMapListing });
  }

  return NextResponse.json({});
}
