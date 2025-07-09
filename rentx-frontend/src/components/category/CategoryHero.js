"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import shopAnimation from "../../../public/animations/shop.json";



const fadeFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const fadeFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export default function CategoryHero() {
  return (
    <section className="relative bg-[#0A0F2C] text-white min-h-screen py-12 overflow-hidden flex flex-col justify-end">
      {/* 🌟 Glowing Orb Background */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#FFD700] opacity-10 blur-3xl rounded-full pointer-events-none z-0" />

      {/* Divider at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#F5E6C8]/30 to-transparent z-10" />

      <div className="container mx-auto px-4 pb-12 z-10">
        {/* 🔍 Search Bar */}
        <motion.div
          className="mb-12 bg-[#14213D]/70 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full md:w-2/3 px-5 py-3 rounded-xl bg-[#0A0F2C]/80 border border-[#314266] text-white placeholder-[#B0BBD0] focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all duration-300"
          />
          <select className="w-full md:w-1/3 px-5 py-3 rounded-xl bg-[#0A0F2C]/80 border border-[#314266] text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all duration-300">
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="fashion">Fashion</option>
            <option value="vehicles">Vehicles</option>
          </select>
        </motion.div>

        {/* Hero Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={fadeFromLeft}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-playfair text-[#F5E6C8] mb-6">
              Browse Categories
            </h1>
            <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
              Discover rental categories tailored to your needs — from{" "}
              <span className="text-yellow-400 font-semibold">electronics</span> and{" "}
              <span className="text-yellow-400 font-semibold">fashion</span> to{" "}
              <span className="text-yellow-400 font-semibold">vehicles</span> and{" "}
              <span className="text-yellow-400 font-semibold">furniture</span>. Rent anything, anytime, anywhere.
            </p>
            <div className="mt-6 flex gap-4 text-sm text-gray-400">
              <span>📦 1,200+ Products</span>
              <span>⭐ 4.8 Avg Rating</span>
              <span>📍 Pan-India</span>
            </div>
            <div className="mt-6">
              <button className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-500 transition">
                Explore Now
              </button>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={fadeFromRight}
          >
            <div className="relative h-full rounded-2xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
              <Lottie animationData={shopAnimation} loop={true} className="w-full h-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
