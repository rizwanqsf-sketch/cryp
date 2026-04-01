import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, Zap, Brain, TrendingUp } from 'lucide-react';

function Landing() {
  return (
    <div className="min-h-screen bg-background text-textMain relative overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-10 max-w-7xl">
        <div className="flex items-center gap-2">
          <Activity className="text-primary w-8 h-8" />
          <span className="font-heading text-xl font-bold tracking-widest text-white">AWAKER</span>
        </div>
        <div className="flex gap-4">
          <Link to="/auth" className="px-6 py-2 rounded-full font-medium text-textMuted hover:text-white transition">Login</Link>
          <Link to="/pricing" className="px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 font-medium transition">Pricing</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="z-10 text-center max-w-4xl mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight leading-tight">
            The Ultimate Market <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Alert Engine.</span>
          </h1>
          <p className="text-lg md:text-xl text-textMuted mb-10 max-w-2xl mx-auto">
            Professional-grade Crypto & Forex price alerts powered by DeepSeek AI. Anticipate market movements, analyze patterns, and get notified instantly on any device.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/alerts" className="px-8 py-4 bg-gradient-to-r from-primary to-blue-600 rounded-full text-white font-bold text-lg glow-primary transition-transform hover:scale-105">
              Set Smart Alerts
            </Link>
            <Link to="/auth" className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-bold text-lg hover:bg-white/10 transition-colors">
              Book a Demo
            </Link>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="glass-panel p-8">
            <Zap className="text-primary w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Smart Alert System</h3>
            <p className="text-textMuted text-sm">Custom triggers for price, volume, and technical indicators via Telegram, Email, and Push notifications.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="glass-panel p-8 backdrop-blur-3xl border-primary/20 bg-primary/5">
            <Brain className="text-primary w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">DeepSeek Pattern AI</h3>
            <p className="text-textMuted text-sm">Institutional-grade pattern recognition. Upload a chart and let AI determine the bullish or bearish probability.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="glass-panel p-8">
            <TrendingUp className="text-primary w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Movement Scanner</h3>
            <p className="text-textMuted text-sm">Instantly detect whale movements, liquidity sweeps, and sudden market spikes in real-time.</p>
          </motion.div>
        </div>
        
        {/* Trust Bar */}
        <div className="mt-20 pt-10 border-t border-white/5">
          <p className="text-sm text-textMuted uppercase tracking-widest mb-6 font-bold">Trusted by Institutional Providers</p>
          <div className="flex flex-wrap justify-center gap-10 opacity-50 grayscale">
            <div className="font-heading text-xl font-bold">BINANCE</div>
            <div className="font-heading text-xl font-bold">COINBASE PRO</div>
            <div className="font-heading text-xl font-bold">KRAKEN</div>
            <div className="font-heading text-xl font-bold">OANDA</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Landing;
