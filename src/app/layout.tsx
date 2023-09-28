import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { SessionProvider } from "@/components/Provider";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YelpCamp",
  description: "YelpCamp by Crackstein",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}
