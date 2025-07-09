// FashionList.js
"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import CategoryTemplate from "../common/CategoryTemplate";

export default function FashionList() {
  const [fashionItems, setFashionItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFashion() {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/rentals");
        const data = Array.isArray(res?.data) ? res.data : res;

        const filtered = (Array.isArray(data) ? data : []).filter(item => {
          const category = (item.category || item.Category || "").toLowerCase().trim();
          return category === "fashion";
        });

        setFashionItems(filtered);
      } catch (err) {
        setError(
          typeof err === "string"
            ? err
            : err?.response?.data?.message || err.message || "Failed to load fashion items."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchFashion();
  }, []);

  return (
    <CategoryTemplate
      title="Fashion"
      description="Discover trendy fashion items available for rent"
      items={fashionItems}
      loading={loading}
      error={error}
      categoryImage="/fashion-hero.jpg"
    />
  );
}
