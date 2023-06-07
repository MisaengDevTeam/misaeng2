import prisma from '@/app/lib/prismaDb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const { name } = body;

  const subwayStation = await prisma.subway.findFirst({
    where: {
      station: name,
    },
  });

  const lines = subwayStation?.lines;

  if (lines === undefined) {
    return NextResponse.json([]);
  } else {
    return NextResponse.json(lines);
  }
}
