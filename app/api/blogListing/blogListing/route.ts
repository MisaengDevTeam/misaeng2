import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import mgClientPromise from '@/app/lib/mongodb';

export async function POST(request: Request) {
  const body = await request.json();

  const client = await mgClientPromise;
  const blogCollection = client.db('misaeng').collection('BlogListing');

  const { category, word, author, start, number, blogId } = body;

  let query: {
    category?: string;
    _id?: ObjectId;
  } = {};

  if (category != null) {
    query.category = category;
  }

  if (blogId != null) {
    query._id = new ObjectId(blogId);
  }

  const blogListing = await blogCollection
    .find(query)
    .skip(start)
    .limit(number)
    .sort({ createdAt: -1 })
    .toArray();

  const hotListing = await blogCollection
    .find({ hot: 'Yes' })
    .limit(4)
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({ blogListing, hotListing });
}
