import MapBox from "@/components/elements/MapBox";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Campground() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <MapBox />
      <div id="deine-map-id" style={{ width: "80%", height: "500px" }} />
    </div>
  );
}
