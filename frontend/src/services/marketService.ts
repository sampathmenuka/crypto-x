import apiClient from './api'

interface Market {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
}

interface CandleData {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export const marketService = {
  // Get all markets
  getMarkets: async (limit: number = 50): Promise<Market[]> => {
    const response = await apiClient.get('/markets', { params: { limit } })
    return response.data
  },

  // Get specific market data
  getMarket: async (symbol: string): Promise<Market> => {
    const response = await apiClient.get(`/markets/${symbol}`)
    return response.data
  },

  // Get candle data for charts
  getCandles: async (
    symbol: string,
    interval: string = '1h',
    limit: number = 100
  ): Promise<CandleData[]> => {
    const response = await apiClient.get(`/markets/${symbol}/candles`, {
      params: { interval, limit },
    })
    return response.data
  },

  // Search markets
  searchMarkets: async (query: string): Promise<Market[]> => {
    const response = await apiClient.get('/markets/search', { params: { q: query } })
    return response.data
  },
}

export default marketService
