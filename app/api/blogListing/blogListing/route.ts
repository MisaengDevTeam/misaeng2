import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import mgClientPromise from '@/app/lib/mongodb';

export async function POST(request: Request) {
  const body = await request.json();

  const client = await mgClientPromise;
  const blogCollection = client.db('misaeng').collection('BlogListing');

  const { blogOption, blogId } = body;

  if (blogOption) {
    const { category, start, number, title } = blogOption;

    let query: {
      category?: string;
      title?: RegExp;
    } = {};

    if (category != null) {
      query.category = category;
    }
    if (title != null) {
      query.title = new RegExp(title); // 'i' for case insensitive matching
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

  if (blogId) {
    console.log(blogId);

    const blogIndiListing = await blogCollection
      .find({ _id: new ObjectId(blogId) })
      .toArray();

    const category = blogIndiListing[0].category;
    const createdAt = blogIndiListing[0].createdAt;

    const nextIndiListing = await blogCollection
      .find(
        {
          category,
          createdAt: { $lt: createdAt },
        },
        {
          projection: {
            _id: 1,
            title: 1,
            thumbnail: 1,
          },
        }
      )
      .limit(1)
      .toArray();

    return NextResponse.json({ blogIndiListing, nextIndiListing });
  }
}
