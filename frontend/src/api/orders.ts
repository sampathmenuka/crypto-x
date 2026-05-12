import { apiClient } from './client';

export const ordersApi = {
  placeOrder: (data: any) => apiClient.post('/orders', data),
  getOrders: () => apiClient.get('/orders'),
  cancelOrder: (id: string) => apiClient.delete(`/orders/${id}`),
};
