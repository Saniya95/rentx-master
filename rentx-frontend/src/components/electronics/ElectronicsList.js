// ElectronicsList.js
"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import CategoryTemplate from "../common/CategoryTemplate";

export default function ElectronicsList() {
  const [electronicsItems, setElectronicsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchElectronics() {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/rentals");
        const data = Array.isArray(res?.data) ? res.data : res; // 🛡️ Fallback safety

        const filtered = (Array.isArray(data) ? data : []).filter(item => {
          const category = (item.category || item.Category || "").toLowerCase().trim();
          return category === "electronics";
        });

        setElectronicsItems(filtered);
      } catch (err) {
        setError(
          typeof err === "string"
            ? err
            : err?.response?.data?.message || err.message || "Failed to load electronics items."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchElectronics();
  }, []);

  return (
    <CategoryTemplate
      title="Electronics"
      description="Browse high-quality electronics available for rent"
      items={electronicsItems}
      loading={loading}
      error={error}
      categoryImage="/electronics-hero.jpg"
    />
  );
}
