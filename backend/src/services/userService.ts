import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import type { User } from '../types/index.js';

// ── In-memory store ───────────────────────────────────────────────────────────
const users = new Map<string, User>(); // keyed by id
const emailIndex = new Map<string, string>(); // email → id

const SALT_ROUNDS = 10;

// ── Public API ────────────────────────────────────────────────────────────────

export async function createUser(
  email: string,
  username: string,
  password: string
): Promise<User> {
  const normalised = email.toLowerCase().trim();
  if (emailIndex.has(normalised)) {
    throw new Error('Email already registered');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user: User = {
    id: randomUUID(),
    email: normalised,
    username: username.trim(),
    passwordHash,
    createdAt: new Date(),
  };

  users.set(user.id, user);
  emailIndex.set(normalised, user.id);
  return user;
}

export async function verifyCredentials(
  email: string,
  password: string
): Promise<User> {
  const normalised = email.toLowerCase().trim();
  const id = emailIndex.get(normalised);
  if (!id) throw new Error('Invalid email or password');

  const user = users.get(id)!;
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw new Error('Invalid email or password');
  return user;
}

export function getUserById(id: string): User | undefined {
  return users.get(id);
}

export function safeUser(user: User) {
  const { passwordHash: _, ...rest } = user;
  return rest;
}
