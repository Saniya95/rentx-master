"use client";

import Image from "next/image";
import { FaTimes } from "react-icons/fa";

export default function Modal({ item, onClose }) {
  if (!item) return null;

  const images = item.images || [item.image] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
        >
          <FaTimes size={20} />
        </button>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Images Section */}
          <div className="space-y-4">
            {images.length > 0 ? (
              images.slice(0, 3).map((imgUrl, i) => (
                <div key={i} className="relative w-full h-48 rounded-lg overflow-hidden border">
                  <Image
                    src={imgUrl}
                    alt={`Image ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-sm">No images available</div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{item.title}</h2>
            <p className="text-gray-700">{item.description}</p>

            {item.price && (
              <p className="text-lg font-bold text-green-600">₹{item.price}</p>
            )}

            {item.location && (
              <p className="text-sm text-gray-500">📍 {item.location}</p>
            )}

            {item.category && (
              <p className="text-sm text-blue-500 capitalize">
                Category: {item.category}
              </p>
            )}

            {/* Optional CTA buttons (if needed later) */}
            {/* <button className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
              Book Now
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
