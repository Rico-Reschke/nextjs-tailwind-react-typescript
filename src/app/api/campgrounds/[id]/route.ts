import connectMongoDB from "@/libs/mongodb";
import Campground from "@/models/Campground";
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

  // Extrahiere die zu aktualisierenden Daten aus dem Request-Body
  const updateData = await request.json(); // oder eine andere Methode, um Daten aus dem Request zu erhalten

  // Aktualisiere den Campground anhand seiner ID
  const campground = await Campground.findByIdAndUpdate(params.id, updateData, { new: true });

  // Gib den aktualisierten Campground als Antwort zurück
  return NextResponse.json(campground, { status: 200 });
}

