import type { Response } from 'express';
import * as portfolioService from '../services/portfolioService.js';
import { sendSuccess } from '../utils/response.js';
import type { AuthRequest } from '../types/index.js';

export function getBalance(req: AuthRequest, res: Response): void {
  const balance = portfolioService.getBalance(req.userId!);
  sendSuccess(res, balance);
}

export function getPortfolio(req: AuthRequest, res: Response): void {
  const positions = portfolioService.getPositions(req.userId!);
  const balance   = portfolioService.getBalance(req.userId!);

  const totalPnl = positions.reduce((acc, p) => acc + p.unrealizedPnl, 0);
  const portfolioValue = positions.reduce(
    (acc, p) => acc + p.currentPrice * p.amount,
    0
  );

  sendSuccess(res, {
    balance,
    positions,
    summary: {
      portfolioValue: +portfolioValue.toFixed(2),
      totalUnrealizedPnl: +totalPnl.toFixed(2),
      totalValue: +(balance.available + portfolioValue).toFixed(2),
    },
  });
}
