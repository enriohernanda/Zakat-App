'use client';

import { useState } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Harap isi semua form');
    
    setIsLoading(true);
    try {
      await api.post('/register', { email, password });
      toast.success('Registrasi berhasil. Silahkan login.');
      router.push('/login');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Registrasi gagal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-md shadow-lg border-slate-100">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <UserPlus className="w-6 h-6 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">Daftar Akun</CardTitle>
          <CardDescription className="text-slate-500">
            Daftar untuk mulai menghitung dan melacak zakat
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={register} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="masukan email disini" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                className="focus-visible:ring-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="masukan password disini" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                className="focus-visible:ring-emerald-500"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Daftar'}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-500">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-semibold text-emerald-600 hover:text-emerald-500 hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
