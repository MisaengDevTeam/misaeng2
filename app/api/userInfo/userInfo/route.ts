import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import mgClientPromise from '@/app/lib/mongodb';

export async function POST(request: Request) {
  const body = await request.json();

  console.log(body);

  const client = await mgClientPromise;
  const userCollection = client.db('misaeng').collection('User');

  const userInfo = await userCollection.updateOne(
    { _id: new ObjectId(body.uid) },
    { $set: body }
  );

  return NextResponse.json({ userInfo });
}
