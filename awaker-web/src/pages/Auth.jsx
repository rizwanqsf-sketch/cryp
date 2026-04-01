import React from 'react';
import { Activity, Mail, Lock, Wallet } from 'lucide-react';

function Auth() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center">
      <div className="w-full max-w-5xl flex rounded-2xl overflow-hidden glass-panel border border-white/10 bg-background/80 relative">
        
        {/* Abstract Background Element inside the card */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] rounded-full mix-blend-screen opacity-50 translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Info Side */}
        <div className="hidden md:flex flex-col flex-1 p-12 relative z-10 border-r border-white/10 bg-surface/50">
          <div className="flex items-center gap-2 mb-16">
            <Activity className="text-primary w-8 h-8" />
            <span className="font-heading text-2xl font-bold tracking-widest text-white">AWAKER</span>
          </div>
          <h2 className="text-4xl font-heading font-bold leading-tight mb-6">The Kinetic<br/>Observatory for<br/>Traders.</h2>
          <p className="text-textMuted text-lg leading-relaxed">Join thousands of professional traders using DeepSeek AI insights to navigate the volatile cryptocurrency and forex markets.</p>
        </div>

        {/* Form Side */}
        <div className="flex-1 p-8 md:p-12 relative z-10 bg-surface/20 backdrop-blur-3xl">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-textMuted text-sm mb-8">Access your customized trading environment.</p>

          <button className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl font-bold text-white transition mb-4">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
            Continue with Google
          </button>

          <button className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl font-bold text-white transition mb-8">
            <Wallet className="w-5 h-5 text-secondary" />
            Connect Web3 Wallet
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 border-b border-white/10"></div>
            <span className="text-xs uppercase text-textMuted font-bold tracking-widest">Or login with Email</span>
            <div className="flex-1 border-b border-white/10"></div>
          </div>

          <form className="space-y-4">
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted w-5 h-5" />
                <input type="email" placeholder="Email Address" className="w-full bg-surface/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-primary outline-none transition" />
              </div>
            </div>
            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted w-5 h-5" />
                <input type="password" placeholder="Password" className="w-full bg-surface/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-primary outline-none transition" />
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm mt-2 mb-6">
              <label className="flex items-center gap-2 text-textMuted cursor-pointer">
                <input type="checkbox" className="rounded bg-surface/50 border-white/10 text-primary focus:ring-primary focus:ring-offset-background" />
                Remember me
              </label>
              <a href="#" className="text-primary hover:text-primary/80 font-bold transition">Forgot Password?</a>
            </div>

            <button type="button" className="w-full bg-gradient-to-r from-primary to-blue-500 text-background font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] transition">
              Sign In
            </button>
          </form>

          <p className="text-center text-textMuted text-sm mt-8">
            Don't have an account? <a href="#" className="text-white font-bold tracking-wide hover:text-primary transition">Request Access</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
