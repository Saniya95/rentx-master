"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

export default function AICategories() {
  const categories = [
    {
      title: "Fashion",
      desc: "Lehengas, sherwanis, and more for your events",
      image:
        "https://images.unsplash.com/photo-1589363358751-ab05797e5629?w=600&auto=format&fit=crop&q=60",
      items: "150+",
      rating: "4.9",
    },
    {
      title: "Event & Party Supplies",
      desc: "Decorations, lighting, and banquet halls",
      image:
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1350&q=80",
      items: "200+",
      rating: "4.8",
    },
    {
      title: "Real Estate",
      desc: "Apartments, offices, and event venues",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1350&q=80",
      items: "100+",
      rating: "4.7",
    },
    {
      title: "Electronics",
      desc: "Cameras, laptops, and gadgets",
      image:
        "https://images.unsplash.com/photo-1589451825788-d81b78a48a33?w=600&auto=format&fit=crop&q=60",
      items: "250+",
      rating: "4.8",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0A0F2C] via-black to-[#0A0F2C] text-white flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 w-full pt-45 pb-35">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#F5E6C8] mb-3">
            Explore Categories for You
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Curated rental categories based on your preferences and location, powered by AI.
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
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:-translate-y-1 transition-all duration-300 shadow-lg flex flex-col"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                width={400}
                height={160}
                className="rounded-xl mb-3 object-cover h-40 w-full"
              />
              <h5 className="text-xl font-semibold text-[#F5E6C8] mb-1">{cat.title}</h5>
              <p className="text-gray-300 text-sm mb-4">{cat.desc}</p>
              <div className="flex justify-between text-xs text-gray-400 mt-auto pt-3 border-t border-white/10">
                <span>📦 {cat.items} items</span>
                <span>⭐ {cat.rating}/5</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
