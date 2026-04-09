'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Moon, Sun, Sunrise, Sunset } from 'lucide-react';

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

export default function PrayerPage() {
  const [data, setData] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Lokasi Anda');

  const getPrayer = async (lat: number, long: number) => {
    try {
      const res = await axios.get(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${long}&method=11`);
      setData(res.data.data.timings);
    } catch {
      console.error('Gagal mengambil jadwal sholat');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getPrayer(position.coords.latitude, position.coords.longitude);
        },
        () => {
          getPrayer(-6.9, 107.6);
          setCity('Jakarta (Default)');
        }
      );
    } else {
      getPrayer(-6.9, 107.6);
      setCity('Jakarta (Default)');
    }
  }, []);

  const prayers = [
    { name: 'Subuh', key: 'Fajr', icon: <Moon className="w-5 h-5 text-indigo-500" /> },
    { name: 'Dzuhur', key: 'Dhuhr', icon: <Sun className="w-5 h-5 text-amber-500" /> },
    { name: 'Ashar', key: 'Asr', icon: <Sun className="w-5 h-5 text-orange-500 opacity-80" /> },
    { name: 'Maghrib', key: 'Maghrib', icon: <Sunset className="w-5 h-5 text-rose-500" /> },
    { name: 'Isya', key: 'Isha', icon: <Moon className="w-5 h-5 text-slate-800" /> },
  ];

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 sm:p-10 space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-10 w-64 rounded-lg" />
          <Skeleton className="h-6 w-48 rounded-md" />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Jadwal Sholat</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-3 text-slate-500">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <span className="font-medium text-slate-700">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="font-medium text-slate-700">{city}</span>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {prayers.map((prayer) => (
          <Card key={prayer.key} className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-500 flex items-center justify-between">
                <span>{prayer.name}</span>
                {prayer.icon}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600 flex items-center gap-3">
                <Clock className="w-6 h-6 text-emerald-200" />
                {data?.[prayer.key] || '--:--'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button className="mt-10" variant="outline" onClick={() => window.location.reload()}>
        Refresh Jadwal Sholat
      </Button>
    </div>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}
