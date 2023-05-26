import prisma from '@/app/lib/prismaDb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email } = body;

  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  return NextResponse.json(user);
}
