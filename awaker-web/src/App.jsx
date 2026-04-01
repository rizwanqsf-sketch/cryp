import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Activity, Bell, Brain, CreditCard, LayoutDashboard, User } from 'lucide-react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import AIAnalysis from './pages/AIAnalysis';
import Pricing from './pages/Pricing';
import Auth from './pages/Auth';

import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminUsers from './pages/Admin/Users';
import AdminSubscriptions from './pages/Admin/Subscriptions';
import AdminTokens from './pages/Admin/Tokens';
import AdminChats from './pages/Admin/Chats';
import AdminLogin from './pages/Admin/Login';
import Help from './pages/Help';
import { LifeBuoy } from 'lucide-react';

function Sidebar() {
  return (
    <div className="w-64 h-screen fixed left-0 top-0 border-r border-white/10 bg-surface/80 backdrop-blur-md p-6 flex flex-col hidden md:flex z-10">
      <div className="flex items-center gap-3 mb-10 text-primary">
        <Activity size={32} />
        <span className="font-heading text-2xl font-bold text-white tracking-widest">AWAKER</span>
      </div>
      <nav className="flex-1 space-y-4">
        <Link to="/dashboard" className="flex items-center gap-3 text-textMuted hover:text-white transition-colors p-3 rounded-xl hover:bg-white/5">
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link to="/alerts" className="flex items-center gap-3 text-textMuted hover:text-white transition-colors p-3 rounded-xl hover:bg-white/5">
          <Bell size={20} /> Smart Alerts
        </Link>
        <Link to="/analysis" className="flex items-center gap-3 text-textMuted hover:text-white transition-colors p-3 rounded-xl hover:bg-white/5">
          <Brain size={20} /> AI Pattern Analysis
        </Link>
        <Link to="/pricing" className="flex items-center gap-3 text-textMuted hover:text-white transition-colors p-3 rounded-xl hover:bg-white/5">
          <CreditCard size={20} /> Subscription
        </Link>
        <Link to="/help" className="flex items-center gap-3 text-textMuted hover:text-white transition-colors p-3 rounded-xl hover:bg-white/5">
          <LifeBuoy size={20} /> Help & Support
        </Link>
      </nav>
      <div className="mt-auto">
        <Link to="/auth" className="flex items-center gap-3 text-textMuted hover:text-white transition-colors p-3 rounded-xl hover:bg-white/5">
          <User size={20} /> Profile / Login
        </Link>
      </div>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/alerts" element={<Layout><Alerts /></Layout>} />
        <Route path="/analysis" element={<Layout><AIAnalysis /></Layout>} />
        <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
        <Route path="/auth" element={<Layout><Auth /></Layout>} />
        <Route path="/help" element={<Layout><Help /></Layout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Secure Admin Routes wrapped in AdminLayout */}
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
        <Route path="/admin/subscriptions" element={<AdminLayout><AdminSubscriptions /></AdminLayout>} />
        <Route path="/admin/tokens" element={<AdminLayout><AdminTokens /></AdminLayout>} />
        <Route path="/admin/chats" element={<AdminLayout><AdminChats /></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
