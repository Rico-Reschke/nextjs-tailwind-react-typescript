import connectMongoDB from "@/libs/mongodb";
import Review from "@/models/Review";
import Campground from "@/models/Campground";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectMongoDB();

  try {
    const json = await req.json();
    
    const url = new URL(req.url);
    const campgroundId = url.pathname.split('/')[3];
    console.log(campgroundId);
    // Find the campground by ID
    const campground = await Campground.findById(campgroundId);
    if (!campground) {
      return NextResponse.json({ message: 'Campground not found' }, { status: 404 });
    }

    // Create and save the new review
    const review = await Review.create({
      body: json.body,
      rating: json.rating,
      campground: campground._id, // Link review to the campground if necessary
    });

    // You might want to update the campground document here
    // For example, pushing the review to a 'reviews' field in campground
    // campground.reviews.push(review._id);
    // await campground.save();

    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectMongoDB();
  const reviews = await Review.find();
  return NextResponse.json({ reviews });
}