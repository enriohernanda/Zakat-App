import Link from 'next/link';
import { ArrowRight, Calculator, History, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 text-white pt-24 pb-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Perkuat Kekayaan Anda dengan <span className="text-emerald-300">Zakat yang Tepat Sasaran</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto mb-10">
            Hitung, lacak, dan kelola kewajiban zakat Anda dengan tepat menggunakan platform keuangan modern kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/calculator" 
              className="inline-flex items-center justify-center bg-white text-emerald-700 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95"
            >
              Mulai Menghitung
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20 -mt-16 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition border border-slate-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
              <Calculator className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Penghitungan Akurat</h3>
            <p className="text-slate-500">Hitung Zakat Maal dan Zakat Profesi Anda dengan parameter Nisab terkini secara presisi.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition border border-slate-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
              <History className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Riwayat Transaksi</h3>
            <p className="text-slate-500">Simpan catatan terperinci dari semua transaksi zakat Anda sebelumnya untuk memastikan pelacakan yang berkelanjutan.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition border border-slate-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Login Aman</h3>
            <p className="text-slate-500">Data Anda diamankan melalui otentikasi yang kuat, memastikan hanya Anda yang dapat mengakses catatan Anda.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
