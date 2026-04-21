export const BASE_URL = "http://localhost:5000";

export const API_ENDPOINTS = {
  PRODUCT: `${BASE_URL}/api/product`,
  AUTH: `${BASE_URL}/api/auth`,
  ORDER: `${BASE_URL}/api/order`,
  PAYMENT: `${BASE_URL}/api/payment`,
};

export const ORDER_STATUS = {
  PENDING: "Pending",
  SUCCESS: "Success",
  CANCELLED: "Cancelled",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
};
