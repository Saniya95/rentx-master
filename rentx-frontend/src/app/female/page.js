// female/page.js
// Female Fashion page route for /female

import FemaleFashionList from "@/components/female/FemaleFashionList";
import ChatbotWidget from "@/components/homepage/ChatbotWidget";

export default function FemaleFashionPage() {
  return (
    <main className="bg-[#0A0F2C] text-white min-h-screen flex flex-col justify-between">
      <div className="flex flex-col flex-1">
        <FemaleFashionList />
      </div>
      <ChatbotWidget />
    </main>
  );
}
