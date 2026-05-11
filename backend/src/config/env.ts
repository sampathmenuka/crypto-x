import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: parseInt(process.env['PORT'] ?? '3001', 10),
  nodeEnv: process.env['NODE_ENV'] ?? 'development',
  jwtSecret: process.env['JWT_SECRET'] ?? 'crypto_x_jwt_secret_dev_only',
  jwtExpiresIn: '7d',
  coingeckoBase: 'https://api.coingecko.com/api/v3',
  marketCacheTtl: 30_000, // 30 seconds
  wsTickInterval: 2_000,  // 2 seconds
} as const;
