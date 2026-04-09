'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MapPin, Mail, LayoutDashboard, Calculator, History, LogIn, HeartHandshake } from 'lucide-react';

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-950 text-emerald-50 mt-auto border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-12 lg:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-2 w-fit group">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-emerald-500 transition-colors">
                <HeartHandshake className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">ZakatApp</span>
            </Link>
            <p className="text-emerald-200/80 text-sm md:text-base max-w-sm leading-relaxed">
              Platform manajemen zakat modern yang dirancang untuk memudahkan Anda 
              dalam menghitung, melacak, dan menunaikan kewajiban zakat secara presisi dan terpercaya.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="col-span-1 md:col-span-6 lg:col-span-3 space-y-5 lg:ml-auto">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Navigasi</h3>
            <ul className="space-y-3.5 block">
              <li>
                <Link href="/dashboard" className="text-emerald-200/80 hover:text-white transition-colors text-sm md:text-base flex items-center gap-2.5 group">
                  <LayoutDashboard className="w-4 h-4 text-emerald-500/80 group-hover:text-emerald-400 transition-colors" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-emerald-200/80 hover:text-white transition-colors text-sm md:text-base flex items-center gap-2.5 group">
                  <Calculator className="w-4 h-4 text-emerald-500/80 group-hover:text-emerald-400 transition-colors" />
                  Kalkulator Zakat
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-emerald-200/80 hover:text-white transition-colors text-sm md:text-base flex items-center gap-2.5 group">
                  <History className="w-4 h-4 text-emerald-500/80 group-hover:text-emerald-400 transition-colors" />
                  Riwayat
                </Link>
              </li>
              {isMounted && !isLoggedIn && (
                <li>
                  <Link href="/login" className="text-emerald-200/80 hover:text-white transition-colors text-sm md:text-base flex items-center gap-2.5 group">
                    <LogIn className="w-4 h-4 text-emerald-500/80 group-hover:text-emerald-400 transition-colors" />
                    Masuk Akun
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-1 md:col-span-6 lg:col-span-4 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-emerald-900/50 p-2 rounded-lg shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-sm font-medium">Email Bantuan</span>
                  <span className="text-emerald-200/80 text-sm">enriohernanda@gmail.com</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-emerald-900/50 p-2 rounded-lg shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-sm font-medium">Lokasi Kantor</span>
                  <span className="text-emerald-200/80 text-sm leading-relaxed mt-1">
                    DKI Jakarta
                  </span>
                </div>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-emerald-900/60 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-emerald-500/80 text-sm order-2 md:order-1 text-center md:text-left">
            © {currentYear} ZakatApp. Hak Cipta Dilindungi.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm text-emerald-200/60 order-1 md:order-2">
            <span className="hover:text-emerald-200 cursor-pointer transition-colors">Kebijakan Privasi</span>
            <span className="text-emerald-800 hidden sm:inline">•</span>
            <span className="hover:text-emerald-200 cursor-pointer transition-colors">Syarat & Ketentuan</span>
            <span className="text-emerald-800 hidden sm:inline">•</span>
            <span className="hover:text-emerald-200 cursor-pointer transition-colors">Bantuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
