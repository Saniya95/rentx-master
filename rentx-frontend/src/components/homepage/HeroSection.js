"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { api } from "@/utils/api";
import { motion } from "framer-motion";

const categorySlugs = [
  "vehicles", "kids", "furniture", "fashion",
  "decor", "electronics", "accessories", "sports",
  "female", "male"
];

export default function HeroSection() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchSlides() {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get("/rentals");
        const data = Array.isArray(res?.data) ? res.data : res;

        const allProducts = [];
        for (const category of categorySlugs) {
          const filtered = (Array.isArray(data) ? data : []).filter(
            (item) =>
              (item.category || item.Category || "")
                .toLowerCase()
                .trim() === category
          );
          allProducts.push(...filtered);
        }

        const mapped = allProducts.map((item) => ({
          image:
            item.image && !item.image.startsWith("http")
              ? `https://rentx-backend.onrender.com/${item.image}`
              : item.image || item.img || "/ref1.png",
          title: item.name || item.title || "Product",
          subtitle: item.price ? `₹${item.price}/day` : item.category || "",
          button: {
            text: "Rent Now",
            link: `/booking?rentalId=${item._id}`,
          },
        }));

        setSlides(
          mapped.length
            ? mapped
            : [getFallbackSlide("No products found", "Please check back later.")]
        );
      } catch (e) {
        setError(e.message || "Failed to fetch products");
        setSlides([
          getFallbackSlide("Connection Error", "Could not connect to the server."),
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchSlides();
  }, []);

  const getFallbackSlide = (title, subtitle) => ({
    image: "/ref1.png",
    title,
    subtitle,
    button: { text: "Explore", link: "/category" },
  });

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [slides]);

  const goTo = (idx) => setCurrent(idx);
  const prev = () =>
    setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => setCurrent((current + 1) % slides.length);

  return (
    <section className="relative bg-[#0A0F2C] text-white min-h-screen py-12 overflow-hidden flex items-center">
      {/* Yellow blur background shape */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#FFD700] opacity-10 blur-3xl rounded-full pointer-events-none z-0" />

      <div className="w-full px-4 lg:px-8 xl:px-12 2xl:px-20 max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 relative z-10">
        {/* 📝 Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={loaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-left w-full lg:w-[50%] xl:w-[55%]"
        >
          <span className="inline-block bg-[#F5E6C8] text-[#0A0F2C] px-3 py-1 text-xs rounded-full mb-3 font-medium">
            Trusted by 10K+ renters
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#F5E6C8] mb-6 font-serif leading-snug">
            Rent Anything.<br /> Anytime.<br /> Anywhere.
          </h1>
          <p className="text-[#E1E1E1] mb-8 text-lg max-w-2xl">
            India’s smartest rental platform for gadgets, fashion, vehicles and more.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/category"
              className="bg-[#F5E6C8] text-[#0A0F2C] px-6 py-3 rounded-full font-semibold shadow hover:bg-white transition flex items-center gap-2"
            >
              📦 Start Renting
            </a>
            <a
              href="/add-product"
              className="border border-[#F5E6C8] text-[#F5E6C8] px-6 py-3 rounded-full hover:bg-[#F5E6C8] hover:text-[#0A0F2C] transition flex items-center gap-2"
            >
              ➕ List Your Item
            </a>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-200/20 text-red-300 rounded-lg border border-red-300">
              <p><strong>Error:</strong> {error}</p>
              <p className="text-sm mt-1">Make sure backend is running at https://rentx-backend.onrender.com/</p>
            </div>
          )}
        </motion.div>

        {/* 🎞️ Slider Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={loaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="w-full lg:w-[50%] xl:w-[45%] flex justify-end"
        >
          <div className="relative w-full max-w-[420px] h-[480px] rounded-xl overflow-hidden border border-[#F5E6C8] bg-[#1D2541] shadow-lg">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100/60">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FFD700]"></div>
              </div>
            ) : (
              slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
                    idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority={idx === 0}
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end rounded-b-2xl">
                    <h3 className="text-xl font-bold text-white">{slide.title}</h3>
                    <p className="text-sm text-white mb-2">{slide.subtitle}</p>
                    <a
                      href={slide.button.link}
                      className="inline-block px-4 py-2 mt-2 bg-[#FFD700] text-[#1A1A1A] rounded hover:bg-white transition"
                    >
                      {slide.button.text}
                    </a>
                  </div>
                </div>
              ))
            )}
            {/* ⬅️ Navigation Arrows */}
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1B3C34] rounded-full w-9 h-9 flex items-center justify-center z-20">&#8249;</button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1B3C34] rounded-full w-9 h-9 flex items-center justify-center z-20">&#8250;</button>
            {/* ⭕ Slide Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`w-3 h-3 rounded-full ${idx === current ? "bg-[#FFD700]" : "bg-white/40"} border border-white`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#F5E6C8]/30 to-transparent" />
    </section>
  );
}
