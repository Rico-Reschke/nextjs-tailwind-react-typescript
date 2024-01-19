import { authOptions } from "@/libs/auth";
import { uploadImage } from "@/libs/cloudinary";
import connectMongoDB from "@/libs/mongodb";
import Campground from "@/models/Campground";
import { log } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectMongoDB();

  const campground = await Campground.findById(params.id);
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectMongoDB();

  const formData = await request.formData();
    const files = formData.getAll("files") as unknown as File[];
    const data = Object.fromEntries(formData.entries());

    const imageUrls: string[] = [];
    for (const file of files) {
      log(file);
      const uploaded = await uploadImage(file);
      imageUrls.push(uploaded?.url as string);
    }

    log("finished upload");

  // const newImageUrls: string[] = [];
  // for (const file of newFiles) {
  //   const uploaded = await uploadImage(file);
  //   newImageUrls.push(uploaded?.url as string);
  // }

  // campground.imageUrls = [...campground.imageUrls, ...newImageUrls];

  const campgroundUpdate = await Campground.findByIdAndUpdate(params.id, {
    title: data.title,
    location: data.location,
    price: data.price,
    description: data.description,
    // imageUrls: campground.imageUrls,
  }, { new: true });

  await campgroundUpdate.save();

}

