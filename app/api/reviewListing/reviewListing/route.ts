import mgClientPromise from '@/app/lib/mongodb';
import prisma from '@/app/lib/prismaDb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { userId } = body;

  const client = await mgClientPromise;
  const reviewCollection = client.db('misaeng').collection('Review');
  if (userId) {
    const listingInfo = await reviewCollection
      .find({ userId: new ObjectId(userId) })
      .toArray();
    return NextResponse.json({ listingInfo });
  }
}
