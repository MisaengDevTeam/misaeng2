import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import mgClientPromise from '@/app/lib/mongodb';

export async function POST(request: Request) {
  const body = await request.json();

  const client = await mgClientPromise;
  const blogCollection = client.db('misaeng').collection('BlogListing');

  const { blogOption, blogId } = body;

  if (blogOption) {
    const { category, start, number } = blogOption;

    let query: {
      category?: string;
    } = {};

    if (category != null) {
      query.category = category;
    }

    const blogListing = await blogCollection
      .find(query)
      .skip(start)
      .limit(number)
      .sort({ createdAt: -1 })
      .toArray();

    const hotListing = await blogCollection
      .find({ hot: 'Yes' })
      .limit(4)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ blogListing, hotListing });
  }

  // const { category, word, author, start, number, blogId } = body;

  // console.log(blogId);

  if (blogId) {
    console.log(blogId);

    const blogIndiListing = await blogCollection
      .find({ _id: new ObjectId(blogId) })
      .toArray();

    // if (blogIndiListing.length > 0) {
    const category = blogIndiListing[0].category;
    const createdAt = blogIndiListing[0].createdAt;

    const nextIndiListing = await blogCollection
      .find({
        category,
        createdAt: { $lt: createdAt },
      })
      .limit(1)
      .toArray();

    //   console.log({ blogIndiListing, nextIndiListing });
    return NextResponse.json({ blogIndiListing, nextIndiListing });
    // return NextResponse.json({ blogIndiListing, nextIndiListing });
    // }
  }
}
