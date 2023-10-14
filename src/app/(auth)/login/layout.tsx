import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default async function LoginLayout({ children }: LoginLayoutProps) {
  const session = await getServerSession(authOptions);

  if (session) redirect("/campgrounds");
  
  return <>{children}</>;
}
