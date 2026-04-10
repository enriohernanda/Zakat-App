'use client';

import { useState } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Harap isi semua form');
    
    setIsLoading(true);
    try {
      const res = await api.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Login berhasil');
      window.location.href = '/dashboard';
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Login gagal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-md shadow-lg border-slate-100">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <LogIn className="w-6 h-6 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">Selamat Datang</CardTitle>
          <CardDescription className="text-slate-500">
            Masukan email dan password untuk login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={login} className="space-y-4">
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
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-500">
            Belum punya akun?{' '}
            <Link href="/register" className="font-semibold text-emerald-600 hover:text-emerald-500 hover:underline">
              Daftar
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
