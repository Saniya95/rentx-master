// ContactHero.js
// Hero section for the contact page

export default function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#0A0F2C] to-black py-16 text-white">
      {/* Glowing Orb Background */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#FFD700] opacity-10 blur-3xl rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-playfair text-[#F5E6C8]">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          We are here to help! Reach out with any questions, concerns, or feedback.
        </p>
      </div>
    </section>
  );
}
