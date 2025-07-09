// how-it-works/page.js

import HowItWorksSection from "@/components/howitworks/HowItWorksSection";
import ChatbotWidget from "@/components/homepage/ChatbotWidget";

export default function HowItWorksPage() {
  return (
    <main className="bg-[#0A0F2C] text-white">
      <HowItWorksSection />
      <ChatbotWidget />
    </main>
  );
}
  