import prisma from '@/app/lib/prismaDb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const { newBid, uniqueStations } = body;

  if (!newBid) {
    return NextResponse.json({ error: 'Invalid buildingId provided' });
  }

  const buildingToSubway = await prisma.buildingToSubway.findFirst({
    where: {
      buildingId: newBid,
    },
  });

  if (buildingToSubway == null) {
    uniqueStations.forEach(async (item: any) => {
      await prisma.buildingToSubway.create({
        data: {
          name: item.name,
          distance: item.distance,
          lines: item.lines,
          building: {
            connect: {
              id: newBid,
            },
          },
        },
      });
    });
  }

  return NextResponse.json({ buildingToSubway });
}
