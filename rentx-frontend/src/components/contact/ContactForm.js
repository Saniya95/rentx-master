'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email.includes('@') || !form.subject || !form.message) {
      alert('Please fill in all fields correctly.');
      return;
    }
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl text-white"
    >
      <h2 className="text-2xl font-bold mb-6 font-playfair text-[#F5E6C8]">Send Us a Message</h2>

      {submitted && (
        <div className="mb-4 p-3 bg-green-600/10 border border-green-600 text-green-300 rounded">
          Thank you! Your message has been sent.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 text-sm text-[#F5E6C8]">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-white/10 text-white border border-white/10 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 text-sm text-[#F5E6C8]">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-white/10 text-white border border-white/10 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="subject" className="block mb-1 text-sm text-[#F5E6C8]">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full bg-white/10 text-white border border-white/10 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter the subject"
            value={form.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-1 text-sm text-[#F5E6C8]">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full bg-white/10 text-white border border-white/10 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter your message"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded font-semibold tracking-wide transition"
        >
          Send Message
        </button>
      </form>
    </motion.div>
  );
}
