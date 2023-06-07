import prisma from '@/app/lib/prismaDb';
import { NextResponse } from 'next/server';
import { RentListing } from '@prisma/client';

export async function GET(request: Request) {
  const mapListings = await prisma.rentListing.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const groupedMapListings: { [key: string]: RentListing[] } =
    mapListings.reduce((result, listing) => {
      if (!result[listing.buildingId]) {
        result[listing.buildingId] = [];
      }
      result[listing.buildingId].push(listing);
      return result;
    }, {} as { [key: string]: RentListing[] });

  const safeListings = mapListings.map((list) => ({
    ...list,
    createdAt: list.createdAt.toISOString(),
  }));

  return NextResponse.json({ listings: safeListings, groupedMapListings });
}
