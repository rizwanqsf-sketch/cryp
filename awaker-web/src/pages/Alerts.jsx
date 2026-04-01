import React, { useState } from 'react';
import { Bell, Plus, Settings2, Trash2 } from 'lucide-react';

function Alerts() {
  const [alerts, setAlerts] = useState([
    { id: 1, pair: 'BTC/USD', type: 'Price Alert', condition: 'Crosses Above', value: '$72,000', active: true },
    { id: 2, pair: 'ETH/USD', type: 'Sudden Pump', condition: '> 5% in 5m', value: '-', active: true },
    { id: 3, pair: 'EUR/USD', type: 'Sudden Dump', condition: '< 1% in 15m', value: '-', active: false },
  ]);

  return (
    <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold font-heading text-white mb-2">Smart Alerts</h1>
          <p className="text-textMuted max-w-xl">Configure high-frequency event triggers. Receive push, email, or webhook notifications instantly when the market moves.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/30 px-6 py-3 rounded-lg font-bold hover:bg-primary/20 transition">
          <Settings2 size={18} /> Notification Preferences
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Form */}
        <div className="glass-card p-6 h-fit bg-gradient-to-b from-surface/60 to-surface/40">
          <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2 mb-6">
            <Plus size={20} className="text-primary"/> Create New Alert
          </h3>
          <form className="space-y-5">
            <div>
              <label className="block text-xs uppercase font-bold text-textMuted mb-2">Asset Pair</label>
              <select className="w-full bg-surface/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none">
                <option>BTC/USD</option>
                <option>ETH/USD</option>
                <option>SOL/USD</option>
                <option>EUR/USD</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase font-bold text-textMuted mb-2">Alert Type</label>
              <select className="w-full bg-surface/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none">
                <option>Price Cross</option>
                <option>Sudden Pump</option>
                <option>Sudden Dump</option>
                <option>Volume Spike</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase font-bold text-textMuted mb-2">Trigger Value</label>
              <input type="text" placeholder="e.g. 70000" className="w-full bg-surface/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none" />
            </div>
            <button type="button" className="w-full mt-4 bg-primary text-background font-bold py-3 rounded-lg hover:shadow-[0_0_15px_rgba(0,209,255,0.4)] transition">
              Create Target
            </button>
          </form>
        </div>

        {/* Existing Alerts */}
        <div className="lg:col-span-2">
          <div className="glass-panel overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-surface/50 border-b border-white/10">
                <tr>
                  <th className="p-4 text-xs uppercase text-textMuted tracking-wider font-bold">Pair</th>
                  <th className="p-4 text-xs uppercase text-textMuted tracking-wider font-bold">Type</th>
                  <th className="p-4 text-xs uppercase text-textMuted tracking-wider font-bold">Condition</th>
                  <th className="p-4 text-xs uppercase text-textMuted tracking-wider font-bold">Status</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {alerts.map(alert => (
                  <tr key={alert.id} className="hover:bg-white/5 transition group">
                    <td className="p-4 font-bold text-white">{alert.pair}</td>
                    <td className="p-4">
                      <span className="text-sm bg-white/5 px-2 py-1 rounded text-textMuted">{alert.type}</span>
                    </td>
                    <td className="p-4 text-sm text-textMain">{alert.condition} <span className="text-primary font-bold">{alert.value}</span></td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${alert.active ? 'bg-secondary glow-secondary' : 'bg-surface border border-white/20'}`}></div>
                        <span className="text-xs font-bold text-white uppercase">{alert.active ? 'Active' : 'Paused'}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-textMuted hover:text-error transition p-2 opacity-0 group-hover:opacity-100">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Alerts;
