import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface RegisterLayoutProps {
  children: React.ReactNode;
}

export default async function RegisterLayout({
  children,
}: RegisterLayoutProps) {
  const session = await getServerSession(authOptions);

  if (session) redirect("/campgrounds");
  return <>{children}</>;
}
