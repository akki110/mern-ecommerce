import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useData } from "./AuthContext";
import { useFetch } from "../hooks/useFetch";
import { API_ENDPOINTS } from "../utils/constant";

export const CartContextData = createContext();

export const CartContext = ({ children }) => {
  const { isAuthenticated } = useData();
  const { callApi } = useFetch();

  // Initial State
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Fetch Cart from backend when user logged in
  const fetchBackendCart = async () => {
    if (isAuthenticated) {
      try {
        const res = await callApi({ endpoint: API_ENDPOINTS.CART });

        if (res.success && res.data.items) {
          const formattedItems = res.data.items
            .filter((item) => item.product)
            .map((item) => ({
              ...item.product,
              quantity: item.quantity,
              id: item.product._id,
            }));

          setCartItems(formattedItems);
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchBackendCart();
  }, [isAuthenticated]);
  // Sync cart with Local Storage (for guest users)
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cartItems, isAuthenticated]);

  const addToCart = async (product, quantity = 1) => {
    if (isAuthenticated) {
      try {
        const productId = product._id || product.id;
        await callApi({
          method: "POST",
          endpoint: `${API_ENDPOINTS.CART}/add`,
          body: { productId, quantity },
        });
        fetchBackendCart();
      } catch (error) {
        toast.error("Failed to sync cart to database");
      }
    } else {
      setCartItems((prev) => {
        const productId = product._id || product.id;
        const existingItem = prev.find((item) => (item._id || item.id) === productId);
        if (existingItem) {
          return prev.map((item) =>
            (item._id || item.id) === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }
        return [...prev, { ...product, id: productId, quantity }];
      });
    }
  };

  const removeFromCart = async (productId) => {
    if (isAuthenticated) {
      try {
        await callApi({
          method: "DELETE",
          endpoint: `${API_ENDPOINTS.CART}/remove/${productId}`,
        });
        fetchBackendCart();
      } catch (error) {
        toast.error("Failed to sync cart to database");
      }
    } else {
      setCartItems((prev) => prev.filter((item) => (item._id || item.id) !== productId));
      toast.success("Item removed from cart");
    }
  };

  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    if (isAuthenticated) {
      await callApi({
        method: "PATCH",
        endpoint: `${API_ENDPOINTS.CART}/update`,
        body: { productId, quantity: newQty },
      });
      fetchBackendCart();
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          (item._id || item.id) === productId ? { ...item, quantity: newQty } : item,
        ),
      );
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await callApi({
          method: "DELETE",
          endpoint: `${API_ENDPOINTS.CART}/clear`,
        });
        setCartItems([]);
        localStorage.removeItem("cart");
      } catch (error) {
        toast.error("Failed to clear cart in database");
      }
    } else {
      setCartItems([]);
      localStorage.removeItem("cart");
    }
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
  };

  return (
    <CartContextData.Provider value={value}>
      {children}
    </CartContextData.Provider>
  );
};

export const useCartData = () => {
  const context = useContext(CartContextData);

  if (!context) {
    throw new Error("useCartData must be used within CartContext");
  }

  return context;
};
