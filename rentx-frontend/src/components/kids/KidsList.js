// KidsList.js
"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import CategoryTemplate from "../common/CategoryTemplate";

export default function KidsList() {
  const [kidsItems, setKidsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchKids() {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/rentals");
        const data = Array.isArray(res?.data) ? res.data : res;

        const filtered = (Array.isArray(data) ? data : []).filter(item => {
          const category = (item.category || item.Category || "").toLowerCase().trim();
          return category === "kids";
        });

        setKidsItems(filtered);
      } catch (err) {
        setError(
          typeof err === "string"
            ? err
            : err?.response?.data?.message || err.message || "Failed to load kids items."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchKids();
  }, []);

  return (
    <CategoryTemplate
      title="Kids' Collection"
      description="Find quality items for children of all ages"
      items={kidsItems}
      loading={loading}
      error={error}
      categoryImage="/kids-hero.jpg"
    />
  );
}
