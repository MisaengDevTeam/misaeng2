import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import mgClientPromise from '@/app/lib/mongodb';

export async function GET(request: Request) {
  const client = await mgClientPromise;
  const buySellCollection = client.db('misaeng').collection('BuySellListing');

  const initListings = await buySellCollection
    .find(
      {}
      // {
      //   projection: {
      //     _id: 1,
      //     category: 1,
      //     buildingId: 1,
      //     bedCount: 1,
      //     bathCount: 1,
      //     price: 1,
      //     imageSrc: 1,
      //     moveDate: 1,
      //   },
      // }
    )
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({ initListings });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { buysellId, buysellOption } = body;

  const client = await mgClientPromise;
  const buysellCollection = client.db('misaeng').collection('BuySellListing');
  if (buysellId) {
    const listingInfo = await buysellCollection
      .find(
        { _id: new ObjectId(buysellId) }
        // {
        //   projection: {
        //     _id: 1,
        //     amenity: 1,
        //     bathCount: 1,
        //     bedCount: 1,
        //     broker: 1,
        //     buildingId: 1,
        //     category: 1,
        //     contact: 1,
        //     createdAt: 1,
        //     description: 1,
        //     feature: 1,
        //     imageSrc: 1,
        //     length: 1,
        //     moveDate: 1,
        //     price: 1,
        //     title: 1,
        //     userId: 1,
        //     utility: 1,
        //   },
        // }
      )
      .toArray();
    return NextResponse.json({ listingInfo });
  }
  // if (roommateOption) {
  //   const {
  //     category,
  //     gender,
  //     status,
  //     roomtype,
  //     length,
  //     mbti,
  //     age,
  //     pet,
  //     smoke,
  //     city,
  //     district,
  //   } = roommateOption;

  //   let query: {
  //     category?: string;
  //     selfgender?: string;
  //     selfstatus?: string;
  //     roomtype?: string;
  //     length?: string;
  //     selfmbti?: string;
  //     selfage?: string;
  //     selfpet?: string;
  //     selfsmoke?: string;
  //     city?: string;
  //     district?: string;
  //   } = {};

  //   if (category != null) {
  //     query.category = category;
  //   }
  //   if (gender != null) {
  //     query.selfgender = gender;
  //   }
  //   if (status != null) {
  //     query.selfstatus = status;
  //   }
  //   if (roomtype != null) {
  //     query.roomtype = roomtype;
  //   }
  //   if (length != null) {
  //     query.length = length;
  //   }
  //   if (mbti != null) {
  //     query.selfmbti = mbti;
  //   }
  //   if (age != null) {
  //     query.selfage = age;
  //   }
  //   if (pet != null) {
  //     query.selfpet = pet;
  //   }
  //   if (smoke != null) {
  //     query.selfsmoke = smoke;
  //   }
  //   if (city != null) {
  //     query.city = city;
  //   }
  //   if (district != null) {
  //     query.district = district;
  //   }

  //   const searchedListings = await roommateCollection.find(query).toArray();
  //   return NextResponse.json({ searchedListings });
  // }
}
