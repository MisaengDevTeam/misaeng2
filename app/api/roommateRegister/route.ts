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
    본인성별: selfgender,
    본인연령대: selfage,
    본인학생: selfstatus,
    본인반려동물: selfpet,
    본인흡연여부: selfsmoke,
    본인MBTI: selfmbti,
    상대성별: rmgender,
    상대연령대: rmage,
    상대학생: rmstatus,
    상대반려동물: rmpet,
    상대흡연여부: rmsmoke,
    city,
    district,
    email,
    kakaoId,
    phone,

    uid: userId,
  } = body;

  // console.log(uid, email);

  let roommateListing;

  await prisma.roommateListing
    .create({
      data: {
        userId,
        category,
        roomtype,
        price: parseInt(price),
        length,
        movedate,
        description,
        selfgender,
        selfage,
        selfstatus,
        selfpet,
        selfsmoke,
        selfmbti,
        rmgender,
        rmage,
        rmstatus,
        rmpet,
        rmsmoke,
        city,
        district,
        contact: [email, phone, kakaoId],
      },
    })
    .then((res) => {
      roommateListing = res;
      // console.log(res);
    })
    .catch((error) => console.log(error));

  return NextResponse.json(roommateListing);
}
