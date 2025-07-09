"use client";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay },
    },
  });

  return (
    <footer className="mt-20 px-6 py-12 bg-gradient-to-b from-[#0A0F2C] via-black to-[#0A0F2C] bg-opacity-80 backdrop-blur-md rounded-t-3xl border-t border-white/10 shadow-xl">

      {/* Glowing Top Border */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FFD700] via-[#F5E6C8] to-[#FFD700] mb-8 rounded-full" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-[#F5E6C8]">
        {/* Logo & Social */}
        <motion.div
          variants={fadeIn(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h4 className="font-bold text-2xl mb-3 font-serif flex items-center">
            <span className="text-[#FFD700] mr-2">⚡</span>RentX
          </h4>
          <p className="mb-4 text-sm text-[#D3D6DB]">
            India&apos;s most trusted rental platform connecting people who need items with those who have them to rent.
          </p>
          <div className="flex gap-3 text-xl">
            <a href="https://facebook.com" target="_blank" className="p-2 rounded-full hover:bg-[#F5E6C8] hover:text-[#0A0F2C] transition"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" className="p-2 rounded-full hover:bg-[#F5E6C8] hover:text-[#0A0F2C] transition"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" className="p-2 rounded-full hover:bg-[#F5E6C8] hover:text-[#0A0F2C] transition"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" className="p-2 rounded-full hover:bg-[#F5E6C8] hover:text-[#0A0F2C] transition"><FaLinkedinIn /></a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={fadeIn(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h5 className="font-bold mb-3 text-lg">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-[#FFD700] transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-[#FFD700] transition">About Us</Link></li>
            <li><Link href="/category" className="hover:text-[#FFD700] transition">Categories</Link></li>
            <li><Link href="/how-it-works" className="hover:text-[#FFD700] transition">How It Works</Link></li>
            {/* <li><Link href="/blog" className="hover:text-[#FFD700] transition">Blog</Link></li> */}
          </ul>
        </motion.div>

        {/* Categories */}
        <motion.div
          variants={fadeIn(0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h5 className="font-bold mb-3 text-lg">Categories</h5>
          <ul className="space-y-2 text-sm">
            <li><Link href="/electronics" className="hover:text-[#FFD700] transition">Electronics</Link></li>
            <li><Link href="/vehicles" className="hover:text-[#FFD700] transition">Vehicles</Link></li>
            <li><Link href="/furniture" className="hover:text-[#FFD700] transition">Furniture</Link></li>
            <li><Link href="/tools" className="hover:text-[#FFD700] transition">Tools</Link></li>
            {/* <li><Link href="/party-supplies" className="hover:text-[#FFD700] transition">Party Supplies</Link></li> */}
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          variants={fadeIn(0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h5 className="font-bold mb-3 text-lg">Newsletter</h5>
          <p className="mb-3 text-sm text-[#D3D6DB]">Subscribe to get updates on new items and special offers.</p>
          <form className="flex">
            <input
              type="email"
              className="rounded-l px-4 py-2 w-full shadow-inner outline-none text-black"
              placeholder="Your email address"
            />
            <button
              className="bg-[#FFD700] text-[#0A0F2C] px-4 py-2 rounded-r font-semibold hover:bg-white transition"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <hr className="border-[#F5E6C8]/30 my-8" />
      <motion.div
        variants={fadeIn(0.8)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-[#BFBFBF]"
      >
        <div className="mb-2 md:mb-0">© {new Date().getFullYear()} RentX. All rights reserved.</div>
        <div className="space-x-4">
          <Link href="/terms" className="hover:text-white transition">Terms of Use</Link>
          <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
        </div>
      </motion.div>
    </footer>
  );
}
