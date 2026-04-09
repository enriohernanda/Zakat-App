'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Calculator, Save } from 'lucide-react';
import api from '@/lib/axios';

export default function ZakatMaal() {
  const [assets, setAssets] = useState<number | ''>('');
  const [savings, setSavings] = useState<number | ''>('');
  const [debt, setDebt] = useState<number | ''>('');
  const [result, setResult] = useState<number | null>(null);
  const [status, setStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const NISAB = 127500000;

  const calculate = () => {
    const valAssets = Number(assets) || 0;
    const valSavings = Number(savings) || 0;
    const valDebt = Number(debt) || 0;

    if (valAssets === 0 && valSavings === 0) return toast.info('Silahkan masukkan nilai aset atau tabungan Anda');

    const total = valAssets + valSavings - valDebt;

    if (total >= NISAB) {
      setResult(total * 0.025);
      setStatus('Wajib Membayar Zakat');
    } else {
      setResult(0);
      setStatus('Belum Wajib Membayar Zakat');
    }
  };

  const save = async () => {
    if (result === null) return toast.warning('Silahkan hitung zakat Anda terlebih dahulu');
    
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Sesi berakhir. Silahkan login kembali.');
      setTimeout(() => (window.location.href = '/login'), 1500);
      return;
    }

    setIsSaving(true);
    try {
      await api.post(
        '/zakat',
        {
          type: 'maal',
          assets: Number(assets) || 0,
          savings: Number(savings) || 0,
          debt: Number(debt) || 0,
          result: result,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success('Berhasil menyimpan catatan zakat');
      setAssets('');
      setSavings('');
      setDebt('');
      setResult(null);
      setStatus('');
    } catch (err: any) {
      toast.error('Gagal menyimpan catatan zakat: ' + (err.response?.data?.error || err.message));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="border-slate-100 shadow-lg p-2 sm:p-4">
      <CardHeader>
        <CardTitle className="text-2xl text-slate-900">Zakat Maal (Harta)</CardTitle>
        <CardDescription>Hitung zakat berdasarkan total aset, tabungan, dan hutang Anda selama setahun.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="assets">Nilai Total Aset (Emas, Perak, Properti) (Rp)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">Rp</span>
              <Input 
                id="assets"
                type="number" 
                placeholder="0" 
                value={assets}
                onChange={(e) => setAssets(e.target.value === '' ? '' : Number(e.target.value))} 
                className="pl-10 text-lg py-5 focus-visible:ring-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="savings">Uang Tunai & Tabungan (Rp)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">Rp</span>
              <Input 
                id="savings"
                type="number" 
                placeholder="0" 
                value={savings}
                onChange={(e) => setSavings(e.target.value === '' ? '' : Number(e.target.value))} 
                className="pl-10 text-lg py-5 focus-visible:ring-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="debt">Utang/Kewajiban yang Belum Dibayar (Rp)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">Rp</span>
              <Input 
                id="debt"
                type="number" 
                placeholder="0" 
                value={debt}
                onChange={(e) => setDebt(e.target.value === '' ? '' : Number(e.target.value))} 
                className="pl-10 text-lg py-5 focus-visible:ring-emerald-500"
              />
            </div>
            <div className="text-sm text-slate-500 mt-1 flex justify-between">
              <span>Batas Nisab (Tahunan)</span>
              <span className="font-semibold text-slate-700">Rp {NISAB.toLocaleString()}</span>
            </div>
          </div>

          <Button 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg rounded-xl mt-2" 
            onClick={calculate}
          >
            <Calculator className="w-5 h-5 mr-2" /> Hitung Zakat
          </Button>
        </div>

        {result !== null && (
          <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={`p-6 rounded-2xl border ${result > 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex flex-col gap-1 items-center text-center">
                <span className="text-slate-500 font-medium tracking-wider uppercase text-sm">Status</span>
                <span className={`font-semibold ${result > 0 ? 'text-emerald-700' : 'text-slate-700'}`}>{status}</span>
              </div>
              
              <div className="h-px w-full bg-slate-200/50 my-6"></div>
              
              <div className="flex flex-col gap-1 items-center text-center">
                <span className="text-slate-500 font-medium tracking-wider uppercase text-sm">Kewajiban Zakat</span>
                <span className={`text-4xl font-extrabold ${result > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                  Rp {result.toLocaleString()}
                </span>
                {result > 0 && <span className="text-sm text-emerald-600/70 mt-2">(2.5% dari total kekayaan bersih)</span>}
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full py-6 text-lg border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl" 
              onClick={save}
              disabled={isSaving || result === 0}
            >
              <Save className="w-5 h-5 mr-2" /> 
              {isSaving ? 'Menyimpan...' : 'Simpan ke Riwayat'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
