import prisma from '@/app/lib/prismaDb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const {
    averageRate,
    buildingRate,
    buildingReview,
    safeRate,
    safeReview,
    transportationRate,
    transportationReview,
    convenienceRate,
    convenienceReview,
    bid: buildingId,
    userId,
  } = body;

  let review;

  await prisma.review
    .create({
      data: {
        averageRate,
        buildingRate,
        buildingReview,
        safeRate,
        safeReview,
        transportationRate,
        transportationReview,
        convenienceRate,
        convenienceReview,
        buildingId,
        userId,
      },
    })
    .then((res) => {
      review = res;
    })
    .catch((error) => console.log(error));

  return NextResponse.json({ review });
}
