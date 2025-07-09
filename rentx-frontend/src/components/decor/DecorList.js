// DecorList.js
"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import CategoryTemplate from "../common/CategoryTemplate";

export default function DecorList() {
  const [decorItems, setDecorItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDecor() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/rentals");
        const data = Array.isArray(res?.data) ? res.data : res; // 🛡️ Safety check

        const filtered = (Array.isArray(data) ? data : []).filter(item => {
          const category = (item.category || item.Category || "").toLowerCase().trim();
          return category === "decor";
        });

        setDecorItems(filtered);
      } catch (err) {
        setError(
          typeof err === "string"
            ? err
            : err?.response?.data?.message || err.message || "Failed to load decor items."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDecor();
  }, []);

  return (
    <CategoryTemplate
      title="Home Decor"
      description="Transform your space with our beautiful decor items"
      items={decorItems}
      loading={loading}
      error={error}
      categoryImage="/decor-hero.jpg"
    />
  );
}
