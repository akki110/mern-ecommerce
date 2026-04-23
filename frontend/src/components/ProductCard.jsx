import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCartData } from "../context/CartContext";
import { BASE_URL } from "../utils/constant";
import { Heart, ShoppingCart } from "lucide-react";

export const ProductCard = ({ item }) => {
  const { cartItems, addToCart, updateQuantity, removeFromCart } =
    useCartData();
  const [isLiked, setIsLiked] = useState(false);

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

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link
      to={`/product/${item._id}`}
      className="bg-transparent rounded-sm border border-gray-500 p-3 hover:shadow-xl transition-all duration-300 group flex flex-col relative overflow-hidden h-full"
    >
      {/* Sale Badge */}
      {item.isSale && (
        <div className="absolute top-4 right-4 z-10 w-10 h-10 bg-green-600 rounded-full flex flex-col items-center justify-center text-white leading-tight shadow-lg shadow-[#00B67A]/20">
          <span className="text-[11px] font-bold">20%</span>
          <span className="text-[10px]">off</span>
        </div>
      )}
      {/* Product Image */}
      <div className="relative w-full flex items-center justify-center overflow-hidden mb-5">
        <img
          src={`${BASE_URL}/upload/${item?.images?.[0] || item?.image}`}
          alt={item.name}
          className="max-w-full h-[200px] object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      {/* Brand & Wishlist Row */}
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs  text-gray-400 tracking-wide uppercase">
          {item.brand || "Fresho"}
        </span>
        <button
          onClick={toggleLike}
          className="text-gray-300 hover:text-red-500 transition-colors p-1"
        >
          <Heart
            className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
          />
        </button>
      </div>
      {/* Product Info Row */}
      <div className="flex items-baseline justify-between gap-2 mb-3">
        <h3 className="text-[15px] font-normal text-[#191919] leading-tight line-clamp-2 flex-1">
          {item.name}
        </h3>
        <span className="text-md font-bold text-[#191919] shrink-0">
          ${item.price}
        </span>
      </div>
      s{/* Add to Cart / Quantity Control */}
      <div className="mt-auto pt-2">
        {quantity > 0 ? (
          <div className="flex items-center border-2 border-[#191919] rounded-sm overflow-hidden">
            <button
              onClick={handleDecrement}
              className="px-4 py-3 bg-white hover:bg-gray-50 text-[#191919] transition-colors"
            >
              <span className="text-lg font-bold">−</span>
            </button>
            <span className="flex-1 text-center font-bold text-[15px] text-[#191919]">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="px-4 py-3 bg-white hover:bg-gray-50 text-[#191919] transition-colors"
            >
              <span className="text-lg font-bold">+</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleIncrement}
            className="w-full py-2 border text-[15px] font-bold text-[#191919] bg-white hover:bg-[#191919] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
          >
            Add to cart
          </button>
        )}
      </div>
    </Link>
  );
};
