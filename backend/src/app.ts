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

// API Routes
app.use('/api/auth',      authRoutes);
app.use('/api/markets',   marketRoutes);
app.use('/api/orders',    orderRoutes);
app.use('/api/portfolio', portfolioRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

// ── HTTP + WebSocket Server ───────────────────────────────────────────────────
const server = http.createServer(app);
if (process.env.NODE_ENV !== 'test') {
  attachWebSocket(server);
  server.listen(env.port, () => {
    console.log(`\n🚀 Crypto-X API running on http://localhost:${env.port}`);
    console.log(`📡 WebSocket available at ws://localhost:${env.port}/ws`);
    console.log(`🌍 Environment: ${env.nodeEnv}\n`);
  });
}

export default app;
