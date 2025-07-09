// VehiclesList.js
"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import CategoryTemplate from "../common/CategoryTemplate";

export default function VehiclesList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVehicles() {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/rentals");
        const data = Array.isArray(res?.data) ? res.data : res;

        const filtered = (Array.isArray(data) ? data : []).filter(item => {
          const category = (item.category || item.Category || "").toLowerCase().trim();
          return category === "vehicles";
        });

        setVehicles(filtered);
      } catch (err) {
        setError(
          typeof err === "string"
            ? err
            : err?.response?.data?.message || err.message || "Failed to load vehicles."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchVehicles();
  }, []);

  return (
    <CategoryTemplate
      title="Vehicles"
      description="Explore a wide range of vehicles available for rent"
      items={vehicles}
      loading={loading}
      error={error}
      categoryImage="/vehicles-hero.jpg"
    />
  );
}
