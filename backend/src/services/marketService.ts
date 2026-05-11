import axios from 'axios';
import { env } from '../config/env.js';
import type { Market, CandleData } from '../types/index.js';

// ── Cache ─────────────────────────────────────────────────────────────────────
let cachedMarkets: Market[] = [];
let lastFetchTime = 0;

// ── CoinGecko fetch ───────────────────────────────────────────────────────────
async function fetchFromCoinGecko(): Promise<Market[]> {
  const { data } = await axios.get(`${env.coingeckoBase}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 50,
      page: 1,
      sparkline: false,
      price_change_percentage: '24h',
    },
    timeout: 10_000,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((coin: any) => ({
    id: coin.id as string,
    symbol: (coin.symbol as string).toUpperCase(),
    name: coin.name as string,
    image: coin.image as string,
    price: coin.current_price as number,
    change24h: coin.price_change_percentage_24h as number ?? 0,
    changeAmt24h: coin.price_change_24h as number ?? 0,
    marketCap: coin.market_cap as number ?? 0,
    volume24h: coin.total_volume as number ?? 0,
    high24h: coin.high_24h as number ?? 0,
    low24h: coin.low_24h as number ?? 0,
    rank: coin.market_cap_rank as number ?? 0,
  }));
}

// ── Fallback seed data (used when CoinGecko is unreachable) ───────────────────
function seedMarkets(): Market[] {
  const seeds = [
    { id: 'bitcoin',  symbol: 'BTC',  name: 'Bitcoin',        price: 67_420.0,  change24h:  2.34 },
    { id: 'ethereum', symbol: 'ETH',  name: 'Ethereum',       price:  3_510.5,  change24h:  1.21 },
    { id: 'solana',   symbol: 'SOL',  name: 'Solana',         price:   178.3,   change24h:  4.87 },
    { id: 'binancecoin', symbol: 'BNB', name: 'BNB',          price:   612.0,   change24h:  0.55 },
    { id: 'xrp',      symbol: 'XRP',  name: 'XRP',            price:     0.62,  change24h: -0.78 },
    { id: 'cardano',  symbol: 'ADA',  name: 'Cardano',        price:     0.48,  change24h: -1.20 },
    { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche',   price:    38.5,   change24h:  3.10 },
    { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin',       price:     0.17,  change24h:  5.44 },
    { id: 'polkadot', symbol: 'DOT',  name: 'Polkadot',       price:     7.80,  change24h: -0.30 },
    { id: 'chainlink', symbol: 'LINK', name: 'Chainlink',     price:    14.60,  change24h:  2.01 },
  ];

  return seeds.map((s, i) => ({
    ...s,
    image: `https://assets.coingecko.com/coins/images/${i + 1}/large/coin.png`,
    changeAmt24h: (s.price * s.change24h) / 100,
    marketCap: s.price * 1_000_000 * (10 - i),
    volume24h:  s.price * 500_000  * (10 - i),
    high24h:    s.price * 1.04,
    low24h:     s.price * 0.96,
    rank:       i + 1,
  }));
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function getMarkets(): Promise<Market[]> {
  const now = Date.now();
  if (cachedMarkets.length > 0 && now - lastFetchTime < env.marketCacheTtl) {
    return cachedMarkets;
  }

  try {
    cachedMarkets = await fetchFromCoinGecko();
    lastFetchTime = now;
  } catch (err) {
    console.warn('[MarketService] CoinGecko fetch failed, using seed data:', (err as Error).message);
    if (cachedMarkets.length === 0) {
      cachedMarkets = seedMarkets();
      lastFetchTime = now;
    }
  }

  return cachedMarkets;
}

export function getMarketBySymbol(symbol: string): Market | undefined {
  return cachedMarkets.find(m => m.symbol === symbol.toUpperCase());
}

/** Generate synthetic OHLC candles from the current price. */
export function generateCandles(symbol: string, limit = 100): CandleData[] {
  const market = getMarketBySymbol(symbol);
  const basePrice = market?.price ?? 1000;
  const now = Date.now();
  const interval = 60 * 60 * 1000; // 1 hour

  const candles: CandleData[] = [];
  let price = basePrice * 0.85;

  for (let i = limit; i >= 0; i--) {
    const drift = (Math.random() - 0.48) * price * 0.02;
    price = Math.max(price + drift, 0.01);
    const volatility = price * 0.015;
    const open  = price;
    const close = price + (Math.random() - 0.5) * volatility;
    const high  = Math.max(open, close) + Math.random() * volatility;
    const low   = Math.min(open, close) - Math.random() * volatility;
    candles.push({
      time:   now - i * interval,
      open:   +open.toFixed(4),
      high:   +high.toFixed(4),
      low:    +Math.max(low, 0.001).toFixed(4),
      close:  +close.toFixed(4),
      volume: +(basePrice * (1000 + Math.random() * 5000)).toFixed(2),
    });
    price = close;
  }
  return candles;
}

/** Slightly mutate cached prices to simulate live movement. */
export function tickPrices(): void {
  cachedMarkets = cachedMarkets.map(m => {
    const delta = (Math.random() - 0.495) * m.price * 0.002;
    const newPrice = Math.max(m.price + delta, 0.0001);
    const newChange = m.change24h + (Math.random() - 0.5) * 0.05;
    return { ...m, price: +newPrice.toFixed(6), change24h: +newChange.toFixed(2) };
  });
}
