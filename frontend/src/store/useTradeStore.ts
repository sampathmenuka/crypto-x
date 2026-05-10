import { create } from 'zustand'

export interface Order {
  id: string
  symbol: string
  type: 'BUY' | 'SELL'
  price: number
  quantity: number
  total: number
  status: 'PENDING' | 'FILLED' | 'CANCELLED'
  createdAt: string
}

export interface Position {
  symbol: string
  quantity: number
  averagePrice: number
  currentPrice: number
  profit: number
  profitPercentage: number
}

interface TradeStore {
  orders: Order[]
  positions: Position[]
  wallet: {
    balance: number
    available: number
    locked: number
  }
  isLoading: boolean
  error: string | null
  
  // Order operations
  addOrder: (order: Order) => void
  updateOrder: (id: string, order: Partial<Order>) => void
  cancelOrder: (id: string) => void
  
  // Position operations
  addPosition: (position: Position) => void
  updatePosition: (symbol: string, position: Partial<Position>) => void
  closePosition: (symbol: string) => void
  
  // Wallet operations
  setWallet: (wallet: TradeStore['wallet']) => void
  updateBalance: (amount: number) => void
  
  // Fetch operations
  fetchOrders: () => Promise<void>
  fetchPositions: () => Promise<void>
  fetchWallet: () => Promise<void>
}

export const useTradeStore = create<TradeStore>((set, get) => ({
  orders: [],
  positions: [],
  wallet: {
    balance: 0,
    available: 0,
    locked: 0,
  },
  isLoading: false,
  error: null,

  // Order operations
  addOrder: (order: Order) => {
    set((state) => ({
      orders: [order, ...state.orders],
    }))
  },

  updateOrder: (id: string, orderUpdate: Partial<Order>) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, ...orderUpdate } : order
      ),
    }))
  },

  cancelOrder: (id: string) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, status: 'CANCELLED' as const } : order
      ),
    }))
  },

  // Position operations
  addPosition: (position: Position) => {
    set((state) => ({
      positions: [position, ...state.positions],
    }))
  },

  updatePosition: (symbol: string, positionUpdate: Partial<Position>) => {
    set((state) => ({
      positions: state.positions.map((position) =>
        position.symbol === symbol ? { ...position, ...positionUpdate } : position
      ),
    }))
  },

  closePosition: (symbol: string) => {
    set((state) => ({
      positions: state.positions.filter((position) => position.symbol !== symbol),
    }))
  },

  // Wallet operations
  setWallet: (wallet: TradeStore['wallet']) => {
    set({ wallet })
  },

  updateBalance: (amount: number) => {
    set((state) => ({
      wallet: {
        ...state.wallet,
        balance: state.wallet.balance + amount,
        available: state.wallet.available + amount,
      },
    }))
  },

  // Fetch operations
  fetchOrders: async () => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement API call to fetch orders
      set({ isLoading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch orders'
      set({ error: message, isLoading: false })
    }
  },

  fetchPositions: async () => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement API call to fetch positions
      set({ isLoading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch positions'
      set({ error: message, isLoading: false })
    }
  },

  fetchWallet: async () => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement API call to fetch wallet
      set({ isLoading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch wallet'
      set({ error: message, isLoading: false })
    }
  },
}))

export default useTradeStore
