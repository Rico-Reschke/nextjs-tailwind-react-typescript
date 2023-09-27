import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  try {
    await connectMongoDB();
    const { email } = req.body;
    const user = await User.findOne({ email }).select("_id");
    console.log("user: ", user);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
}