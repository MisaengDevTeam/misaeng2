import prisma from '@/app/lib/prismaDb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email } = body;

  const user = await prisma.roommateListing.create({
    data: {
      // userId String @db.ObjectId
      // category String
      // city String
      // price Int
      // roomType String
      // moveDate DateTime?
      // length String
      // utility Boolean
      // description String
      // amenity String[]
      // feature String[]
      // imageSrc String[]
      // ownerPre String[]
      // roommatePre String[]
      // coordinate Int[]
      // contact String[]
      // district String
      // createdAt DateTime @default(now())
      // updatedAt DateTime?
    },
  });

  return NextResponse.json(user);
}
