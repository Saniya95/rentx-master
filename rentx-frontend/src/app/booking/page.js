'use client';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BookingForm from "@/components/booking/BookingForm";
import ChatbotWidget from "@/components/homepage/ChatbotWidget";

// This component reads the search params safely within Suspense
function BookingContent() {
  const searchParams = useSearchParams();
  const rentalId = searchParams.get('rentalId');

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16">
      <BookingForm rentalId={rentalId} />
    </div>
  );
}

export default function BookingPage() {
  return (
    <main className="bg-[#F8F1E9] min-h-screen flex flex-col justify-between">
      <Suspense fallback={<div className="text-center py-20 text-lg">Loading booking form...</div>}>
        <BookingContent />
      </Suspense>
      <ChatbotWidget />
    </main>
  );
}
