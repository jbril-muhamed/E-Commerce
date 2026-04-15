import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Attach token from localStorage to every request
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('hms_user') || 'null');
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// ─── Auth ────────────────────────────────────────────────────────────────────
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');

// ─── Products ────────────────────────────────────────────────────────────────
export const getProducts = (params) => api.get('/products', { params });
export const getFeaturedProducts = () => api.get('/products/featured');
export const getProductBySlug = (slug) => api.get(`/products/${slug}`);

// ─── Banners ─────────────────────────────────────────────────────────────────
export const getBanners = () => api.get('/banners');
export const getHeroBanners = () => api.get('/banners/hero');
export const getFooterBanners = () => api.get('/banners/footer');

// ─── Orders ──────────────────────────────────────────────────────────────────
export const getMyOrders = () => api.get('/orders/my');
export const getOrderById = (id) => api.get(`/orders/${id}`);

// ─── Stripe ──────────────────────────────────────────────────────────────────
export const createCheckoutSession = (data) =>
  api.post('/stripe/checkout', data);
export const getStripeSession = (sessionId) =>
  api.get(`/stripe/session/${sessionId}`);

export default api;
