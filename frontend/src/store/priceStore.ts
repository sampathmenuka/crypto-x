import { create } from 'zustand';

export interface PriceData {
  symbol: string;
  price: number;
  change24h: number;
}

interface PriceState {
  prices: Record<string, PriceData>;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

let ws: WebSocket | null = null;

export const usePriceStore = create<PriceState>((set, get) => ({
  prices: {},
  isConnected: false,
  connect: () => {
    if (ws && ws.readyState !== WebSocket.CLOSED) return;

    ws = new WebSocket('ws://localhost:3001/ws');

    ws.onopen = () => {
      set({ isConnected: true });
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'price_update') {
          const updates: Record<string, PriceData> = {};
          message.data.forEach((data: PriceData) => {
            updates[data.symbol] = data;
          });
          set((state) => ({
            prices: { ...state.prices, ...updates }
          }));
        }
      } catch (err) {
        console.error('Failed to parse WS message', err);
      }
    };

    ws.onclose = () => {
      set({ isConnected: false });
      // Reconnect logic could be added here
      setTimeout(() => {
        get().connect();
      }, 5000);
    };

    ws.onerror = (err) => {
      console.error('WS Error', err);
      ws?.close();
    };
  },
  disconnect: () => {
    if (ws) {
      ws.close();
      ws = null;
    }
  }
}));
