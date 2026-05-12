import { apiClient } from './client';

export const portfolioApi = {
  getPortfolio: () => apiClient.get('/portfolio'),
  getBalance: (asset?: string) => apiClient.get(asset ? `/portfolio/balance?asset=${asset}` : '/portfolio/balance'),
};
