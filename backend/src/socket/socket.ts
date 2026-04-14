import { WebSocketServer, WebSocket } from 'ws';
import type { Server } from 'http';

const userSockets = new Map<string, WebSocket>();

export function setupSocket(server: Server) {
  const wss = new WebSocketServer({ server, path: '/notifications' });

  wss.on('connection', (ws, req) => {
    // Expected URL format /notifications?userId=xyz
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const userId = url.searchParams.get('userId');

    if (userId) {
      userSockets.set(userId, ws);
      console.log(`[WS Notifications] User ${userId} connected`);
      
      ws.on('close', () => {
        userSockets.delete(userId);
        console.log(`[WS Notifications] User ${userId} disconnected`);
      });
    } else {
      ws.close();
    }
  });

  return wss;
}

export function getUserSocket(userId: string): WebSocket | undefined {
  return userSockets.get(userId);
}
