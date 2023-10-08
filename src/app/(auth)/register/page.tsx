import RegisterForm from "@/components/elements/RegisterForm";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/campgrounds");

  return <RegisterForm />;
}
