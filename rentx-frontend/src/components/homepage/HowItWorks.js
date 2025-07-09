"use client";
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

export default function HowItWorks() {
  const steps = [
    {
      icon: "🛒",
      title: "Browse",
      desc: "Explore a wide range of products curated by AI — fashion, electronics, vehicles and more.",
    },
    {
      icon: "📆",
      title: "Book",
      desc: "Pick your dates, review rental details, and confirm your order securely online.",
    },
    {
      icon: "🚚",
      title: "Enjoy",
      desc: "Get items delivered to your doorstep and return them effortlessly after use.",
    },
  ];

  return (
    <section className="py-20 bg-[#0A0F2C] text-white">
      <div className="max-w-7xl mx-auto px-4 w-full">
        {/* Glowing Divider */}
        <SectionDivider />

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#F5E6C8] mb-3">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg">
            Renting is easy, transparent and fast — just 3 steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              custom={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg text-center"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h4 className="text-2xl font-semibold text-[#F5E6C8] mb-2">
                {step.title}
              </h4>
              <p className="text-gray-300 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
