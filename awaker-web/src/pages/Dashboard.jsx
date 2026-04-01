import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

const mockChartData = Array.from({ length: 40 }).map((_, i) => ({
  time: i,
  price: 68000 + Math.random() * 2000 - Math.random() * 1500 + (i * 50)
}));

function Dashboard() {
  return (
    <div className="w-full flex flex-col xl:flex-row gap-6">
      {/* Main Chart Area */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Header Setup */}
        <header className="flex justify-between items-center glass-card p-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white font-heading">BTC / USD</h1>
              <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded">+4.28%</span>
            </div>
            <p className="text-textMuted text-sm mt-1">Bitcoin • Volume: 42.1K BTC</p>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-bold text-white font-heading tracking-tight">$71,240.50</h2>
            <p className="text-textMuted text-sm flex items-center justify-end gap-1 mt-1">
              <TrendingUp size={16} className="text-secondary" /> 24H High: $71,500
            </p>
          </div>
        </header>

        {/* Chart Window */}
        <div className="glass-card p-6 h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d1ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00d1ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" hide />
              <YAxis domain={['dataMin - 1000', 'dataMax + 1000']} hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1d2026', borderColor: '#3c494e', borderRadius: '8px' }}
                itemStyle={{ color: '#00d1ff' }}
              />
              <Area type="monotone" dataKey="price" stroke="#00d1ff" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sidebar Scanner & Orderbook */}
      <div className="w-full xl:w-96 flex flex-col gap-6">
        
        {/* Market Scanner */}
        <div className="glass-card p-6 flex-1">
          <h3 className="font-heading text-lg font-bold text-white mb-4">Market Movement Scanner</h3>
          <div className="space-y-3">
            {[
              { pair: 'ETH/USD', price: '3,840.10', change: '+5.1%', up: true },
              { pair: 'SOL/USD', price: '142.50', change: '+8.4%', up: true },
              { pair: 'EUR/USD', price: '1.0842', change: '-0.2%', up: false },
              { pair: 'GBP/USD', price: '1.2640', change: '-0.5%', up: false },
              { pair: 'DOGE/USD', price: '0.1820', change: '+12.4%', up: true },
            ].map((asset, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-surface hover:bg-white/5 transition border border-white/5">
                <span className="font-bold text-sm text-white">{asset.pair}</span>
                <div className="text-right">
                  <span className="block text-sm font-medium">{asset.price}</span>
                  <span className={`text-xs flex items-center justify-end font-bold ${asset.up ? 'text-secondary' : 'text-error'}`}>
                    {asset.change} {asset.up ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Alerts Panel */}
        <div className="glass-card p-6 border-t-[3px] border-secondary">
          <h3 className="font-heading text-lg font-bold text-white mb-4">Active Triggers</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-surface/50 p-3 rounded-lg border border-white/5">
              <div>
                <span className="text-white font-bold block text-sm">BTC/USD</span>
                <span className="text-textMuted text-xs">Crosses Above $72k</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-secondary glow-secondary"></div>
            </div>
            <div className="flex justify-between items-center bg-surface/50 p-3 rounded-lg border border-white/5">
              <div>
                <span className="text-white font-bold block text-sm">ETH/USD</span>
                <span className="text-textMuted text-xs">Sudden +5% Volume</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-secondary glow-secondary"></div>
            </div>
            <a href="/alerts" className="text-primary font-bold text-sm block text-center mt-2 hover:underline">Manage All Alerts</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
