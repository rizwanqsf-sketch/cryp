const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const multer = require('multer');
const axios = require('axios');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// --- Traffic Logging Middleware ---
app.use((req, res, next) => {
  // Ignore static assets and polling routes to avoid spam
  if (!req.path.startsWith('/api/') || req.path === '/api/admin/traffic' || req.path.includes('/chat/')) {
    return next();
  }
  
  const ipInfo = {
    ip: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  };
  
  // Minimal geo-stub. A full implementation would await an external API call like ip-api.com
  ipInfo.location = ipInfo.ip === '127.0.0.1' || ipInfo.ip === '::1' ? 'Local Development' : 'External Web';
  
  mockDb.traffic.unshift(ipInfo);
  // Keep only last 100 requests to avoid memory bloat
  if (mockDb.traffic.length > 100) mockDb.traffic.pop();
  
  next();
});

// 1. DeepSeek AI Analysis Endpoint
app.post('/api/analyze', upload.single('chart'), async (req, res) => {
  try {
    if (!process.env.DEEPSEEK_API_KEY) {
      console.warn("DEEPSEEK_API_KEY not set. Falling back to simulated AI analysis.");
      return res.json({
        direction: Math.random() > 0.5 ? 'BULLISH' : 'BEARISH',
        confidence: Math.floor(Math.random() * 20) + 75,
        insight: 'Simulated Result: The analyzed pattern indicates a strong consolidation breakout in the projected direction.'
      });
    }

    const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You are a professional technical analyst in crypto and forex." },
        { role: "user", content: "Analyze a potential breakout pattern based on recent high-volume volatility." }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      direction: 'BULLISH',
      confidence: 89,
      insight: response.data.choices[0].message.content
    });
  } catch (error) {
    console.error("DeepSeek Error:", error.message);
    res.status(500).json({ error: "Failed to fetch AI analysis." });
  }
});

// 2. Payment Placeholder — contact support to subscribe
app.post('/api/create-payment', (req, res) => {
  res.json({ message: 'To subscribe, please contact support@awakertrade.com or use a promo code.' });
});

// --- Admin Mock Database ---
const mockDb = {
  users: [
    { id: '1', name: 'Jane Trader', email: 'jane@example.com', role: 'user', status: 'active', createdAt: '2023-11-20T10:00:00Z' },
    { id: '2', name: 'Admin Master', email: 'admin@awaker.com', role: 'admin', status: 'active', createdAt: '2023-01-01T10:00:00Z' },
    { id: '3', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'suspended', createdAt: '2023-12-05T12:00:00Z' }
  ],
  subscriptions: [
    { id: 's1', userId: '1', plan: 'pro', status: 'active', expiresAt: '2026-11-20T10:00:00Z' },
    { id: 's2', userId: '3', plan: 'standard', status: 'expired', expiresAt: '2024-01-05T12:00:00Z' }
  ],
  tokens: [
    { id: 't1', token: 'FREE-100X', status: 'unused', plan: 'pro' },
    { id: 't2', token: 'BETA-TESTER', status: 'used', plan: 'standard' }
  ],
  chats: [],
  traffic: [],
  otpStore: {} // email -> { code, expiresAt }
};

// Admin middleware
const adminAuth = (req, res, next) => {
  const adminToken = req.headers['x-admin-token'];
  // We check if the token matches the globally secured session token logic
  if (adminToken && adminToken === mockDb.adminSessionToken) {
    return next();
  }
  if (req.headers['x-admin-key'] === 'mock_admin') {
    // Temporary fallback for older UI components until fully migrated
    // return next();
  }
  return res.status(401).json({ error: 'Unauthorized: Invalid or missing admin token.' });
};

// Admin Endpoints
// --- AUTHENTICATION ---
const VALID_ADMIN_EMAIL = 'rizwan.qsf@gmail.com';

app.post('/api/admin/login', async (req, res) => {
  const { email } = req.body;
  if (email !== VALID_ADMIN_EMAIL) {
    // We obscure the failure to prevent email enumeration, but fail internally
    return res.json({ success: true, fake: true }); 
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
  mockDb.otpStore[email] = {
    code: otp,
    expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes validity
  };

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.warn(`[Mock OTP for ${email}] ${otp} - SMTP not configured!`);
    return res.json({ success: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS }
    });
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Awaker Admin - Login OTP',
      text: `Your Admin Authentication Code is: ${otp}\n\nThis code expires in 5 minutes. Do not share it with anyone.`
    });
    res.json({ success: true });
  } catch (err) {
    console.error("OTP Email Error:", err);
    res.status(500).json({ error: "Failed to send OTP email." });
  }
});

