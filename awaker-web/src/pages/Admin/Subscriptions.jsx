import React, { useEffect, useState } from 'react';
import { CreditCard, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminSubscriptions() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/subscriptions', {
      headers: { 'x-admin-key': 'mock_admin' }
    })
      .then(res => res.json())
      .then(data => {
        setSubs(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) return <div className="text-white">Loading subscriptions...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Subscriptions</h1>
      </div>

      <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-textMuted">
            <thead className="bg-white/5 text-white/80 font-semibold border-b border-white/10">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Plan Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Expires At</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">
                    {s.user ? `${s.user.name} (${s.user.email})` : 'Unknown User'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize text-primary">
                    <span className="flex items-center gap-2">
                       <CreditCard size={16} /> {s.plan} Plan
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {s.status === 'active' ? (
                      <span className="flex items-center gap-1 text-green-400">
                        <CheckCircle2 size={16} /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-400">
                        <XCircle size={16} /> {s.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(s.expiresAt).toLocaleString()}
                  </td>
                </tr>
              ))}
              {subs.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-textMuted">No subscriptions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
