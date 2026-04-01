import React, { useEffect, useState } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';

export default function AdminChats() {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [replyText, setReplyText] = useState('');

  const fetchChats = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/chats', {
        headers: { 'x-admin-key': 'mock_admin' }
      });
      const data = await res.json();
      setThreads(data);
      if (selectedThread) {
        // Update selected thread's messages if a new one came in
        const updated = data.find(t => t.threadId === selectedThread.threadId);
        if (updated) setSelectedThread(updated);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchChats();
    const interval = setInterval(fetchChats, 3000);
    return () => clearInterval(interval);
  }, [selectedThread]);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedThread) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/admin/chats/${selectedThread.threadId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'mock_admin'
        },
        body: JSON.stringify({ text: replyText })
      });
      if (res.ok) {
        setReplyText('');
        fetchChats();
      }
    } catch (err) {
      console.error("Failed to send reply:", err);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-surface border border-white/10 rounded-2xl overflow-hidden mt-6">
      <div className="flex flex-1 overflow-hidden">
        {/* Thread List Sidebar */}
        <div className="w-1/3 border-r border-white/10 bg-background/50 flex flex-col">
          <div className="p-4 border-b border-white/10 font-bold text-white flex items-center gap-2">
            <MessageSquare size={18} className="text-primary"/> Active Chats
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-2">
            {threads.length === 0 && (
              <p className="text-textMuted text-sm text-center mt-10">No chats available.</p>
            )}
            {threads.map(t => (
              <div 
                key={t.threadId}
                onClick={() => setSelectedThread(t)}
                className={`p-3 rounded-xl cursor-pointer transition-colors ${selectedThread?.threadId === t.threadId ? 'bg-primary/20 border border-primary/30' : 'hover:bg-white/5 border border-transparent'}`}
              >
                <div className="text-white font-medium text-sm flex justify-between items-center">
                  <span>{t.userEmail}</span>
                  <span className="text-xs text-textMuted bg-white/5 px-2 py-0.5 rounded">{t.messages.length}</span>
                </div>
                <div className="text-textMuted text-xs mt-1 truncate">
                  {t.messages[t.messages.length - 1]?.text || 'No messages'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-surface">
          {selectedThread ? (
            <>
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="text-white font-semibold flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-full">
                    <User size={16} className="text-primary" />
                  </div>
                  {selectedThread.userEmail} 
                </div>
                <span className="text-xs text-textMuted font-mono bg-background px-2 py-1 rounded">ID: {selectedThread.threadId}</span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
                {selectedThread.messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'admin' 
                        ? 'bg-primary text-background rounded-tr-none' 
                        : 'bg-white/10 text-white rounded-tl-none border border-white/5'
                    }`}>
                      {msg.text}
                      <div className={`text-[10px] mt-1 ${msg.sender === 'admin' ? 'text-background/70' : 'text-white/40'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleReply} className="p-4 border-t border-white/10 bg-background/50 flex gap-3">
                <input 
                  type="text" 
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Type a reply..."
                  className="flex-1 bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!replyText.trim()}
                  className="bg-primary hover:bg-primary/90 text-background px-5 rounded-xl font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Send size={18} /> Reply
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-textMuted h-full">
              <MessageSquare size={48} className="mb-4 text-white/10" />
              <p>Select a chat to view and reply</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
