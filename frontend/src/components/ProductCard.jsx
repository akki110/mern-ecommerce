import React from "react";
import { Link } from "react-router-dom";
import { useCartData } from "../context/CartContext";
import { BASE_URL } from "../utils/constant";
import { Plus, Minus } from "lucide-react";

export const ProductCard = ({ item }) => {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCartData();

  // Find if this product is already in the cart
  const cartItem = cartItems.find((ci) => (ci._id || ci.id) === item._id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity === 0) {
      addToCart(item);
    } else {
      updateQuantity(item._id, quantity + 1);
    }
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity === 1) {
      removeFromCart(item._id);
    } else {
      updateQuantity(item._id, quantity - 1);
    }
  };

  return (
    <Link
      to={`/product/${item._id}`}
      className="bg-surface rounded-lg shadow-sm border border-border p-4 hover:shadow-md transition-shadow group flex flex-col"
    >
      <div className="relative w-full aspect-square bg-gray-50 rounded-md mb-4 overflow-hidden border border-border/50">
        <img
          src={`${BASE_URL}/upload/${item?.image}`}
          alt={item.name}
          className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute px-2 py-0.5 top-3 right-3 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-sm shadow-md shadow-primary/20">
          {item?.category}
        </div>
      </div>
      <h3 className="text-lg font-bold text-text-main mb-1 truncate">
        {item?.name}
      </h3>
      <p className="text-sm text-text-muted mb-4 line-clamp-2 min-h-[40px]">
        {item?.description}
      </p>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xl font-bold text-primary">
          ₹{item?.price.toLocaleString("en-IN")}
        </span>

        {quantity === 0 ? (
          <button
            onClick={handleIncrement}
            className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-hover transition-all shadow-md shadow-primary/20 active:scale-95"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-border">
            <button
              onClick={handleDecrement}
              className="p-1.5 hover:bg-white rounded-md transition-colors text-primary"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-sm font-bold text-text-main min-w-[30px] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="p-1.5 hover:bg-white rounded-md transition-colors text-primary"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};
