import DecorList from "@/components/decor/DecorList";
import ChatbotWidget from "@/components/homepage/ChatbotWidget";

export default function DecorPage() {
  return (
    <main className="bg-[#0A0F2C] min-h-screen text-white flex flex-col justify-between">
      <div className="flex flex-col flex-1">
        <DecorList />
      </div>
      <ChatbotWidget />
    </main>
  );
}
