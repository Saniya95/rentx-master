// fashion/page.js
// Fashion page route for /fashion

import FashionList from "@/components/fashion/FashionList";
import ChatbotWidget from "@/components/homepage/ChatbotWidget";

export default function FashionPage() {
  return (
    <main className="bg-[#0A0F2C] text-white min-h-screen flex flex-col justify-between">
      <div className="flex flex-col flex-1">
        <FashionList />
      </div>
      <ChatbotWidget />
    </main>
  );
}