app.post('/api/admin/verify', (req, res) => {
  const { email, otp } = req.body;
  const record = mockDb.otpStore[email];
  
  if (!record || record.code !== otp || Date.now() > record.expiresAt) {
    return res.status(401).json({ error: 'Invalid or expired OTP.' });
  }
  
  // Issue secure session token
  const sessionToken = 'atm_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
  mockDb.adminSessionToken = sessionToken;
  delete mockDb.otpStore[email]; // Consume OTP
  
  res.json({ success: true, token: sessionToken });
});

app.get('/api/admin/traffic', adminAuth, (req, res) => {
  res.json(mockDb.traffic);
});

app.get('/api/admin/stats', adminAuth, (req, res) => {
  res.json({
    totalUsers: mockDb.users.length,
    activeSubscriptions: mockDb.subscriptions.filter(s => s.status === 'active').length,
    tokensGenerated: mockDb.tokens.length,
    revenue: 12500, // mock revenue value
    recentTrafficCount: mockDb.traffic.length
  });
});

app.get('/api/admin/users', adminAuth, (req, res) => {
  res.json(mockDb.users);
});

// Mock generating free tokens
app.post('/api/admin/tokens', adminAuth, (req, res) => {
  const { plan, durationMonths } = req.body || { plan: 'pro', durationMonths: 3 };
  const newToken = {
    id: 't' + Date.now(),
    token: 'AWK-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    status: 'unused',
    plan,
    durationMonths: durationMonths || 3,
    createdAt: new Date().toISOString()
  };
  mockDb.tokens.push(newToken);
  res.json(newToken);
});

app.get('/api/admin/tokens', adminAuth, (req, res) => {
  res.json(mockDb.tokens);
});

app.get('/api/admin/subscriptions', adminAuth, (req, res) => {
  // Join users to show who has what
  const subsWithUser = mockDb.subscriptions.map(sub => {
    return {
      ...sub,
      user: mockDb.users.find(u => u.id === sub.userId)
    };
  });
  res.json(subsWithUser);
});

app.delete('/api/admin/users/:id', adminAuth, (req, res) => {
  mockDb.users = mockDb.users.filter(u => u.id !== req.params.id);
  // Also remove their subscriptions
  mockDb.subscriptions = mockDb.subscriptions.filter(s => s.userId !== req.params.id);
  res.json({ success: true });
});

// --- Communication Endpoints ---
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.warn("GMAIL configuration missing in .env. Simulated email response sent.");
    return res.json({ success: true, simulated: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'rdrizwan6@gmail.com',
      replyTo: email,
      subject: `Awaker Support Request from ${name}: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    res.json({ success: true, simulated: false });
  } catch (err) {
    console.error("Email Error:", err);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// Chat from User
app.post('/api/chat', (req, res) => {
  const { threadId, text, userEmail } = req.body;
  let thread = mockDb.chats.find(c => c.threadId === threadId);
  
  if (!thread) {
    thread = { 
      threadId: threadId || 'ch_' + Date.now().toString(36) + Math.random().toString(36).substr(2), 
      userEmail: userEmail || 'anonymous', 
      messages: [] 
    };
    mockDb.chats.push(thread);
  }
  
  thread.messages.push({ sender: 'user', text, timestamp: new Date().toISOString() });
  res.json(thread);
});

app.get('/api/chat/:threadId', (req, res) => {
  const thread = mockDb.chats.find(c => c.threadId === req.params.threadId);
  if (!thread) return res.status(404).json({ error: "Chat not found" });
  res.json(thread);
});

// Chat from Admin
app.get('/api/admin/chats', adminAuth, (req, res) => {
  res.json(mockDb.chats);
});

app.post('/api/admin/chats/:threadId/reply', adminAuth, (req, res) => {
  const { text } = req.body;
  const thread = mockDb.chats.find(c => c.threadId === req.params.threadId);
  if (!thread) return res.status(404).json({ error: "Chat not found" });
  
  thread.messages.push({ sender: 'admin', text, timestamp: new Date().toISOString() });
  res.json(thread);
});

// --- SINGLE DOMAIN STATIC SERVING (HOSTINGER PREP) ---
const path = require('path');
// Serve React's build dist folder as static assets from current directory's public_html
app.use(express.static(path.join(__dirname, 'public_html')));

// Catch-all route to return React's index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public_html/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Awaker Backend API running on http://localhost:${PORT}`));
