import React, { useEffect, useState } from 'react';
import { Users, CreditCard, Key, DollarSign, Activity, MapPin } from 'lucide-react';

const StatCard = ({ title, value, icon, colorClass }) => (
  <div className="bg-surface border border-white/10 rounded-2xl p-6 flex items-center justify-between">
    <div>
      <h3 className="text-textMuted text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
    <div className={`p-4 rounded-xl ${colorClass}`}>
      {icon}
    </div>
  </div>
);

export default function AdminDashboard() {
  const [traffic, setTraffic] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('awaker_admin_token') || 'mock_admin';
        const headers = { 'x-admin-token': token, 'x-admin-key': token };

        const [statsRes, trafficRes] = await Promise.all([
          fetch('http://localhost:5000/api/admin/stats', { headers }),
          fetch('http://localhost:5000/api/admin/traffic', { headers })
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (trafficRes.ok) setTraffic(await trafficRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-20">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={stats?.totalUsers || 0} 
          icon={<Users size={24} className="text-blue-400" />}
          colorClass="bg-blue-400/10"
        />
        <StatCard 
          title="Active Subscriptions" 
          value={stats?.activeSubscriptions || 0} 
          icon={<CreditCard size={24} className="text-green-400" />}
          colorClass="bg-green-400/10"
        />
        <StatCard 
          title="Free Tokens" 
          value={stats?.tokensGenerated || 0} 
          icon={<Key size={24} className="text-yellow-400" />}
          colorClass="bg-yellow-400/10"
        />
        <StatCard 
          title="Total Revenue" 
          value={`$${stats?.revenue || 0}`} 
          icon={<DollarSign size={24} className="text-purple-400" />}
          colorClass="bg-purple-400/10"
        />
      </div>

      <div className="bg-surface border border-white/10 rounded-2xl p-6 mt-8">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="text-primary" size={24} />
          <h2 className="text-xl font-semibold text-white">Live Traffic Analytics</h2>
        </div>
        
        {traffic.length === 0 ? (
          <div className="text-center py-10 text-textMuted border border-white/5 rounded-xl border-dashed">
            No recent traffic data.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-textMuted text-sm">
                  <th className="pb-3 px-4 font-medium">Timestamp</th>
                  <th className="pb-3 px-4 font-medium">IP Address</th>
                  <th className="pb-3 px-4 font-medium">Location</th>
                  <th className="pb-3 px-4 font-medium">Path</th>
                  <th className="pb-3 px-4 font-medium">Method</th>
                </tr>
              </thead>
              <tbody>
                {traffic.slice(0, 15).map((log, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 text-white/70 text-sm">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="py-3 px-4 text-white font-mono text-sm">{log.ip}</td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-2 text-sm text-blue-400 bg-blue-400/10 px-2 py-1 rounded w-max">
                        <MapPin size={14} /> {log.location}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white/80 text-sm">{log.path}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded font-bold ${log.method === 'GET' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>
                        {log.method}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
