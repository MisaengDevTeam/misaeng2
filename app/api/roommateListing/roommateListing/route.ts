import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import mgClientPromise from '@/app/lib/mongodb';

export async function GET(request: Request) {
  const client = await mgClientPromise;
  const roommateCollection = client.db('misaeng').collection('RoommateListing');

  const initListings = await roommateCollection
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
  const { roommateId } = body;

  const client = await mgClientPromise;
  const roommateCollection = client.db('misaeng').collection('RoommateListing');

  const listingInfo = await roommateCollection
    .find(
      { _id: new ObjectId(roommateId) }
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
