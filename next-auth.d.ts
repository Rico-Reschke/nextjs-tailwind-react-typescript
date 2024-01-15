import 'next-auth';

declare module 'next-auth' {
  interface User {
    role: string;
  }

  interface Session {
    user: {
      role: string;
    } & DefaultSession['user'];
  }
}