import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { getNotifications, markAsRead } from '../models/notification.model.js';

const router = Router();

// Get all notifications for the authenticated user
router.get('/', authenticate, async (req, res, next) => {
  try {
    const userId = (req as any).user.id;
    const notifications = await getNotifications(userId);
    res.json({ success: true, data: notifications });
  } catch (error) {
    next(error);
  }
});

// Mark a notification as read
router.patch('/:id/read', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await markAsRead(id);
    res.json({ success: true, data: notification });
  } catch (error) {
    next(error);
  }
});

export default router;
