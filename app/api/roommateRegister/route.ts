import prisma from '@/app/lib/prismaDb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const {
    category,
    roomtype,
    price,
    length,
    movedate,
    description,
    본인성별,
    본인연령대,
    본인학생,
    본인반려동물,
    본인흡연여부,
    본인MBTI,
    상대성별,
    상대연령대,
    상대학생,
    상대반려동물,
    상대흡연여부,
    city,
    district,
    email,
    userId: uid,
  } = body;

  const resListing = {
    category,
    roomtype,
    price,
    length,
    movedate,
    description,
    본인성별,
    본인연령대,
    본인학생,
    본인반려동물,
    본인흡연여부,
    본인MBTI,
    상대성별,
    상대연령대,
    상대학생,
    상대반려동물,
    상대흡연여부,
    city,
    district,
    email,
    uid,
  };

  // const user = await prisma.roommateListing.create({
  //   data: {
  //     userId String @db.ObjectId
  //     category String
  //     city String
  //     price Int
  //     roomType String
  //     moveDate DateTime?
  //     length String
  //     utility Boolean
  //     description String
  //     amenity String[]
  //     feature String[]
  //     imageSrc String[]
  //     ownerPre String[]
  //     roommatePre String[]
  //     coordinate Int[]
  //     contact String[]
  //     district String
  //     createdAt DateTime @default(now())
  //     updatedAt DateTime?
  //   },
  // });

  return NextResponse.json(resListing);
}
