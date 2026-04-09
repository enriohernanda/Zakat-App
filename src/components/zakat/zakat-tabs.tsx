'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ZakatMaal from './zakat-maal';
import ZakatProfesi from './zakat-profesi';
import { Briefcase, Coins } from 'lucide-react';

export default function ZakatTabs() {
  return (
    <Tabs defaultValue="profesi" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 p-1.5 rounded-xl">
        <TabsTrigger 
          value="profesi" 
          className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm py-2.5 font-medium transition-all"
        >
          <Briefcase className="w-4 h-4 mr-2" />
          Zakat Profesi
        </TabsTrigger>
        <TabsTrigger 
          value="maal" 
          className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm py-2.5 font-medium transition-all"
        >
          <Coins className="w-4 h-4 mr-2" />
          Zakat Maal
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profesi" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
        <ZakatProfesi />
      </TabsContent>

      <TabsContent value="maal" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
        <ZakatMaal />
      </TabsContent>
    </Tabs>
  );
}
