'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import MonthlyChart from '@/components/dashboard/MonthlyChart';
import StatsCard from '@/components/dashboard/StatsCard';
import AuthGuard from '@/components/AuthGuard';
import { Wallet, Activity, Calendar, TrendingUp } from 'lucide-react';

interface Stats {
  total: number;
  transactions: number;
  avg: number;
  thisMonth: number;
}

interface ChartData {
  month: string;
  total: number;
}

interface HistoryItem {
  id: number;
  type: string;
  result: number;
  createdAt: string;
}

export default function Dashboard() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}

function DashboardContent() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    transactions: 0,
    avg: 0,
    thisMonth: 0,
  });

  const [chart, setChart] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('/zakat');
      setStats(res.data.stats || { total: 0, transactions: 0, avg: 0, thisMonth: 0 });

      const history: HistoryItem[] = res.data.history || [];
      const months: Record<string, number> = {};

      history.forEach((item) => {
        const d = new Date(item.createdAt);
        const key = d.toLocaleString('default', { month: 'short' });

        if (!months[key]) {
          months[key] = 0;
        }

        months[key] += item.result;
      });

      const chartData: ChartData[] = Object.keys(months).map((m) => ({
        month: m,
        total: months[m],
      }));

      setChart(chartData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-10 max-w-7xl mx-auto space-y-6">
        <div className="h-10 w-48 bg-slate-200 rounded animate-pulse"></div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
        <div className="h-[300px] w-full bg-slate-200 rounded-2xl animate-pulse mt-10"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Ringkasan kontribusi zakat Anda.</p>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        <StatsCard title="Total Zakat" value={stats.total} icon={<Wallet />} />
        <StatsCard title="Transaksi" value={stats.transactions} icon={<Activity />} />
        <StatsCard title="Bulan Ini" value={stats.thisMonth} icon={<Calendar />} />
        <StatsCard title="Rata-rata" value={stats.avg} icon={<TrendingUp />} />
      </div>

      <MonthlyChart data={chart} />
    </div>
  );
}
