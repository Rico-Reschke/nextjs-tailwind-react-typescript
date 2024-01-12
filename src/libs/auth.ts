import bcrypt from 'bcrypt';
import { log } from 'console';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Session } from 'next-auth';
import connectMongoDB from '@/libs/mongodb';
import User from '@/models/User';

interface ExtendedUser {
  role?: string;
}

interface ExtendedSession extends Session {
  user?: {
    role?: string;
  } & Session['user'];
}

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

  // callbacks: {
  //   async session({ session, user }) {
  //     const extendedSession = session as ExtendedSession;
  //     const extendedUser = user as ExtendedUser;

  //     // Prüfen Sie, ob user und session.user existieren und fügen Sie die Rolle hinzu
  //     if (extendedUser.role && extendedSession.user) {
  //       extendedSession.user.role = extendedUser.role;
  //     }

  //     return extendedSession;
  //   },
  // },
};
