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

      map.on("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        if (!features.length) return;

        const clusterId = features[0].properties?.cluster_id as number; // Annahme, dass cluster_id eine Zahl ist
        const source = map.getSource("campgrounds") as mapboxgl.GeoJSONSource; // Typcast zu GeoJSONSource

        // Überprüfe, ob getClusterExpansionZoom existiert und führe es aus, wenn ja
        source.getClusterExpansionZoom &&
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            const coordinates =
              features[0].geometry?.type === "Point"
                ? features[0].geometry.coordinates
                : null;
            if (!coordinates) return;

            map.easeTo({
              center: coordinates as [number, number], // Stelle sicher, dass coordinates ein Zahlenpaar ist
              zoom: zoom,
            });
          });
      });

      map.on("click", "unclustered-point", (e) => {
        const features = e.features;
        if (!features || !features.length) return;

        const coordinates =
          features[0].geometry?.type === "Point"
            ? features[0].geometry.coordinates
            : null;
        if (!coordinates) return;

        const { title, description } = features[0].properties ?? {}; // Verwende leeres Objekt als Fallback

        new mapboxgl.Popup()
          .setLngLat(coordinates as [number, number])
          .setHTML(`<strong>${title ?? ""}</strong><p>${description ?? ""}</p>`)
          .addTo(map);
      });

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
            "#4fff00",
            10,
            "#fffd00",
            20,
            "#ff1100",
          ],
          "circle-radius": ["step", ["get", "point_count"], 20, 10, 25, 35, 40],
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "campgrounds",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "campgrounds",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-radius": 8, // Größe des Kreises in Pixel
          "circle-color": "#ffffff", // Farbe des Kreises, optional
          "circle-stroke-color": "#000000", // Farbe des Kreisrandes, optional
          "circle-stroke-width": 2, // Dicke des Kreisrandes, optional
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
