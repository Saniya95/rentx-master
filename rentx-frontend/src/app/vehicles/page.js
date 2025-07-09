// vehicles/page.js

import VehiclesList from "@/components/vehicles/VehiclesList";
import ChatbotWidget from "@/components/homepage/ChatbotWidget";

export default function VehiclesPage() {
  return (
    <main className="bg-[#0A0F2C] min-h-screen text-white flex flex-col justify-between">
      <div className="flex flex-col flex-1">
        <VehiclesList />
      </div>
      <ChatbotWidget />
    </main>
  );
}
