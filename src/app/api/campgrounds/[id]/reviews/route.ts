import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from "@/libs/mongodb";
import Review from "@/models/Review";
import Campground from "@/models/Campground";
import { getServerSession } from "next-auth"
import User from "@/models/User";

export async function POST(req: NextRequest, context: any) {
  await connectMongoDB();
  const session = await getServerSession();

  const email = session?.user?.email;
  const user = await User.findOne({ email });
  
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const json = await req.json();
    const url = new URL(req.url);
    const campgroundId = url.pathname.split('/')[3];
    const campground = await Campground.findById(campgroundId);

    if (!campground) {
      return new Response(JSON.stringify({ message: 'Campground not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const review = await Review.create({
      content: json.content,
      rating: json.rating,
      campground: campground._id,
      author: user.name,
      user: user._id,
    });

    return new Response(JSON.stringify(review), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string }  }) {
  await connectMongoDB();

  try {
    const reviews = await Review.find({ campground: params.id }).populate('user', 'name');
    return new Response(JSON.stringify({ reviews }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}