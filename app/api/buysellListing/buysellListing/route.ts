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

export async function POST(request: Request) {}
