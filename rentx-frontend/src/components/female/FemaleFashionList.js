// FemaleFashionList.js
"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import CategoryTemplate from "../common/CategoryTemplate";

export default function FemaleFashionList() {
  const [femaleItems, setFemaleItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFemale() {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/rentals");
        const data = Array.isArray(res?.data) ? res.data : res;

        const filtered = (Array.isArray(data) ? data : []).filter(item => {
          const category = (item.category || item.Category || "").toLowerCase().trim();
          return category === "female";
        });

        setFemaleItems(filtered);
      } catch (err) {
        setError(
          typeof err === "string"
            ? err
            : err?.response?.data?.message || err.message || "Failed to load female fashion items."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchFemale();
  }, []);

  return (
    <CategoryTemplate
      title="Women's Fashion"
      description="Discover elegant and trendy women's fashion for any occasion"
      items={femaleItems}
      loading={loading}
      error={error}
      categoryImage="/female-fashion-hero.jpg"
    />
  );
}
