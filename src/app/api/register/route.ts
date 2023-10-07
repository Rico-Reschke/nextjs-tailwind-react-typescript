import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { log } from "console";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    log("REGISTER", json);

    const hashedPassword = await bcrypt.hash(json.password, 10);
    await connectMongoDB();
    await User.create({
      name: json.name,
      email: json.email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 },
    );
  }
}
