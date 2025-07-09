// SportsList.js
"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import CategoryTemplate from "../common/CategoryTemplate";

export default function SportsList() {
  const [sportsItems, setSportsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSports() {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/rentals");
        const data = Array.isArray(res?.data) ? res.data : res;

        const filtered = (Array.isArray(data) ? data : []).filter(item => {
          const category = (item.category || item.Category || "").toLowerCase().trim();
          return category === "sports";
        });

        setSportsItems(filtered);
      } catch (err) {
        setError(
          typeof err === "string"
            ? err
            : err?.response?.data?.message || err.message || "Failed to load sports items."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchSports();
  }, []);

  return (
    <CategoryTemplate
      title="Sports Equipment"
      description="Find premium sports equipment for your next adventure"
      items={sportsItems}
      loading={loading}
      error={error}
      categoryImage="/sports-hero.jpg"
    />
  );
}
