import { uploadImage } from "@/libs/cloudinary";
import connectMongoDB from "@/libs/mongodb";
import Campground from "@/models/Campground";
import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import { NextResponse } from "next/server";

cloudinary.config({
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const formData = await request.formData();
    const files = formData.getAll("files") as unknown as File[];
    const data = Object.fromEntries(formData.entries());

    const imageUrls: string[] = [];
    for (const file of Array.from(files)) {
      log(file);
      const uploaded = await uploadImage(file);
      imageUrls.push(uploaded?.url as string);
    }

    log("finished upload");

    const campground = await Campground.create({
      title: data.title,
      location: data.location,
      price: data.price,
      description: data.description,
      imageUrls,
    });
    return NextResponse.json(campground, { status: 201 });
  } catch (error) {
    return NextResponse.json(JSON.parse(JSON.stringify(error)), {
      status: 500,
    });
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
