import connectMongoDB from "@/libs/mongodb";
import Campground from "@/models/Campground";
import { NextResponse } from "next/server";


export async function POST(request: any) {
    try {
    const { title, location, price, description, imageUrl } = await request.json();
    await connectMongoDB();
    await Campground.create({ title, location, price, description, imageUrl });
    return NextResponse.json({ message: "Campground created successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error"}, { status: 500 });
}
}

export async function GET() {
  await connectMongoDB();
  const campgrounds = await Campground.find();
  return NextResponse.json({ campgrounds });
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Campground.findByIdAndDelete(id);
  return NextResponse.json({ message: "Campground deleted" }, { status: 200 });
}
