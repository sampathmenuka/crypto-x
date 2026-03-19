import type { Response } from 'express';
import * as orderService from '../services/orderService.js';
import { sendSuccess, sendError } from '../utils/response.js';
import type { AuthRequest, OrderSide, OrderType } from '../types/index.js';

export async function placeOrder(req: AuthRequest, res: Response): Promise<void> {
  const { symbol, side, type, quantity, price } = req.body as {
    symbol?: string;
    side?: OrderSide;
    type?: OrderType;
    quantity?: number;
    price?: number;
  };

  if (!symbol || !side || !type || quantity == null) {
    sendError(res, 'symbol, side, type and quantity are required', 400);
    return;
  }
  if (!['buy', 'sell'].includes(side)) {
    sendError(res, 'side must be buy or sell', 400);
    return;
  }
  if (!['market', 'limit'].includes(type)) {
    sendError(res, 'type must be market or limit', 400);
    return;
  }
  if (type === 'limit' && price == null) {
    sendError(res, 'price is required for limit orders', 400);
    return;
  }

  try {
    const order = await orderService.placeOrder(
      req.userId!,
      symbol,
      side,
      type,
      Number(quantity),
      price != null ? Number(price) : undefined
    );
    sendSuccess(res, order, 201);
  } catch (err) {
    sendError(res, (err as Error).message, 400);
  }
}

export function listOrders(req: AuthRequest, res: Response): void {
  const orders = orderService.getOrdersByUser(req.userId!);
  sendSuccess(res, orders);
}

export function cancelOrder(req: AuthRequest, res: Response): void {
  const { id } = req.params as { id: string };
  try {
    const order = orderService.cancelOrder(id, req.userId!);
    sendSuccess(res, order);
  } catch (err) {
    sendError(res, (err as Error).message, 400);
  }
}
