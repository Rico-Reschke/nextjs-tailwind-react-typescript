import { authOptions } from "@/libs/auth";
import { uploadImage } from "@/libs/cloudinary";
import connectMongoDB from "@/libs/mongodb";
import Campground from "@/models/Campground";
import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

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

    try {
      const imageUrls: string[] = [];
    if (files.length > 0) {
      for (const file of files) {
        const uploaded = await uploadImage(file);
        imageUrls.push(uploaded?.url as string);
      }
    }

    const campgroundUpdate = await Campground.findByIdAndUpdate(params.id, {
      title: data.title,
      location: data.location,
      price: data.price,
      description: data.description,
      ...(files.length > 0 && { imageUrls })
    }, { new: true });

    await campgroundUpdate.save();
    
    return new NextResponse(JSON.stringify(campgroundUpdate), { status: 200});
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: 'Fehler beim Aktualisieren des Campgrounds' }), { status: 500 });
    }
}


// const newImageUrls: string[] = [];
  // for (const file of newFiles) {
  //   const uploaded = await uploadImage(file);
  //   newImageUrls.push(uploaded?.url as string);
  // }

  // campground.imageUrls = [...campground.imageUrls, ...newImageUrls];