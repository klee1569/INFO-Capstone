"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import HealthcareMap from "../../components/maps/HealthcareMap";
import { cityCoordinates } from "../../lib/healthcare/cityCoordinates";

export default function AppointmentsPage() {
  const [city, setCity] = useState("seattle");

  const [loading, setLoading] = useState(false);

  const [centers, setCenters] = useState([]);

  const selectedCity = cityCoordinates[city];

  useEffect(() => {
    async function loadCenters() {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          lat: String(selectedCity.lat),
          lng: String(selectedCity.lng),
        });

        const response = await fetch(
          `/api/healthcare-centers?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch centers");
        }

        const data = await response.json();

        setCenters(data);
      } catch (error) {
        console.error(error);
        setCenters([]);
      } finally {
        setLoading(false);
      }
    }

    loadCenters();
  }, [city]);

  return (
    <>
      <Navbar />

      <main className="appointments-page">
        <div className="appointments-header">
          <div>
            <h1>Healthcare Appointments</h1>

            <p>
              Search local healthcare centers by city
            </p>
          </div>

          <div className="city-select-wrapper">
            <label htmlFor="city-select">
              Choose a city
            </label>

            <select
              id="city-select"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              className="city-select"
            >
              <option value="seattle">Seattle</option>
              <option value="chicago">Chicago</option>
              <option value="miami">Miami</option>
              <option value="newyork">New York</option>
              <option value="losangeles">
                Los Angeles
              </option>
            </select>
          </div>
        </div>

        <section className="appointments-map-section">
          {loading ? (
            <div className="appointments-loading">
              Loading healthcare centers...
            </div>
          ) : (
            <HealthcareMap
              centers={centers}
              center={[
                selectedCity.lat,
                selectedCity.lng,
              ]}
            />
          )}
        </section>
      </main>
    </>
  );
}
