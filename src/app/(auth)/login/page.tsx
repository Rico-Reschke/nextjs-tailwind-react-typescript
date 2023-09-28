import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/elements/LoginForm";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/campgrounds");

  return (
    <main>
      <LoginForm />
    </main>
  );
}
