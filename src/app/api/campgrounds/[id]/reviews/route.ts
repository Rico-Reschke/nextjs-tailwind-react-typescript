import connectMongoDB from "@/libs/mongodb";
import User from "@/models/User";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  await connectMongoDB();
  try {
    const json = await req.json();
    
    log("REGISTER", json);


    const user = await User.create({
      name: json.name,
      email: json.email,
      password: hashedPassword,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}