
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000, visits: 2400 },
  { name: 'Tue', revenue: 3000, visits: 1398 },
  { name: 'Wed', revenue: 2000, visits: 9800 },
  { name: 'Thu', revenue: 2780, visits: 3908 },
  { name: 'Fri', revenue: 1890, visits: 4800 },
  { name: 'Sat', revenue: 2390, visits: 3800 },
  { name: 'Sun', revenue: 3490, visits: 4300 },
];

interface AnalyticsProps {
  t: (key: string) => string;
}

const Analytics: React.FC<AnalyticsProps> = ({ t }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">{t('analytics.title')}</h3>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">{t('analytics.live')}</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">{t('analytics.feed')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-72">
          <p className="text-sm font-medium text-gray-500 mb-4">{t('analytics.revenue_title')}</p>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
              />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="h-72">
          <p className="text-sm font-medium text-gray-500 mb-4">{t('analytics.engagement_title')}</p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Legend iconType="circle" wrapperStyle={{fontSize: 12}} />
              <Bar dataKey="visits" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" fill="#0f172a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('analytics.stats.subs'), value: '52', trend: '+4' },
          { label: t('analytics.stats.traffic'), value: '2.4M', trend: '+12%' },
          { label: t('analytics.stats.blockchain'), value: '$840M', trend: '+5.2%' },
          { label: t('analytics.stats.employees'), value: '12k', trend: '+200' },
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
            <div className="flex items-end space-x-2">
              <span className="text-xl font-bold text-slate-900">{stat.value}</span>
              <span className="text-[10px] text-green-600 font-bold mb-1">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
