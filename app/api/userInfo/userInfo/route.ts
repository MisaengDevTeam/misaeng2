import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import mgClientPromise from '@/app/lib/mongodb';

export async function POST(request: Request) {
  const body = await request.json();

  const { mypage } = body;

  const client = await mgClientPromise;
  const userCollection = client.db('misaeng').collection('User');
  const rentCollection = client.db('misaeng').collection('RentListing');
  const roommateCollection = client.db('misaeng').collection('RoommateListing');
  const buysellCollection = client.db('misaeng').collection('BuySellListing');

  if (mypage == 'edit') {
    const editInfo = { mypage, ...body };
    const userInfo = await userCollection.updateOne(
      { _id: new ObjectId(body.uid) },
      { $set: editInfo }
    );
    return NextResponse.json({ userInfo });
  }

  if (mypage == 'rent') {
    const rentInfo = await rentCollection
      .find({
        userId: new ObjectId(body.uid),
      })
      .sort({ writeTime: -1 })
      .limit(6)
      .toArray();
    return NextResponse.json({ rentInfo });
  }

  if (mypage == 'roommate') {
    const roommateInfo = await roommateCollection.findOne({
      userId: new ObjectId(body.uid),
      category: '룸메 찾아요',
    });
    const roomInfo = await roommateCollection.findOne({
      userId: new ObjectId(body.uid),
      category: '방 찾아요',
    });
    const togetherInfo = await roommateCollection.findOne({
      userId: new ObjectId(body.uid),
      category: '같이 방 찾아요',
    });

    return NextResponse.json({ roommateInfo, roomInfo, togetherInfo });
  }

  if (mypage == 'buysell') {
    const buysellInfo = await buysellCollection
      .find({
        userId: new ObjectId(body.uid),
      })
      .sort({ writeTime: -1 })
      // .limit(6)
      .toArray();
    return NextResponse.json({ buysellInfo });
  }
}
