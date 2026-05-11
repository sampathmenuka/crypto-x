import type { Request, Response } from 'express';
import { getMarkets, generateCandles } from '../services/marketService.js';
import { sendSuccess, sendError } from '../utils/response.js';

export async function listMarkets(_req: Request, res: Response): Promise<void> {
  try {
    const markets = await getMarkets();
    sendSuccess(res, markets);
  } catch (err) {
    sendError(res, (err as Error).message, 500);
  }
}

export function getCandles(req: Request, res: Response): void {
  const { symbol } = req.params as { symbol: string };
  const limit = Math.min(parseInt(req.query['limit'] as string ?? '100', 10), 300);

  if (!symbol) {
    sendError(res, 'symbol is required', 400);
    return;
  }

  const candles = generateCandles(symbol, limit);
  sendSuccess(res, candles);
}
