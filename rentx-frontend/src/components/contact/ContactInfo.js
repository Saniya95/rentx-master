'use client';
import { motion } from 'framer-motion';

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-white shadow-xl"
    >
      <h2 className="text-3xl font-bold mb-6 font-playfair text-[#F5E6C8]">
        Get in Touch
      </h2>

      <div className="mb-6 space-y-3 text-sm text-gray-300">
        <p className="flex items-start gap-2">
          <i className="fas fa-map-marker-alt text-yellow-400 mt-1" />
          123 Rental Street, Bangalore, Karnataka, India
        </p>
        <p className="flex items-start gap-2">
          <i className="fas fa-phone-alt text-yellow-400 mt-1" />
          <a href="tel:+919876543210" className="hover:text-yellow-300">
            +91 98765 43210
          </a>
        </p>
        <p className="flex items-start gap-2">
          <i className="fas fa-envelope text-yellow-400 mt-1" />
          <a href="mailto:support@rentx.in" className="hover:text-yellow-300">
            support@rentx.in
          </a>
        </p>
        <p className="flex items-start gap-2">
          <i className="fas fa-clock text-yellow-400 mt-1" />
          Mon–Fri: 9 AM – 6 PM, Sat: 10 AM – 4 PM
        </p>
      </div>

      <div className="mb-6">
        <h5 className="font-bold mb-2 text-[#F5E6C8]">Follow Us</h5>
        <div className="flex gap-4 text-xl">
          <a href="#" className="text-yellow-400 hover:text-yellow-300">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="text-yellow-400 hover:text-yellow-300">
            <i className="fab fa-twitter" />
          </a>
          <a href="#" className="text-yellow-400 hover:text-yellow-300">
            <i className="fab fa-instagram" />
          </a>
          <a href="#" className="text-yellow-400 hover:text-yellow-300">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
      </div>

      <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-xl border border-white/10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9773443780577!2d77.59456331482177!3d12.97159899085939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b7b3e1%3A0x5e6e8e8e8e8e8e8e!2sBangalore%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          className="w-full h-56 border-0 rounded-xl"
        ></iframe>
      </div>
    </motion.div>
  );
}
