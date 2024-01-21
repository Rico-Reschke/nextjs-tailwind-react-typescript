"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";

export function MapBox() {
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

    map.on("load", async () => {
      const res = await fetch("/api/campgrounds");
      const fetchedData = await res.json();

      console.log("Campground data:", fetchedData);

      const geojsonData = {
        type: "FeatureCollection",
        features: fetchedData.campgrounds.map((campground: any) => ({
          type: "Feature",
          properties: {
            title: campground.title,
            description: campground.description,
            price: campground.price,
            location: campground.location,
            images: campground.images,
            id: campground._id,
          },
          geometry: {
            type: "Point",
            coordinates: campground.geometry.coordinates,
          },
        })),
      };

      map.addSource("campgrounds", {
        type: "geojson",
        data: geojsonData as any,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "campgrounds",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#51bbd6",
            10,
            "#f1f075",
            30,
            "#f28cb1",
          ],
          "circle-radius": ["step", ["get", "point_count"], 15, 10, 20, 30, 25],
        },
      });

      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "campgrounds",
        filter: ["!", ["has", "point_count"]],
        paint: {
        },
      });
    });

    return () => map.remove();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div
        id="map"
        style={{
          width: "97.3%",
          height: "41em",
          marginTop: "15px",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
          borderBottomLeftRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
        }}
      />
    </div>
  );
}
