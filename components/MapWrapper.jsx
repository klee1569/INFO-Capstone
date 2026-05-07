"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

export default function MapWrapper() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchPlaces = async () => {
    console.log("SEARCH CLICKED:", query);

    const overpassQuery = `
      [out:json];
      (
        node["amenity"~"hospital|clinic|doctors"](around:15000,47.6062,-122.3321);
        way["amenity"~"hospital|clinic|doctors"](around:15000,47.6062,-122.3321);
        relation["amenity"~"hospital|clinic|doctors"](around:15000,47.6062,-122.3321);

        node["healthcare"](around:15000,47.6062,-122.3321);
        way["healthcare"](around:15000,47.6062,-122.3321);
        relation["healthcare"](around:15000,47.6062,-122.3321);
      );
      out center tags;
    `;

    try {
      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: overpassQuery,
      });

      const data = await res.json();

      const formatted = data.elements.map((el) => ({
        lat: el.lat || el.center?.lat,
        lon: el.lon || el.center?.lon,
        display_name: el.tags?.name || "Unknown Medical Facility",
        tags: el.tags,
      }));

      console.log("OVERPASS RESULT:", formatted);

      setResults(formatted);
    } catch (err) {
      console.error("OVERPASS ERROR:", err);
      setResults([]);
    }
  };

  return (
    <div>
      {/* SEARCH UI */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search hospitals..."
        />

        <button onClick={searchPlaces}>
          Search
        </button>
      </div>

      {/* MAP */}
      <MapView results={results} />

      {/* DEBUG LIST */}
      <ul>
        {results.slice(0, 5).map((r, i) => (
          <li key={i}>{r.display_name}</li>
        ))}
      </ul>
    </div>
  );
}