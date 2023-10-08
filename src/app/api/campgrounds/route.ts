import connectMongoDB from "@/libs/mongodb"
import { NextResponse } from "next/server";
import Campground from "@/models/Campground";


export async function POST(req: any) {
    const { title, location, price, description } = await req.json();
    await connectMongoDB();
    Campground.create({ title, location, price, description });
    return NextResponse.json({ message: "Campground created successfully" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const campgrounds = await Campground.find();
  return NextResponse.json({ campgrounds });
}
