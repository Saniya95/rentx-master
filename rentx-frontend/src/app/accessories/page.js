// accessories/page.js
// Accessories page route for /accessories

import AccessoriesList from "@/components/accessories/AccessoriesList";
import ChatbotWidget from "@/components/homepage/ChatbotWidget";

export default function AccessoriesPage() {
  return (
    <main className="bg-gradient-to-b from-[#0A0F2C] via-black to-[#0A0F2C] text-white min-h-screen flex flex-col justify-between">
      <div className="flex flex-col flex-1">
        <AccessoriesList />
      </div>
      <ChatbotWidget />
    </main>
  );
}
