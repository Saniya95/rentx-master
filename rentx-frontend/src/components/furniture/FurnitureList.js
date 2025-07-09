// FurnitureList.js
"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import CategoryTemplate from "../common/CategoryTemplate";

export default function FurnitureList() {
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFurniture() {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/rentals");
        const data = Array.isArray(res?.data) ? res.data : res;

        const filtered = (Array.isArray(data) ? data : []).filter(item => {
          const category = (item.category || item.Category || "").toLowerCase().trim();
          return category === "furniture";
        });

        setFurnitureItems(filtered);
      } catch (err) {
        setError(
          typeof err === "string"
            ? err
            : err?.response?.data?.message || err.message || "Failed to load furniture items."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchFurniture();
  }, []);

  return (
    <CategoryTemplate
      title="Furniture"
      description="Find the perfect furniture for your home or event"
      items={furnitureItems}
      loading={loading}
      error={error}
      categoryImage="/furniture-hero.jpg"
    />
  );
}
