import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

// Benennen Sie die Funktion nach der HTTP-Methode, die sie behandeln soll
export async function POST(
  req: NextApiRequest, 
  res: NextApiResponse,
) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered." });
  } catch (error) {
    res.status(500).json(
      { message: "An error occurred while registering the user." }
    );
  }
}