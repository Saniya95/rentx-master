// MaleFashionList.js
"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import CategoryTemplate from "../common/CategoryTemplate";

export default function MaleFashionList() {
  const [maleItems, setMaleItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMale() {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/rentals");
        const data = Array.isArray(res?.data) ? res.data : res;

        const filtered = (Array.isArray(data) ? data : []).filter(item => {
          const category = (item.category || item.Category || "").toLowerCase().trim();
          return category === "male";
        });

        setMaleItems(filtered);
      } catch (err) {
        setError(
          typeof err === "string"
            ? err
            : err?.response?.data?.message || err.message || "Failed to load male fashion items."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchMale();
  }, []);

  return (
    <CategoryTemplate
      title="Men's Fashion"
      description="Explore stylish and modern men's fashion for any occasion"
      items={maleItems}
      loading={loading}
      error={error}
      categoryImage="/male-fashion-hero.jpg"
    />
  );
}
