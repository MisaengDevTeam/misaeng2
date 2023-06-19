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
  if (buysellOption) {
    const { category, subcategory, keyword } = buysellOption;

    let query: {
      category?: string;
      subcategory?: string;
      title?: RegExp;
    } = {};

    if (category != null) {
      query.category = category;
    }
    if (subcategory != null) {
      query.subcategory = subcategory;
    }
    if (keyword != null) {
      query.title = new RegExp(keyword);
    }

    const searchedListings = await buysellCollection.find(query).toArray();
    return NextResponse.json({ searchedListings });
  }
}
