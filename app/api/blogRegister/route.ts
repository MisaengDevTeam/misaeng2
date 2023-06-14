import prisma from '@/app/lib/prismaDb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  console.log(body);

  const { category, title, content, thumbnail, updateAt, uid: userId } = body;

  let blogListing;

  await prisma.blogListing
    .create({
      data: {
        userId,
        category,
        title,
        content,
        thumbnail,
      },
    })
    .then((res) => {
      blogListing = res;
    })
    .catch((error) => console.log(error));

  return NextResponse.json({ blogListing });
}
