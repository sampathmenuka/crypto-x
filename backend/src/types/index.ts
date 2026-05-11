// ── Shared domain types ───────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  createdAt: Date;
}

export type OrderSide = 'buy' | 'sell';
export type OrderType = 'market' | 'limit';
export type OrderStatus = 'pending' | 'filled' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  symbol: string;
  side: OrderSide;
  type: OrderType;
  price: number | null; // null for market orders
  quantity: number;
  status: OrderStatus;
  fillPrice: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Balance {
  userId: string;
  total: number;
  available: number;
  locked: number;
}

export interface Position {
  userId: string;
  symbol: string;
  amount: number;
  avgPrice: number;
  currentPrice: number;
  unrealizedPnl: number;
  unrealizedPnlPct: number;
}

export interface Market {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price: number;
  change24h: number;
  changeAmt24h: number;
  marketCap: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  rank: number;
}

export interface CandleData {
  time: number; // Unix ms
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// ── Express request augmentation ─────────────────────────────────────────────
import type { Request } from 'express';

export interface AuthRequest extends Request {
  userId?: string;
}
