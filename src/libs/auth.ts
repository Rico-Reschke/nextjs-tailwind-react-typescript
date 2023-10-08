import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectMongoDB from "@/libs/mongodb";
import { NextAuthOptions } from "next-auth";
import User from "@/models/User";
import { log } from "console";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        log("LOGIN", credentials);

        await connectMongoDB();

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const user =
            (await User.findOne({ name: email })) ||
            (await User.findOne({ email }));

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) return null;

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
};
