import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

interface CampgroundsLayoutProps {
  children: React.ReactNode;
}

export default async function CampgroundsLayout({
  children,
}: CampgroundsLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
