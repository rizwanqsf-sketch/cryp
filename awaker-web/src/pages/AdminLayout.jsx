import React, { useState, useEffect } from 'react';
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Activity, LayoutDashboard, Users, CreditCard, Key, Menu, X, LogOut, MessageSquare } from 'lucide-react';

export default function AdminLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Route security shield
  const token = localStorage.getItem('awaker_admin_token');
  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('awaker_admin_token');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Support Chats', path: '/admin/chats', icon: <MessageSquare size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Subscriptions', path: '/admin/subscriptions', icon: <CreditCard size={20} /> },
    { name: 'Access Tokens', path: '/admin/tokens', icon: <Key size={20} /> },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3 text-primary">
          <Activity size={32} />
          <span className="font-heading text-2xl font-bold text-white tracking-widest">ADMIN</span>
        </div>
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(false)}>
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 space-y-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                isActive ? 'bg-primary/20 text-primary' : 'text-textMuted hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon} {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 py-3 rounded-xl transition-colors font-semibold"
        >
          <LogOut size={18} /> Exit Admin
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-background font-sans text-text">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-white/10 flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-2 text-primary">
          <Activity size={24} />
          <span className="font-heading font-bold text-white">ADMIN</span>
        </div>
        <button className="text-white" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <div className="w-64 h-screen fixed left-0 top-0 border-r border-white/10 bg-surface/80 backdrop-blur-md p-6 flex-col hidden md:flex z-10">
        <SidebarContent />
      </div>

      {/* Sidebar - Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="w-64 h-full bg-surface p-6 flex flex-col shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 pt-20 md:pt-8 p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}
