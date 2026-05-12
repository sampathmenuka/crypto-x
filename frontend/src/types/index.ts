// Shared TypeScript types for Crypto-X frontend

export interface User {
  id: string
  email: string
  username: string
  createdAt?: string
}

export interface Market {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
  high24h?: number
  low24h?: number
  circulatingSupply?: number
  imageUrl?: string
}

export interface CandleData {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export type OrderSide = 'BUY' | 'SELL'
export type OrderType = 'MARKET' | 'LIMIT' | 'STOP_LIMIT'
export type OrderStatus = 'PENDING' | 'FILLED' | 'CANCELLED' | 'PARTIAL'

export interface Order {
  id: string
  symbol: string
  type: OrderSide
  orderType?: OrderType
  price: number
  quantity: number
  total: number
  status: OrderStatus
  createdAt: string
  filledAt?: string
}

export interface Position {
  symbol: string
  quantity: number
  averagePrice: number
  currentPrice: number
  profit: number
  profitPercentage: number
}

export interface Wallet {
  balance: number
  available: number
  locked: number
}

export type TimeInterval = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w'

export interface TickerUpdate {
  symbol: string
  price: number
  change24h: number
  volume24h: number
}
