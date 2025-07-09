import ElectronicsList from "@/components/electronics/ElectronicsList";
import ChatbotWidget from "@/components/homepage/ChatbotWidget";

export default function ElectronicsPage() {
  return (
    <main className="bg-[#0A0F2C] min-h-screen text-white flex flex-col justify-between">
      <div className="flex flex-col flex-1">
        <ElectronicsList />
      </div>
      <ChatbotWidget />
    </main>
  );
}
