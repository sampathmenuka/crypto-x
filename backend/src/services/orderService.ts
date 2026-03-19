import { randomUUID } from 'crypto';
import type { Order, OrderSide, OrderType, OrderStatus } from '../types/index.js';
import { getMarketBySymbol } from './marketService.js';
import * as portfolioService from './portfolioService.js';

// ── In-memory store ───────────────────────────────────────────────────────────
const orders = new Map<string, Order>();

// ── Helpers ───────────────────────────────────────────────────────────────────
function now() { return new Date(); }

// ── Public API ────────────────────────────────────────────────────────────────

export function getOrdersByUser(userId: string): Order[] {
  return Array.from(orders.values())
    .filter(o => o.userId === userId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getOrderById(id: string): Order | undefined {
  return orders.get(id);
}

export async function placeOrder(
  userId: string,
  symbol: string,
  side: OrderSide,
  type: OrderType,
  quantity: number,
  price?: number
): Promise<Order> {
  const market = getMarketBySymbol(symbol);
  if (!market) throw new Error(`Unknown symbol: ${symbol}`);
  if (quantity <= 0) throw new Error('Quantity must be positive');

  const balance = portfolioService.getBalance(userId);
  const fillPrice = type === 'market' ? market.price : (price ?? market.price);

  if (side === 'buy') {
    const cost = fillPrice * quantity;
    if (balance.available < cost) {
      throw new Error(`Insufficient balance. Need $${cost.toFixed(2)}, have $${balance.available.toFixed(2)}`);
    }
  } else {
    // sell — check position
    const position = portfolioService.getPosition(userId, symbol);
    if (!position || position.amount < quantity) {
      throw new Error(`Insufficient ${symbol} to sell`);
    }
  }

  const order: Order = {
    id:         randomUUID(),
    userId,
    symbol:     symbol.toUpperCase(),
    side,
    type,
    price:      type === 'limit' ? (price ?? null) : null,
    quantity,
    status:     'pending',
    fillPrice:  null,
    createdAt:  now(),
    updatedAt:  now(),
  };

  orders.set(order.id, order);

  // Market orders fill immediately
  if (type === 'market') {
    fillOrder(order.id, market.price);
  }

  return orders.get(order.id)!;
}

export function fillOrder(orderId: string, fillPrice: number): Order {
  const order = orders.get(orderId);
  if (!order) throw new Error('Order not found');
  if (order.status !== 'pending') throw new Error('Order is not pending');

  order.status    = 'filled';
  order.fillPrice = fillPrice;
  order.updatedAt = now();
  orders.set(orderId, order);

  // Update portfolio
  portfolioService.applyFill(order.userId, order.symbol, order.side, order.quantity, fillPrice);

  return order;
}

export function cancelOrder(orderId: string, userId: string): Order {
  const order = orders.get(orderId);
  if (!order) throw new Error('Order not found');
  if (order.userId !== userId) throw new Error('Forbidden');
  if (order.status !== 'pending') throw new Error('Only pending orders can be cancelled');

  order.status    = 'cancelled';
  order.updatedAt = now();
  orders.set(orderId, order);

  // Release locked balance if buy limit
  if (order.side === 'buy' && order.type === 'limit' && order.price !== null) {
    portfolioService.releaseLockedFunds(userId, order.price * order.quantity);
  }

  return order;
}
