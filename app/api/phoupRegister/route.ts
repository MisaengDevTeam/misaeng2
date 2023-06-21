import prisma from '@/app/lib/prismaDb';
import { NextResponse } from 'next/server';
import mgClientPromise from '@/app/lib/mongodb';

export async function POST(request: Request) {
  const body = await request.json();
  const client = await mgClientPromise;
  const autorentCollection = client.db('misaeng').collection('AutoRent');

  const { buildingId, imageSrc, unit } = body;

  let newAutoRent = {
    bid: buildingId,
    unit: {
      [unit]: imageSrc,
    },
  };

  const existingDoc = await autorentCollection.findOne({ bid: buildingId });

  if (existingDoc) {
    if (existingDoc.unit.hasOwnProperty(unit)) {
      await autorentCollection.updateOne(
        { bid: buildingId },
        { $set: { [`unit.${unit}`]: imageSrc } }
      );
    } else {
      await autorentCollection.updateOne(
        { bid: buildingId },
        { $set: { [`unit.${unit}`]: imageSrc } }
      );
    }
  } else {
    await autorentCollection.insertOne(newAutoRent);
  }

  return NextResponse.json({});
}
