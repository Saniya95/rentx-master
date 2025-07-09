"use client";

import Image from "next/image";
import Link from "next/link";
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

export default function PopularCategories() {
  const categories = [
    {
      href: "/electronics",
      title: "Electronics",
      desc: "Laptops, cameras, VR headsets and more",
      image:
        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      items: "250+",
      rating: "4.8",
    },
    {
      href: "/vehicles",
      title: "Vehicles",
      desc: "Cars, bikes, scooters and more",
      image:
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      items: "180+",
      rating: "4.7",
    },
    {
      href: "/furniture",
      title: "Furniture",
      desc: "Chairs, tables, sofas and more",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      items: "320+",
      rating: "4.9",
    },
    {
      href: "/sports",
      title: "Tools & Equipment",
      desc: "Power tools, gardening equipment and more",
      image:
        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      items: "410+",
      rating: "4.8",
    },
  ];

  return (
  
  <section className="min-h-screen bg-gradient-to-b from-[#0A0F2C] via-black to-[#0A0F2C] text-white flex flex-col justify-between">
    <div className="max-w-7xl mx-auto px-4 w-full pt-8">
      {/* ✅ Section Divider stays at top */}
      <SectionDivider />
    </div>

    {/* ✅ Bottom-aligned content */}
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
          Popular Categories
        </h2>
        <p className="text-gray-400 text-lg">
          Browse through our most popular rental categories to find what you need
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            custom={i}
          >
            <Link href={cat.href} className="no-underline">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:-translate-y-1 transition-all duration-300 shadow-lg flex flex-col h-full">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  width={400}
                  height={160}
                  className="rounded-lg mb-3 object-cover h-40 w-full"
                />
                <h5 className="text-xl font-semibold text-[#F5E6C8] mb-1">{cat.title}</h5>
                <p className="text-gray-300 text-sm mb-4">{cat.desc}</p>
                <div className="flex justify-between text-xs text-gray-400 mt-auto">
                  <span>📦 {cat.items} items</span>
                  <span>⭐ {cat.rating}/5</span>
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
