// furniture/page.js
// Furniture page route for /furniture

import FurnitureList from "@/components/furniture/FurnitureList";
import ChatbotWidget from "@/components/homepage/ChatbotWidget";

export default function FurniturePage() {
  return (
    <main className="bg-[#0A0F2C] text-white min-h-screen flex flex-col justify-between">
      <div className="flex flex-col flex-1">
        <FurnitureList />
      </div>
      <ChatbotWidget />
    </main>
  );
}
