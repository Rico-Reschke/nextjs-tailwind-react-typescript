"use client";

import Campgrounds from "@/components/pages/Campgrounds";
import MapBox from "@/components/utils/MapBox";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Campground() {
  const [campgrounds, setCampgrounds] = useState<any[]>([]);

  useEffect(() => {
    const fetechedCampgrounds = async () => {
      const res = await axios.get("/api/campgrounds");
      console.log(res.data);
      setCampgrounds(res.data);
    };
    fetechedCampgrounds();
  }, []);

  return (
    <>
      <MapBox />
      <Campgrounds />
      {campgrounds.map((campground) => (
        <>asd</>
      ))}
    </>
  );
}
