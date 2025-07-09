'use client';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import PaymentSection from '@/components/payment/PaymentSection';

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="text-center py-16">Loading payment page...</div>}>
      <PaymentSection />
    </Suspense>
  );
}
