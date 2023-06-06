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
    uid,
    bid,
    utility,
    movedate,
    phone,
    kakaoId,
    writeTime,
    updateTime,
  } = body;

  const listingCheck = await prisma.rentListing.findFirst({
    where: {
      buildingId: bid,
      unit,
    },
  });

  const userCheck = await prisma.user.findFirst({
    where: {
      id: uid,
    },
  });

  let rentListing;

  if (!listingCheck) {
    await prisma.rentListing
      .create({
        data: {
          userId: uid,
          buildingId: bid,
          category,
          title,
          bedCount: bed,
          bathCount: bath,
          price: parseInt(price),
          description,
          address,
          unit,
          imageSrc: pictures,
          moveDate: movedate,
          length: '',
          utility,
          broker: bfee,
          amenity,
          feature,
          updatedAt: writeTime,
          contact: [userCheck?.email, phone, kakaoId],
        },
      })
      .then((res) => (rentListing = res))
      .catch((error) => console.log(error));
  }

  return NextResponse.json(rentListing);
}
