import { WebSocketServer, WebSocket } from 'ws';
import type { IncomingMessage, Server } from 'http';
import { getMarkets, tickPrices } from '../services/marketService.js';
import { env } from '../config/env.js';

export function attachWebSocket(server: Server): WebSocketServer {
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws: WebSocket, _req: IncomingMessage) => {
    console.log('[WS] Client connected. Total:', wss.clients.size);

    // Send initial snapshot immediately
    void getMarkets().then(markets => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'price_update',
          data: markets.map(m => ({
            symbol:    m.symbol,
            price:     m.price,
            change24h: m.change24h,
          })),
        }));
      }
    });

    ws.on('close', () => {
      console.log('[WS] Client disconnected. Total:', wss.clients.size);
    });

    ws.on('error', (err) => {
      console.error('[WS] Error:', err.message);
    });
  });

  // Broadcast price ticks to all connected clients
  setInterval(() => {
    if (wss.clients.size === 0) return;

    tickPrices();
    void getMarkets().then(markets => {
      const payload = JSON.stringify({
        type: 'price_update',
        data: markets.map(m => ({
          symbol:    m.symbol,
          price:     m.price,
          change24h: m.change24h,
        })),
      });

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(payload);
        }
      });
    });
  }, env.wsTickInterval);

  return wss;
}
