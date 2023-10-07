import connectMongoDB from "@/libs/mongodb"
import { NextResponse } from "next/server";
import Campground from "@/models/Campground";


export async function POST(req: Request) {
  try {
    const { title, location, price, description } = await req.json();
    await connectMongoDB();
    Campground.create({ title, location, price, description });
    return NextResponse.json({ message: "Campground created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "An error occurred while Campground created." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    return NextResponse.json([], { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
  }
}
