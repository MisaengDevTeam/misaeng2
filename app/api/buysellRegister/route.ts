import prisma from '@/app/lib/prismaDb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  // console.log(body);
  let {
    category,
    subcategory,
    title,
    price,
    status,
    description,
    pictures,
    address,
    uid: userId,
    email,
    phone,
    kakaoId,
    coordinate,
  } = body;

  let buysellListing;

  await prisma.buySellListing
    .create({
      data: {
        userId,
        category,
        subcategory,
        title,
        price: parseInt(price),
        status,
        description,
        pictures: pictures,
        address,
        coordinate,
        contact: [email, phone, kakaoId],
      },
    })
    .then((res) => {
      buysellListing = res;
      // console.log(res);
    })
    .catch((error) => console.log(error));

  return NextResponse.json(buysellListing);
}
