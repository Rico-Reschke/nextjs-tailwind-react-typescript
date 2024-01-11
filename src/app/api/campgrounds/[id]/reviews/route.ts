import connectMongoDB from "@/libs/mongodb";
import Review from "@/models/Review";
import Campground from "@/models/Campground";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await connectMongoDB();
  const session = await getServerSession();

  const email = session?.user?.email;
  // console.log("Email:", email);

  const user = await User.findOne({ email });
  console.log("User:", user)
  if (!user) {
    return { status: 404, json: { error: 'User not found' } };
  }

  try {
    const json = await req.json();
    // console.log("Received review data:", json)
    
    const url = new URL(req.url);
    const campgroundId = url.pathname.split('/')[3];
    // console.log(campgroundId);
    // Find the campground by ID
    const campground = await Campground.findById(campgroundId);
    if (!campground) {
      return NextResponse.json({ message: 'Campground not found' }, { status: 404 });
    }

    // Create and save the new review
    const review = await Review.create({
      content: json.content,
      rating: json.rating,
      campground: campground._id,
      author: user.name,
      user: user._id,
    });

    console.log("Review:", review)

    // console.log("Review object:", review);

    // You might want to update the campground document here
    // For example, pushing the review to a 'reviews' field in campground
    // campground.reviews.push(review._id);
    // await review.save();

    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string }  }) {
  await connectMongoDB();

  try {
    const reviews = await Review.find({ campground: params.id }).populate('user', 'name');
    return NextResponse.json({ reviews }, { status: 200 }); 

  } catch (error: any) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });

  }
}