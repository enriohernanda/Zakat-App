'use client';

import AuthGuard from '@/components/AuthGuard';
import ZakatTabs from '@/components/zakat/zakat-tabs';

export default function CalculatorPage() {
  return (
    <AuthGuard>
      <div className="max-w-4xl mx-auto p-4 sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Kalkulator Zakat</h1>
          <p className="text-slate-500 mt-2 text-lg">
            Hitung zakat Anda dengan akurat menggunakan nisab terkini.
          </p>
        </div>
        <ZakatTabs />
      </div>
    </AuthGuard>
  );
}
