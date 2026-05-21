"use client";

import { useEffect, useRef } from "react";

import "leaflet/dist/leaflet.css";

export default function HealthcareMap({
  centers,
  center,
}) {
  const mapRef = useRef(null);

  const leafletMapRef =
    useRef(null);

  const markersLayerRef =
    useRef(null);

  // initialize map ONCE
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      const L = (await import("leaflet"))
        .default;

      if (
        !isMounted ||
        !mapRef.current ||
        leafletMapRef.current
      ) {
        return;
      }

      delete L.Icon.Default.prototype
        ._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(
        mapRef.current
      ).setView(center, 12);

      leafletMapRef.current = map;

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            "&copy; OpenStreetMap contributors",
        }
      ).addTo(map);

      markersLayerRef.current =
        L.layerGroup().addTo(map);
    }

    initMap();

    return () => {
      isMounted = false;

      if (
        leafletMapRef.current
      ) {
        leafletMapRef.current.remove();

        leafletMapRef.current =
          null;
      }
    };
  }, []);

  // update markers + center
  useEffect(() => {
    async function updateMap() {
      const L = (await import("leaflet"))
        .default;

      const map =
        leafletMapRef.current;

      const markersLayer =
        markersLayerRef.current;

      if (
        !map ||
        !markersLayer
      ) {
        return;
      }

      // move map
      map.setView(center, 12);

      // clear old markers
      markersLayer.clearLayers();

      // add new markers
      centers.forEach(
        (location) => {
          const marker = L.marker([
            location.lat,
            location.lng,
          ]);

          marker.bindPopup(`
            <div>
              <h3>${location.name}</h3>

              <p>${location.type}</p>

              <button
                style="
                  margin-top:8px;
                  padding:8px 12px;
                  border:none;
                  border-radius:6px;
                  background:#2563eb;
                  color:white;
                  cursor:pointer;
                "
              >
                Book Appointment
              </button>
            </div>
          `);

          marker.addTo(markersLayer);
        }
      );
    }

    updateMap();
  }, [centers, center]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "650px",
        borderRadius: "12px",
      }}
    />
  );
}