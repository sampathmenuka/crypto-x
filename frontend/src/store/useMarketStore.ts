import { create } from 'zustand'
import { marketService } from '../services/marketService'

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

interface MarketStore {
  markets: Market[]
  selectedMarket: Market | null
  candles: CandleData[]
  isLoading: boolean
  error: string | null
  selectedInterval: string
  fetchMarkets: (limit?: number) => Promise<void>
  fetchMarket: (symbol: string) => Promise<void>
  fetchCandles: (symbol: string, interval?: string) => Promise<void>
  searchMarkets: (query: string) => Promise<void>
  setSelectedMarket: (market: Market | null) => void
  setSelectedInterval: (interval: string) => void
}

export const useMarketStore = create<MarketStore>((set, get) => ({
  markets: [],
  selectedMarket: null,
  candles: [],
  isLoading: false,
  error: null,
  selectedInterval: '1h',

  fetchMarkets: async (limit = 50) => {
    set({ isLoading: true, error: null })
    try {
      const markets = await marketService.getMarkets(limit)
      set({ markets, isLoading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch markets'
      set({ error: message, isLoading: false })
    }
  },

  fetchMarket: async (symbol: string) => {
    set({ isLoading: true, error: null })
    try {
      const market = await marketService.getMarket(symbol)
      set({ selectedMarket: market, isLoading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch market'
      set({ error: message, isLoading: false })
    }
  },

  fetchCandles: async (symbol: string, interval = '1h') => {
    set({ isLoading: true, error: null })
    try {
      const candles = await marketService.getCandles(symbol, interval, 100)
      set({ candles, selectedInterval: interval, isLoading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch candles'
      set({ error: message, isLoading: false })
    }
  },

  searchMarkets: async (query: string) => {
    set({ isLoading: true, error: null })
    try {
      const markets = await marketService.searchMarkets(query)
      set({ markets, isLoading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to search markets'
      set({ error: message, isLoading: false })
    }
  },

  setSelectedMarket: (market: Market | null) => {
    set({ selectedMarket: market })
  },

  setSelectedInterval: (interval: string) => {
    set({ selectedInterval: interval })
  },
}))

export default useMarketStore
