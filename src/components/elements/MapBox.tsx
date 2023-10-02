"use client";

import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapBox() {
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as any;
    new mapboxgl.Map({
      container: "mapBox",
      attributionControl: false,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [13.405, 52.52],
      zoom: 9,
    });
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div id="mapBox" style={{ width: "80%", height: "28em" }} />
    </div>
  );
}
