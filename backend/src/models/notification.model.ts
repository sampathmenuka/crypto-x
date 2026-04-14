import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createNotification = async (userId: string, type: string, message: string) => {
  return await prisma.notification.create({
    data: { userId, type, message }
  });
};

export const getNotifications = async (userId: string) => {
  return await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
};

export const markAsRead = async (notificationId: string) => {
  return await prisma.notification.update({
    where: { id: notificationId },
    data: { read: true }
  });
};
