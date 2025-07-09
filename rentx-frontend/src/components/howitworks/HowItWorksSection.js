"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
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

export default function HowItWorksSection() {
  const steps = [
    {
      title: "Browse or Search",
      desc: "Explore categories or use search to find the item you want to rent. Filter by location, price, or type for best results.",
    },
    {
      title: "Book & Pay Securely",
      desc: "Select your rental dates, review details, and pay securely online. Your payment is held safely until the rental begins.",
    },
    {
      title: "Pickup or Delivery",
      desc: "Coordinate with the owner for pickup or choose delivery options. Inspect the item and enjoy your rental period.",
    },
    {
      title: "Return & Review",
      desc: "Return the item as agreed. Leave a review to help others and build trust in the community.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#0A0F2C] via-[#0B112D] to-[#0A0F2C] text-white relative overflow-hidden">
      {/* Soft glowing orb */}
      <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] bg-[#FFD700] opacity-10 blur-3xl rounded-full z-0" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold font-playfair text-[#F5E6C8] text-center mb-16"
        >
          How It Works
        </motion.h2>

        <ol className="space-y-8">
          {steps.map((step, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-start gap-6"
            >
              <div className="text-2xl font-bold text-[#FFD700] bg-white/10 w-12 h-12 flex items-center justify-center rounded-full border border-white/20">
                {i + 1}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#F5E6C8] mb-1">{step.title}</h3>
                <p className="text-gray-300 text-sm">{step.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
