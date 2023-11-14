import connectMongoDB from "@/libs/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(JSON.parse(JSON.stringify(error)), {
      status: 500,
    });
  }
}
