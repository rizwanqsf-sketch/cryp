import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function Help() {
  const [emailData, setEmailData] = useState({ name: '', email: '', subject: '', message: '' });
  const [emailStatus, setEmailStatus] = useState('idle'); // idle | submitting | success | error

  const [chatThreadId, setChatThreadId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Poll for new messages if chat is active
  useEffect(() => {
    if (!chatThreadId) return;

    const fetchChat = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/chat/${chatThreadId}`);
        if(res.ok) {
          const data = await res.json();
          setChatMessages(data.messages);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchChat();
    const interval = setInterval(fetchChat, 3000);
    return () => clearInterval(interval);
  }, [chatThreadId]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailStatus('submitting');
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
      if (res.ok) {
        setEmailStatus('success');
        setEmailData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setEmailStatus('idle'), 5000);
      } else {
        setEmailStatus('error');
      }
    } catch {
      setEmailStatus('error');
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setChatLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          threadId: chatThreadId, 
          text: chatInput,
          userEmail: emailData.email || 'guest@awaker.com' // Using email form's email if provided
        })
      });
      const data = await res.json();
      setChatThreadId(data.threadId);
      setChatMessages(data.messages);
      setChatInput('');
    } catch (err) {
      console.error(err);
    }
    setChatLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-heading">How can we <span className="text-primary">help?</span></h1>
        <p className="text-textMuted max-w-2xl mx-auto">Get in touch with our support team via live chat for instant assistance, or drop us an email for detailed inquiries.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Email Contact Form */}
        <div className="bg-surface border border-white/10 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/20 rounded-xl">
              <Mail className="text-primary" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">Email Us</h2>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4 relative z-10">
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                required
                value={emailData.name}
                onChange={e => setEmailData({...emailData, name: e.target.value})}
                className="bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                value={emailData.email}
                onChange={e => setEmailData({...emailData, email: e.target.value})}
                className="bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <input 
              type="text" 
              placeholder="Subject" 
              required
              value={emailData.subject}
              onChange={e => setEmailData({...emailData, subject: e.target.value})}
              className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
            <textarea 
              placeholder="How can we help you?" 
              rows={5}
              required
              value={emailData.message}
              onChange={e => setEmailData({...emailData, message: e.target.value})}
              className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
            <button 
              type="submit" 
              disabled={emailStatus === 'submitting'}
              className="w-full bg-primary hover:bg-primary/90 text-background font-bold py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)] disabled:opacity-50"
            >
              {emailStatus === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>

            {emailStatus === 'success' && (
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 flex items-center gap-3">
                <CheckCircle2 size={20} /> Message sent successfully! We'll reply shortly.
              </div>
            )}
            {emailStatus === 'error' && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
                Failed to send message. Please try again or use the Live Chat.
              </div>
            )}
          </form>
        </div>

        {/* Live Chat Interface */}
        <div className="bg-surface border border-white/10 rounded-3xl overflow-hidden flex flex-col h-[600px] relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-xl relative">
                <MessageSquare className="text-blue-400" size={24} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Live Support</h2>
                <p className="text-xs text-textMuted">Avg reply time: ~1 min</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10 bg-background/30 flex flex-col">
            {/* Intro Message */}
            <div className="flex justify-start">
              <div className="max-w-[80%] p-4 rounded-2xl rounded-tl-none bg-white/10 border border-white/5 text-sm text-white">
                Hi there! 👋 I'm an Awaker Support Agent. How can I help you today?
              </div>
            </div>

            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-500 text-white rounded-tr-none' 
                    : 'bg-white/10 border border-white/5 text-white rounded-tl-none'
                }`}>
                  {msg.text}
                  <div className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-white/40'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-surface border-t border-white/10 relative z-10">
            <form onSubmit={handleChatSubmit} className="flex gap-3">
              <input 
                type="text" 
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Type your message..."
                disabled={chatLoading}
                className="flex-1 bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              <button 
                type="submit"
                disabled={!chatInput.trim() || chatLoading}
                className="bg-blue-500 hover:bg-blue-400 text-white px-5 rounded-xl font-bold flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
