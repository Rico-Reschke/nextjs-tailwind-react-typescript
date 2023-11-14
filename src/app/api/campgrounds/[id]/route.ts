import connectMongoDB from "@/libs/mongodb";
import Campground from "@/models/Campground";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectMongoDB();

  const campground = await Campground.findById(params.id);
  // await Campground.findByIdAndDelete(id);
  return NextResponse.json(campground, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectMongoDB();

  const campground = await Campground.findByIdAndDelete(params.id);
  return NextResponse.json(campground, { status: 200 });
}
