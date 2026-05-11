import type { Balance, Position } from '../types/index.js';
import { getMarketBySymbol } from './marketService.js';

// ── In-memory stores ──────────────────────────────────────────────────────────
const balances  = new Map<string, Balance>();
const positions = new Map<string, Map<string, Position>>(); // userId → symbol → Position

const STARTING_BALANCE = 10_000; // $10,000 demo USD

// ── Balance helpers ───────────────────────────────────────────────────────────

export function initBalance(userId: string): void {
  if (!balances.has(userId)) {
    balances.set(userId, {
      userId,
      total:     STARTING_BALANCE,
      available: STARTING_BALANCE,
      locked:    0,
    });
  }
}

export function getBalance(userId: string): Balance {
  if (!balances.has(userId)) initBalance(userId);
  return balances.get(userId)!;
}

export function releaseLockedFunds(userId: string, amount: number): void {
  const bal = getBalance(userId);
  const release = Math.min(amount, bal.locked);
  bal.locked    -= release;
  bal.available += release;
  balances.set(userId, bal);
}

// ── Position helpers ──────────────────────────────────────────────────────────

export function getPosition(userId: string, symbol: string): Position | undefined {
  return positions.get(userId)?.get(symbol.toUpperCase());
}

export function getPositions(userId: string): Position[] {
  const userPositions = positions.get(userId);
  if (!userPositions) return [];

  return Array.from(userPositions.values()).map(pos => {
    const market = getMarketBySymbol(pos.symbol);
    const currentPrice = market?.price ?? pos.avgPrice;
    const unrealizedPnl = (currentPrice - pos.avgPrice) * pos.amount;
    const unrealizedPnlPct = pos.avgPrice > 0
      ? ((currentPrice - pos.avgPrice) / pos.avgPrice) * 100
      : 0;
    return { ...pos, currentPrice, unrealizedPnl, unrealizedPnlPct };
  });
}

// ── Fill logic (called by orderService) ──────────────────────────────────────

export function applyFill(
  userId: string,
  symbol: string,
  side: 'buy' | 'sell',
  quantity: number,
  fillPrice: number
): void {
  const bal = getBalance(userId);
  const sym = symbol.toUpperCase();

  if (!positions.has(userId)) positions.set(userId, new Map());
  const userPositions = positions.get(userId)!;

  if (side === 'buy') {
    const cost = fillPrice * quantity;
    bal.available = Math.max(0, bal.available - cost);
    bal.total     = bal.available + bal.locked;

    const existing = userPositions.get(sym);
    if (existing) {
      const totalAmount = existing.amount + quantity;
      const avgPrice    = (existing.avgPrice * existing.amount + fillPrice * quantity) / totalAmount;
      userPositions.set(sym, { ...existing, amount: totalAmount, avgPrice, currentPrice: fillPrice, unrealizedPnl: 0, unrealizedPnlPct: 0 });
    } else {
      userPositions.set(sym, {
        userId,
        symbol:         sym,
        amount:         quantity,
        avgPrice:       fillPrice,
        currentPrice:   fillPrice,
        unrealizedPnl:  0,
        unrealizedPnlPct: 0,
      });
    }
  } else {
    // sell
    const proceeds = fillPrice * quantity;
    bal.available += proceeds;
    bal.total      = bal.available + bal.locked;

    const existing = userPositions.get(sym);
    if (existing) {
      const remaining = existing.amount - quantity;
      if (remaining <= 0.000001) {
        userPositions.delete(sym);
      } else {
        userPositions.set(sym, { ...existing, amount: remaining });
      }
    }
  }

  balances.set(userId, bal);
}
