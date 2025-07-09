// app/contact/page.js

import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export default function ContactPage() {
  return (
    <main className="bg-gradient-to-b from-[#0A0F2C] via-black to-[#0A0F2C] text-white min-h-screen flex flex-col">
      <ContactHero />
      
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </main>
  );
}
