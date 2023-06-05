import prisma from '@/app/lib/prismaDb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  let {
    title,
    description,
    price,
    bed,
    bath,
    address,
    unit,
    category,
    bfee,
    pictures,
    amenity,
    feature,
    bid,
    movedate,
    email,
    coordinate,
    phone,
    kakaoId,
    uid,
  } = body;

  const neighborhood = await prisma.zip.findFirst({
    where: {
      zipcode: address.split(', ')[address.length - 2],
    },
  });

  const building = await prisma.building.findFirst({
    where: {
      address: address,
    },
  });

  if (building) {
    bid = building.id;
  } else {
    const newBuilding = await prisma.building.create({
      data: {
        company: '',
        address: address,
        coordinate: coordinate,
        neighborhoodOne: '',
        neighborhoodTwo: '',
        subwayOneKm: [],
      },
    });
    bid = newBuilding.id;
  }

  const rentListing = {
    title,
    description,
    price,
    bed,
    bath,
    address,
    unit,
    category,
    bfee,
    pictures,
    amenity,
    feature,
    bid,
    movedate,
    coordinate,
    email,
    phone,
    kakaoId,
    uid,
  };

  // const resListing = {
  //   category,
  //   roomtype,
  //   price,
  //   length,
  //   movedate,
  //   description,
  //   본인성별,
  //   본인연령대,
  //   본인학생,
  //   본인반려동물,
  //   본인흡연여부,
  //   본인MBTI,
  //   상대성별,
  //   상대연령대,
  //   상대학생,
  //   상대반려동물,
  //   상대흡연여부,
  //   city,
  //   district,
  //   uid,
  // };
  // console.log(body);

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

  return NextResponse.json(rentListing);
}
