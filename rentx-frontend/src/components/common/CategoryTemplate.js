"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CategoryTemplate({
  title,
  description,
  items,
  loading,
  error,
  categoryImage = "/ref1.png",
}) {
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const getImageList = (item) => {
    return [item.image, item.image2, item.image3].map((img) =>
      img ? (img.startsWith("http") ? img : `https://rentx-backend.onrender.com/${img}`) : "/ref1.png"
    );
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 inline-block mx-auto">
          <h3 className="text-red-600 font-medium text-lg mb-2">Error Loading Items</h3>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );

  const sortedItems = [...items].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      case "name-asc":
        return (a.name || a.title || "").localeCompare(b.name || b.title || "");
      case "name-desc":
        return (b.name || b.title || "").localeCompare(a.name || a.title || "");
      default:
        return 0;
    }
  });

  return (
    <section className="bg-[#0A0F2C] text-white">
      {/* Hero Image with Overlay Text */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={categoryImage}
          alt={title}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4 drop-shadow-md">{title}</h1>
          <p className="text-lg md:text-xl max-w-2xl text-center drop-shadow-md">{description}</p>
        </div>
      </div>

      {/* Sort/Filter Controls */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h3 className="font-medium text-[#F5E6C8]">Found {items.length} items</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <label htmlFor="sort" className="text-sm text-white">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-yellow-500 bg-transparent text-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="default">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
          {sortedItems.map((item, idx) => (
            <motion.div
              key={item._id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => {
                setSelectedItem(item);
                setActiveImageIndex(0);
              }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-md p-4 flex flex-col cursor-pointer"
            >
              <Image
                src={
                  item.image && !item.image.startsWith("http")
                    ? `https://rentx-backend.onrender.com/${item.image}`
                    : item.image || "/ref1.png"
                }
                alt={item.name}
                width={400}
                height={200}
                className="rounded-lg object-cover h-52 w-full"
              />
              <h5 className="font-bold text-xl mt-4 text-[#F5E6C8]">{item.name || item.title}</h5>
              <p className="text-sm text-gray-300 mb-2">{item.location}</p>
              <div className="flex items-baseline gap-1 text-lg text-yellow-300">
                ₹{item.price}
                <span className="text-sm text-gray-400">/ day</span>
              </div>
              <Link
                href={`/booking?rentalId=${item._id}`}
                onClick={(e) => e.stopPropagation()}
                className="mt-4 block text-center bg-yellow-400 hover:bg-yellow-300 text-black py-2 rounded-lg font-medium"
              >
                Rent Now
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Modal on Click */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white w-full md:w-[60%] max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6 relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
              >
                ✕
              </button>

              {/* Modal Layout with Slider */}
              <div className="grid grid-cols-5 gap-4 mb-6">
                <div className="col-span-2 flex flex-col gap-4 items-center">
                  <Image
                    src={getImageList(selectedItem)[activeImageIndex]}
                    alt="Main"
                    width={600}
                    height={400}
                    className="w-full h-72 object-cover rounded-lg"
                  />
                  <div className="flex gap-2 justify-center">
                    {getImageList(selectedItem).map((img, idx) => (
                      <Image
                        key={idx}
                        src={img}
                        alt={`thumb-${idx}`}
                        width={60}
                        height={60}
                        className={`rounded-full border-2 object-cover cursor-pointer ${
                          idx === activeImageIndex ? "border-yellow-500" : "border-gray-300"
                        }`}
                        onClick={() => setActiveImageIndex(idx)}
                      />
                    ))}
                  </div>
                </div>

                <div className="col-span-3 space-y-3">
                  <h2 className="text-2xl font-bold text-emerald-800">{selectedItem.name}</h2>
                  <p className="text-gray-600">📍 {selectedItem.location}</p>
                  <p className="text-gray-500">{selectedItem.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><strong>Authenticity:</strong> {selectedItem.authenticity || "Verified"}</p>
                    <p><strong>Safety:</strong> {selectedItem.safety || "5/5"}</p>
                    <p><strong>Min Days:</strong> {selectedItem.minDays || 1}</p>
                    <p><strong>Rating:</strong> {selectedItem.rating || 4.7} ({selectedItem.reviews || 28} reviews)</p>
                  </div>
                  <p className="text-lg font-bold text-emerald-800">₹{selectedItem.price} / day</p>
                  <Link href={`/booking?rentalId=${selectedItem._id}`} className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2 rounded-lg font-semibold text-lg">Pay Now</Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Items State */}
        {sortedItems.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 inline-block mx-auto text-white">
              <h3 className="text-xl font-medium mb-2">No items found</h3>
              <p className="mb-4 text-sm text-gray-300">We could not find any {title.toLowerCase()} items available for rent.</p>
              <Link
                href="/add-product"
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded font-medium"
              >
                Add a Product
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
