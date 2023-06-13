import prisma from '../../../../../lib/prismaDb';
import { NextResponse } from 'next/server';
import { RentListing } from '@prisma/client';
import { ObjectId } from 'mongodb';
import mgClientPromise from '../../../../../lib/mongodb';

interface IParams {
  type: string;
  id: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const client = await mgClientPromise;
  const rentCollection = client.db('misaeng').collection('RentListing');
  const roommateCollection = client.db('misaeng').collection('RoommateListing');
  const buysellCollection = client.db('misaeng').collection('BuySellListing');

  const { type, id } = params;

  if (type == 'rent') {
    await rentCollection.deleteOne({
      _id: new ObjectId(id),
    });
  }

  if (type == 'roommate') {
    await roommateCollection.deleteOne({
      _id: new ObjectId(id),
    });
  }

  if (type == 'buysell') {
    await buysellCollection.deleteOne({
      _id: new ObjectId(id),
    });
  }

  return NextResponse.json({});
}
