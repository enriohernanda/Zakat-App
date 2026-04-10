'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, HeartHandshake } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      router.push('/login');
    } else {
      router.push('/login');
    }
  };

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Kalkulator', href: '/calculator' },
    { name: 'Sholat', href: '/prayer' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Riwayat', href: '/history' },
  ];

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-emerald-500 transition-colors">
                <HeartHandshake className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-emerald-900">ZakatApp</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                    pathname === link.href ? 'text-emerald-600' : 'text-slate-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            {isMounted ? (
              isLoggedIn ? (
                <Button variant="outline" onClick={handleAuth}>Keluar</Button>
              ) : (
                <Button onClick={() => router.push('/login')}>Masuk</Button>
              )
            ) : (
              <div className="w-20 h-10" />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-emerald-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              {isMounted ? (
                isLoggedIn ? (
                  <Button variant="outline" className="w-full" onClick={() => { setIsMobileMenuOpen(false); handleAuth(); }}>Keluar</Button>
                ) : (
                  <Button className="w-full" onClick={() => { setIsMobileMenuOpen(false); router.push('/login'); }}>Masuk</Button>
                )
              ) : (
                <div className="w-full h-10" />
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
