'use client';

import { useSearchParams } from 'next/navigation';
import BookingForm from '@/components/booking/BookingForm';
import ChatbotWidget from '@/components/homepage/ChatbotWidget';

export default function BookingSectionClient() {
  const searchParams = useSearchParams();
  const rentalId = searchParams.get('rentalId');

  return (
    <main className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] min-h-screen flex flex-col justify-between text-white font-sans">
      <div className="flex flex-col items-center justify-center flex-1 py-16 px-4">
        <div className="w-full max-w-4xl">
          <BookingForm rentalId={rentalId} />
        </div>
      </div>
      <ChatbotWidget />
    </main>
  );
}
