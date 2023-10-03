"use client";

import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapBox() {
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as any;
    const map = new mapboxgl.Map({
      container: "map",
      attributionControl: false,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [13.405, 52.52],
      zoom: 9,
      dragRotate: true,
      touchZoomRotate: true,
    });

    map.addControl(new mapboxgl.NavigationControl(), "bottom-left");
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div id="map" style={{ width: "80%", height: "28em", marginTop: "20px" }} />
    </div>
  );
}
