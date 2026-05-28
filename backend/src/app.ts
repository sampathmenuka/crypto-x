import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';

import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { attachWebSocket } from './websocket/priceServer.js';

import authRoutes      from './routes/auth.js';
import marketRoutes    from './routes/markets.js';
import orderRoutes     from './routes/orders.js';
import portfolioRoutes from './routes/portfolio.js';
import notificationRoutes from './routes/notification.routes.js';
import { setupSocket } from './socket/socket.js';

// ── App ───────────────────────────────────────────────────────────────────────
const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (_req, res) => {
  res.json({ success: true, message: 'Welcome to the Crypto-X API' });
});

// API Routes
app.use('/api/auth',      authRoutes);
app.use('/api/markets',   marketRoutes);
app.use('/api/orders',    orderRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/notifications', notificationRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

// ── HTTP + WebSocket Server ───────────────────────────────────────────────────
const server = http.createServer(app);
if (process.env.NODE_ENV !== 'test') {
  const wss = attachWebSocket(server);
  let startupFailed = false;

  const handleStartupError = (error: NodeJS.ErrnoException) => {
    if (startupFailed) return;
    startupFailed = true;

    if (error.code === 'EADDRINUSE') {
      console.error(`\nPort ${env.port} is already in use.`);
      console.error('Stop the existing backend process or set a different PORT in backend/.env.\n');
    } else {
      console.error('\nFailed to start Crypto-X API:', error.message, '\n');
    }

    wss.close();
    server.close();
    process.exitCode = 1;
  };

  server.once('error', handleStartupError);
  wss.once('error', handleStartupError);

  server.listen(env.port, () => {
    console.log(`\n🚀 Crypto-X API running on http://localhost:${env.port}`);
    console.log(`📡 WebSocket available at ws://localhost:${env.port}/ws`);
    console.log(`🌍 Environment: ${env.nodeEnv}\n`);
  });
}

export default app;
