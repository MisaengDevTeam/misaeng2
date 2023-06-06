import prisma from '@/app/lib/prismaDb';
import { RentListing } from '@prisma/client';

export const getListings = async () => {
  try {
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

    // console.log(groupedMapListings);

    const safeListings = mapListings.map((list) => ({
      ...list,
      createdAt: list.createdAt.toISOString(),
    }));

    return { listings: safeListings, groupedMapListings };
  } catch (error: any) {
    throw new Error(error);
  }
};
