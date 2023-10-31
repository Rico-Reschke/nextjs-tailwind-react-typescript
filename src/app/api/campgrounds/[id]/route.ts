import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Campground from "@/models/Campground";

export async function GET(req: any) {
  try {
    const pathname = req.nextUrl.pathname;
    const id = pathname.split('/').pop();
    await connectMongoDB();
    const campground = await Campground.findOne({_id: id});
    if (campground) {
      return NextResponse.json({ campground });
    } else {
      return NextResponse.json({ error: 'Campground not found' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}