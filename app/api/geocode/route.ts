import prisma from '@/app/lib/prismaDb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const result = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/
        ${body.address}
      .json?country=us&proximity=-74.006,40.7128&postalcode=10044&access_token=pk.eyJ1IjoibWlzYWVuZ2RldnRlYW0iLCJhIjoiY2xna3lrdzl6MWtteDNrcG5saDY3NTZlcyJ9.x2LKjpCcttiBaZHTkdvecw`
  ).then((res) => res.json());

  return NextResponse.json(result);
}
