import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon?: ReactNode;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-emerald-100 transition-all group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-500 text-sm font-medium mb-2">{title}</p>
          <h2 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            {typeof value === 'number' && !title.toLowerCase().includes('transaction') 
              ? `Rp ${value.toLocaleString()}` 
              : value.toLocaleString()}
          </h2>
        </div>
        {icon && (
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
