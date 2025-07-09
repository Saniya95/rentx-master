"use client";
import Link from "next/link";
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

const categories = [
  {
    href: "/accessories",
    title: "Accessories",
    desc: "Laptops, cameras, VR headsets and more",
    img: "https://media.istockphoto.com/id/2161307186/photo/equipment-of-modern-photographer-on-a-yellow-background-top-view-flat-lay.webp",
  },
  {
    href: "/decor",
    title: "Decor",
    desc: "Furniture, lighting and wall art",
    img: "https://images.unsplash.com/photo-1565038941323-e5ceac0fcde2?w=600",
  },
  {
    href: "/electronics",
    title: "Electronics",
    desc: "Laptops, cameras, audio gear and more",
    img: "https://images.unsplash.com/photo-1589451825788-d81b78a48a33?w=600",
  },
  {
    href: "/vehicles",
    title: "Vehicles",
    desc: "Cars, bikes, scooters and more",
    img: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
  },
  {
    href: "/furniture",
    title: "Furniture",
    desc: "Chairs, tables, sofas and more",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
  },
  {
    href: "/sports",
    title: "Tools & Equipment",
    desc: "Power tools, gym & garden gear",
    img: "https://images.unsplash.com/photo-1683115098516-9b8d5c643b5b?w=600",
  },
  {
    href: "/fashion",
    title: "Fashion",
    desc: "Apparel and accessories",
    img: "https://images.unsplash.com/photo-1589363358751-ab05797e5629?w=600",
  },
  {
    href: "/female",
    title: "Female",
    desc: "Women's clothing and items",
    img: "https://images.unsplash.com/photo-1632266093786-f0598ebf7878?w=600",
  },
  {
    href: "/kids",
    title: "Kids",
    desc: "Toys, clothes and trampolines",
    img: "https://images.unsplash.com/photo-1632163570616-8699e344f486?w=600",
  },
  {
    href: "/male",
    title: "Male",
    desc: "Men's fashion and accessories",
    img: "https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=600",
  },
];

export default function CategoryList() {
  return (
    <section className="min-h-screen py-20 relative bg-gradient-to-br from-[#0A0F2C] via-[#0A0F2C] to-black text-white overflow-hidden">
      {/* Soft gradient blend from hero to list */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0F2C] to-transparent z-0" />

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
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
            All Categories
          </h2>
          <p className="text-gray-400 text-lg">
            Browse through our curated list of rental categories.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              custom={i}
            >
              <Link href={item.href} className="no-underline">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:-translate-y-1 transition-all duration-300 shadow-lg flex flex-col h-full">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={400}
                    height={160}
                    className="rounded-lg mb-3 object-cover h-40 w-full"
                  />
                  <h5 className="text-xl font-semibold text-[#F5E6C8] mb-1">
                    {item.title}
                  </h5>
                  <p className="text-gray-300 text-sm mb-1">{item.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
