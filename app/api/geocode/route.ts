import prisma from '@/app/lib/prismaDb';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const { address, searchAddress } = body;

  if (address) {
    const mapResult = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/
        ${address}
      .json?country=us&proximity=-74.006,40.7128&postalcode=10044&access_token=pk.eyJ1IjoibWlzYWVuZ2RldnRlYW0iLCJhIjoiY2xna3lrdzl6MWtteDNrcG5saDY3NTZlcyJ9.x2LKjpCcttiBaZHTkdvecw`
    ).then((res) => res.json());

    // console.log(mapResult.features[0].center);

    const neighborhood = await prisma.zip.findFirst({
      where: {
        zipcode: mapResult.features[0].context[1].text,
      },
    });

    const building = await prisma.building.findFirst({
      where: {
        address: mapResult.features[0].place_name,
      },
    });

    let newBuilding;

    if (!building) {
      await prisma.building
        .create({
          data: {
            company: '',
            address: mapResult.features[0].place_name,
            coordinate: mapResult.features[0].center,
            neighborhoodOne: neighborhood!.neighborhood,
            neighborhoodTwo: neighborhood!.city,
            subwayOneKm: [],
          },
        })
        .then((res) => {
          newBuilding = res;
        })
        .catch((error) => console.log(error));
    } else {
      newBuilding = building;
    }

    return NextResponse.json({ mapResult, neighborhood, newBuilding });
  }

  if (searchAddress) {
    const mapResult = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/
        ${searchAddress}
      .json?country=us&proximity=-74.006,40.7128&postalcode=10044&access_token=pk.eyJ1IjoibWlzYWVuZ2RldnRlYW0iLCJhIjoiY2xna3lrdzl6MWtteDNrcG5saDY3NTZlcyJ9.x2LKjpCcttiBaZHTkdvecw`
    ).then((res) => res.json());
    const newAddress = mapResult.features[0].place_name;
    const newCoordinate = mapResult.features[0].center;
    return NextResponse.json({ newCoordinate, newAddress });
  }
  return null;
}
