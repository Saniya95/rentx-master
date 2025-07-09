"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import CategoryTemplate from "../common/CategoryTemplate";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AccessoriesList() {
  const [accessoriesItems, setAccessoriesItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAccessories() {
      setLoading(true);
      setError("");

      try {
        const data = await api.get("/rentals");
        console.log("✅ Raw response from /rentals:", data);

        if (!Array.isArray(data)) {
          throw new Error("Expected an array from /rentals API.");
        }

        const filtered = data.filter((item) => {
          const category = item.category || item.Category || "";
          return category.toLowerCase().trim() === "accessories";
        });

        console.log("🎯 Filtered accessories:", filtered);
        setAccessoriesItems(filtered);
      } catch (err) {
        console.error("❌ Error fetching accessories:", err);
        setError(
          typeof err === "string"
            ? err
            : err?.message || "Failed to load accessories items."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchAccessories();
  }, []);

  return (
    <section className="bg-gradient-to-b from-[#0A0F2C] via-black to-[#0A0F2C] text-white py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold font-playfair text-[#F5E6C8] text-center mb-6"
        >
          Accessories
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center text-gray-300 max-w-2xl mx-auto mb-12"
        >
          Discover stylish accessories to complement your look
        </motion.p>

        <CategoryTemplate
          title="Accessories"
          description="Discover stylish accessories to complement your look"
          items={accessoriesItems}
          loading={loading}
          error={error}
          categoryImage="/accessories-hero.jpg"
        />
      </div>
    </section>
  );
}
