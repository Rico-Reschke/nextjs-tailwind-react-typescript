import { uploadImage } from "@/libs/cloudinary";
import connectMongoDB from "@/libs/mongodb";
import Campground from "@/models/Campground";
import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/libs/auth";

cloudinary.config({
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    const formData = await request.formData();
    const files = formData.getAll("files") as unknown as File[];
    const data = Object.fromEntries(formData.entries());
    const session = await getServerSession({ req: request, ...authOptions });
    const userId = session?.user.id;

    const imageUrls: string[] = [];
    for (const file of files) {
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
      creator: userId,
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

// export async function DELETE(request: NextRequest) {
//   try {
//     await connectMongoDB();
//     const session = await getServerSession({ req: request, ...authOptions });

//     if (!session || !session.user) {
//       return NextResponse.json({ message: "Nicht autorisiert" }, { status: 401 });
//     }

//     const campgroundId = request.nextUrl.pathname.split('/').pop();

//     const campground = await Campground.findById(campgroundId);

//     if (campground && campground.creator.toString() === session.user.id) {
//       await campground.deleteOne();
//       return NextResponse.json({ message: "Campground gelöscht" });
//     } else {
//       return NextResponse.json({ message: "Nicht autorisiert oder nicht gefunden" }, { status: 403 });
//     }
//   } catch (error) {
//     return NextResponse.json(JSON.parse(JSON.stringify(error)), {
//       status: 500,
//     });
//   }
// }

// export async function PUT(request: NextRequest) {
//   try {
//     await connectMongoDB();
//     const session = await getServerSession({ req: request, ...authOptions });

//     if (!session || !session.user) {
//       return NextResponse.json({ message: "Nicht autorisiert" }, { status: 401 });
//     }

//     const campgroundId = request.nextUrl.pathname.split('/').pop();
//     if (!campgroundId) {
//       return NextResponse.json({ message: "Campground-ID fehlt" }, { status: 400 });
//     }

//     const campground = await Campground.findById(campgroundId);
//     if (!campground) {
//       return NextResponse.json({ message: "Campground nicht gefunden" }, { status: 404 });
//     }

//     if (campground.creator.toString() !== session.user.id) {
//       return NextResponse.json({ message: "Nicht autorisiert" }, { status: 403 });
//     }

//     // Extrahieren Sie die zu aktualisierenden Daten aus dem Request-Body
//     const updateData = await request.json(); // oder eine andere Methode, um Daten aus dem Request zu erhalten

//     await Campground.findByIdAndUpdate(campgroundId, updateData);

//     return NextResponse.json({ message: "Campground aktualisiert" });
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }