import React, { useEffect, useState } from 'react';
import { Key, Plus, Copy, Clock } from 'lucide-react';

export default function AdminTokens() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const fetchTokens = () => {
    fetch('http://localhost:5000/api/admin/tokens', {
      headers: { 'x-admin-key': 'mock_admin' }
    })
      .then(res => res.json())
      .then(data => {
        setTokens(data);
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const generateToken = async (months) => {
    setGenerating(true);
    try {
      const res = await fetch('http://localhost:5000/api/admin/tokens', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-key': 'mock_admin' 
        },
        body: JSON.stringify({ plan: 'pro', durationMonths: months })
      });
      if(res.ok) {
        fetchTokens();
      }
    } catch(err) {
      console.error(err);
      alert('Failed to generate token');
    }
    setGenerating(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Coupon copied to clipboard!');
  };

  if (loading) return <div className="text-white">Loading tokens...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-white">Access Tokens</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => generateToken(3)}
            disabled={generating}
            className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-xl font-medium hover:bg-white/20 transition-all disabled:opacity-50 border border-white/10"
          >
            <Plus size={18} /> 3 Months
          </button>
          <button 
            onClick={() => generateToken(6)}
            disabled={generating}
            className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)] disabled:opacity-50"
          >
            <Plus size={18} /> 6 Months PRO
          </button>
        </div>
      </div>

      <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-textMuted">
            <thead className="bg-white/5 text-white/80 font-semibold border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Token Key</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((t) => (
                <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono bg-background p-2 rounded text-white border border-white/10 flex items-center gap-2 w-fit">
                      <Key size={14} className="text-primary"/> {t.token}
                    </span>
                  </td>
                  <td className="px-6 py-4 uppercase font-semibold text-primary/80">
                    {t.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center gap-2 text-white/80">
                      <Clock size={14} className="text-white/40" />
                      {t.durationMonths ? `${t.durationMonths} Months` : 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${t.status === 'unused' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {t.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => copyToClipboard(t.token)}
                      className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/5 rounded inline-flex"
                      title="Copy Key"
                    >
                      <Copy size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {tokens.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-textMuted">No tokens generated yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
