"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/utils/api";
import { motion } from "framer-motion";
import SectionDivider from "@/components/ui/SectionDivider";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function FeaturedItems() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await api.get("/rentals");
        console.log("Fetched rentals response:", res);

        const rentals = Array.isArray(res) ? res : [];
        const selected = rentals.slice(0, 4);

        const mapped = selected.map((item) => ({
          id: item._id,
          title: item.name || item.title || "Product",
          price: item.price || "N/A",
          category: item.category || "Misc",
          image:
            item.image && !item.image.startsWith("http")
              ? `https://rentx-backend.onrender.com/${item.image}`
              : item.image || item.img || "/ref1.png",
        }));

        setFeatured(mapped);
      } catch (error) {
        console.error("Error fetching featured:", error);
        setFeatured([]); // fallback to prevent crash
      }
    }

    fetchFeatured();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0A0F2C] via-black to-[#0A0F2C] text-white flex flex-col justify-between">
      {/* 🔝 Top Divider */}
      <div className="max-w-7xl mx-auto px-4 w-full pt-8">
        <SectionDivider />
      </div>

      {/* ⬇️ Content */}
      <div className="max-w-7xl mx-auto px-4 w-full pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#F5E6C8] mb-3">
            Featured Items
          </h2>
          <p className="text-gray-400 text-lg">
            Our top-picked rentals just for you, updated weekly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              custom={i}
            >
              <Link
                href={`/booking?rentalId=${item.id}`}
                className="no-underline"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:-translate-y-1 transition-all duration-300 shadow-lg flex flex-col h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={160}
                    className="rounded-lg mb-3 object-cover h-40 w-full"
                  />
                  <h5 className="text-xl font-semibold text-[#F5E6C8] mb-1">
                    {item.title}
                  </h5>
                  <p className="text-gray-300 text-sm mb-1">
                    {item.category}
                  </p>
                  <div className="flex justify-between text-sm text-gray-400 mt-auto">
                    <span>💰 ₹{item.price}/day</span>
                    <span>⭐ 4.{7 + (i % 3)}/5</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
