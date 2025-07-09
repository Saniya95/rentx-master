"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionDivider from "@/components/ui/SectionDivider";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function CallToAction() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0A0F2C] to-black text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* ✅ Glowing Divider */}
        <SectionDivider />

        {/* CTA Content */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-10 md:p-16 text-center shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#F5E6C8] mb-6">
            Ready to Start Renting?
          </h2>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            Join 10,000+ renters across India. Post your items or start exploring available rentals today.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/category"
              className="bg-[#F5E6C8] text-[#0A0F2C] px-6 py-3 rounded-full font-semibold hover:bg-white transition"
            >
              🔍 Browse Rentals
            </Link>
            <Link
              href="/add-product"
              className="border border-[#F5E6C8] text-[#F5E6C8] px-6 py-3 rounded-full hover:bg-[#F5E6C8] hover:text-[#0A0F2C] transition"
            >
              ➕ List Your Item
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
