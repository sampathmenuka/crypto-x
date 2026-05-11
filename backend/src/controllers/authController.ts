import type { Request, Response } from 'express';
import * as userService from '../services/userService.js';
import * as portfolioService from '../services/portfolioService.js';
import { signToken } from '../utils/jwt.js';
import { sendSuccess, sendError } from '../utils/response.js';
import type { AuthRequest } from '../types/index.js';

export async function register(req: Request, res: Response): Promise<void> {
  const { email, username, password } = req.body as {
    email?: string; username?: string; password?: string;
  };

  if (!email || !username || !password) {
    sendError(res, 'email, username and password are required', 400);
    return;
  }
  if (password.length < 6) {
    sendError(res, 'Password must be at least 6 characters', 400);
    return;
  }

  try {
    const user = await userService.createUser(email, username, password);
    portfolioService.initBalance(user.id);
    const token = signToken(user.id);
    sendSuccess(res, { user: userService.safeUser(user), token }, 201);
  } catch (err) {
    sendError(res, (err as Error).message, 400);
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    sendError(res, 'email and password are required', 400);
    return;
  }

  try {
    const user = await userService.verifyCredentials(email, password);
    portfolioService.initBalance(user.id); // idempotent
    const token = signToken(user.id);
    sendSuccess(res, { user: userService.safeUser(user), token });
  } catch (err) {
    sendError(res, (err as Error).message, 401);
  }
}

export function me(req: AuthRequest, res: Response): void {
  const user = userService.getUserById(req.userId!);
  if (!user) {
    sendError(res, 'User not found', 404);
    return;
  }
  sendSuccess(res, { user: userService.safeUser(user) });
}
