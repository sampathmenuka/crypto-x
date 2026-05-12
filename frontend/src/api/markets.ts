import { apiClient } from './client';

export const marketsApi = {
  getMarkets: () => apiClient.get('/markets'),
  getCandles: (symbol: string) => apiClient.get(`/markets/${symbol}/candles`),
};
