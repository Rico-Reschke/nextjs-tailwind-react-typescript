import connectMongoDB from "@/libs/mongodb";
import Campground from "@/models/Campground";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const { title, location, price, description } = await req.json();
  await connectMongoDB();
  await Campground.create({ title, location, price, description });
  return NextResponse.json({ message: "Campground Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const campgrounds = await Campground.find();
  return NextResponse.json({ campgrounds });
}

export async function DELETE(req: any) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Campground.findByIdAndDelete(id);
  return NextResponse.json({ message: "Campground deleted" }, { status: 200 });
}
