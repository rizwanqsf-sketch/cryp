import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, KeyRound, AlertTriangle } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Always goes to the backend for checking.
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setStep(2); // Proceed to OTP even if fake, to prevent timing/enum attacks
      } else {
        setError('Failed to request OTP. Please try again.');
      }
    } catch {
      setError('Network error.');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('awaker_admin_token', data.token);
        navigate('/admin'); // Redirect to dashboard
      } else {
        setError(data.error || 'Invalid OTP code.');
      }
    } catch {
      setError('Network error.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <Shield size={48} className="text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold font-heading text-white tracking-wider">SECURE ACCESS</h1>
        <p className="text-textMuted mt-2">Awaker Administrative Panel</p>
      </div>

      <div className="bg-surface border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400 text-sm">
            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRequestOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Authorized Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="admin@awaker.com"
                  className="w-full bg-background border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-primary/50 focus:outline-none transition-colors"
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading || !email}
              className="w-full bg-primary hover:bg-primary/90 text-background font-bold py-3 rounded-xl transition-all disabled:opacity-50"
            >
              {loading ? 'Sending Request...' : 'Request Access Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-sm text-textMuted">OTP sent to <span className="text-white font-medium">{email}</span></p>
            </div>
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">6-Digit Verification Code</label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input 
                  type="text" 
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  placeholder="123456"
                  className="w-full bg-background border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-center tracking-widest text-lg font-mono focus:border-primary/50 focus:outline-none transition-colors"
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading || otp.length < 6}
              className="w-full bg-primary hover:bg-primary/90 text-background font-bold py-3 rounded-xl transition-all disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>
            <button
              type="button"
              onClick={() => { setStep(1); setOtp(''); }}
              className="w-full text-textMuted hover:text-white text-sm mt-4 transition-colors"
            >
              Cancel / Use different email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
