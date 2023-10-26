import "@/styles/globals.css";

import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";

import Navbar from "@/components/container/Navbar";
import { SessionProvider } from "@/components/Provider";
import { authOptions } from "@/libs/auth";

import type { Metadata } from "next";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campgrounds",
  description: "Campgrounds by Crackstein",
  viewport: "width=device-width, initial-scale=1",
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
        <Head>
        </Head>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
