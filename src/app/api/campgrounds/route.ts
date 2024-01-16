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
    console.log(session);

    const imageUrls: string[] = [];
    for (const file of files) {
      log(file);
      const uploaded = await uploadImage(file);
      imageUrls.push(uploaded?.url as string);
    }

    const userId = session?.user.id;

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

export async function DELETE(request: NextRequest) {
  try {
    await connectMongoDB();
    const session = await getServerSession({ req: request, ...authOptions });

    // Überprüfen, ob der Benutzer angemeldet ist
    if (!session || !session.user) {
      return NextResponse.json({ message: "Nicht autorisiert" }, { status: 401 });
    }

    // Extrahieren der Campground-ID aus der URL oder dem Request-Body
    const campgroundId = request.nextUrl.pathname.split('/').pop();

    // Finden des Campgrounds in der Datenbank
    const campground = await Campground.findById(campgroundId);

    // Überprüfen, ob der angemeldete Benutzer der Ersteller des Campgrounds ist
    if (campground && campground.creator.toString() === session.user.id) {
      await campground.deleteOne();
      return NextResponse.json({ message: "Campground gelöscht" });
    } else {
      return NextResponse.json({ message: "Nicht autorisiert oder nicht gefunden" }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json(JSON.parse(JSON.stringify(error)), {
      status: 500,
    });
  }
}

// export async function PUT(request: NextRequest) {
//   try {
//     await connectMongoDB();
//     const session = await getServerSession({ req: request, ...authOptions });

//     // Überprüfen, ob der Benutzer angemeldet ist
//     if (!session || !session.user) {
//       return NextResponse.json({ message: "Nicht autorisiert" }, { status: 401 });
//     }

//     // Extrahieren der Campground-ID aus der URL oder dem Request-Body
//     const campgroundId = request.nextUrl.pathname.split('/').pop();

//     // Zusätzliche Logik, um die Campground-Daten zu aktualisieren
//     const updateData = { /* Daten aus der Anfrage */ };
//     await Campground.findByIdAndUpdate(campgroundId, updateData);

//     return NextResponse.json({ message: "Campground aktualisiert" });
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }