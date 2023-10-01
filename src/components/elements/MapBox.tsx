"use client";

import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

export default function MapBox() {
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as any;
    const map = new mapboxgl.Map({
      container: "deine-map-id",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [13.405, 52.52],
      zoom: 9,
    });
  }, []);

  return (
    <div id="deine-map-id" style={{ width: "80%", height: "500px" }}></div>
  );
}
