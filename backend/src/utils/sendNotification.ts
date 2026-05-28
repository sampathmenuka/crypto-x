import { createNotification } from '../models/notification.model.js';
import { getUserSocket } from '../socket/socket.js';
import { WebSocket } from 'ws';

export async function sendNotification(userId: string, type: string, message: string) {
  // 1. Save to DB
  const notification = await createNotification(userId, type, message);

  // 2. Send via WS if connected
  const ws = getUserSocket(userId);
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({
      type: 'notification',
      payload: notification
    }));
  }

  return notification;
}
