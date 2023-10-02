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
  <div>
  <div id="mapBox" style={{ width: "100%", height: "500px" }} />;
  <a href='https://www.mapbox.com/about/maps/' target='_blank'>Maps &copy; Mapbox &copy; OpenStreetMap</a>
  </div>
  );
}
