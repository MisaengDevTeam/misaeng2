import mgClientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { bid, unit } = body;

  const client = await mgClientPromise;
  const autorentCollection = client.db('misaeng').collection('AutoRent');
  if (bid && unit) {
    const buildingPicInfo = await autorentCollection.find({ bid }).toArray();

    console.log(buildingPicInfo);

    if (buildingPicInfo.length != 0) {
      if (Object.keys(buildingPicInfo[0].unit).includes(unit)) {
        return NextResponse.json({
          buildingPic: buildingPicInfo[0].unit[unit],
        });
      } else {
        return NextResponse.json({ buildingPic: [] });
      }
    } else {
      return NextResponse.json({ buildingPic: [] });
    }
  }
}
