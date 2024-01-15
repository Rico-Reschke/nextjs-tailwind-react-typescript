import bcrypt from 'bcrypt';
import { log } from 'console';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongoDB from '@/libs/mongodb';
import User from '@/models/User';

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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Hier wird TypeScript nun die 'role'-Eigenschaft erkennen
      }
      return token;
    },
    async session({ session, token }) {
      if (!session.user) {
        session.user = {};
      }
      session.user.role = token.role as string; // Nun ist sichergestellt, dass session.user existiert
      return session;
    },
  },
};
