"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FitBounds({ results }) {
  const map = useMap();

  useEffect(() => {
    if (!results || results.length === 0) return;

    const points = results
      .map(r => [
        parseFloat(r.lat),
        parseFloat(r.lon)
      ])
      .filter(p => !isNaN(p[0]) && !isNaN(p[1]));

    if (points.length === 0) return;

    const bounds = L.latLngBounds(points);

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 15,
    });
  }, [results]);

  return null;
}

export default function MapView({ results }) {
  return (
    <MapContainer
      center={[47.6062, -122.3321]}
      zoom={12}
      style={{ height: 400, width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <FitBounds results={results} />

      {results?.map((r, i) => {
        const lat = parseFloat(r.lat);
        const lon = parseFloat(r.lon);

        if (isNaN(lat) || isNaN(lon)) return null;

        return (
          <Marker key={i} position={[lat, lon]}>
            <Popup>{r.display_name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}