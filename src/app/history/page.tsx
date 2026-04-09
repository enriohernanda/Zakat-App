'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import AuthGuard from '@/components/AuthGuard';
import { Trash2, FileText, Banknote, CalendarDays } from 'lucide-react';

interface HistoryItem {
  id: number;
  type: string;
  result: number;
  createdAt: string;
}

export default function HistoryPage() {
  return (
    <AuthGuard>
      <HistoryContent />
    </AuthGuard>
  );
}

function HistoryContent() {
  const [data, setData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('/zakat');
      setData(res.data.history || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const total = data.reduce((sum, item) => sum + item.result, 0);

  const deleteItem = async (id: number) => {
    const ok = confirm('Hapus riwayat zakat ini?');
    if (!ok) return;

    try {
      await api.delete('/zakat', { data: { id } });
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-10 max-w-6xl mx-auto space-y-6">
        <div className="h-10 w-48 bg-slate-200 rounded animate-pulse"></div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
        <div className="h-[400px] w-full bg-slate-200 rounded-2xl animate-pulse mt-8"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Riwayat Zakat</h1>
        <p className="text-slate-500 mt-1">Tinjau perhitungan dan kontribusi zakat Anda sebelumnya.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Total Transaksi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{data.length}</div>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <Banknote className="w-4 h-4" /> Total Zakat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">Rp {total.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> Zakat Terakhir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 truncate">{data[0]?.type || '-'}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-100">
          <CardTitle className="text-lg">Riwayat Zakat</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold px-6 py-4">Jenis Zakat</TableHead>
                  <TableHead className="font-semibold px-6 py-4">Jumlah Zakat</TableHead>
                  <TableHead className="font-semibold px-6 py-4">Tanggal</TableHead>
                  <TableHead className="font-semibold px-6 py-4 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-500">
                        <FileText className="w-12 h-12 mb-3 text-slate-300" />
                        <p className="text-lg font-medium text-slate-700">Tidak ada riwayat</p>
                        <p className="text-sm">Anda belum menghitung zakat.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((item) => (
                    <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell className="px-6 py-4 font-medium text-slate-700 capitalize">{item.type.replace('-', ' ')}</TableCell>
                      <TableCell className="px-6 py-4 font-semibold text-emerald-600">{item.result.toLocaleString()}</TableCell>
                      <TableCell className="px-6 py-4 text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="sr-only">Hapus</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
