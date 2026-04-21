import React from "react";
import { Link } from "react-router-dom";
import { useCartData } from "../context/CartContext";
import { BASE_URL } from "../utils/constant";

export const ProductCard = ({ item }) => {
  const { addToCart } = useCartData();

  return (
    <Link
      to={`/product/${item._id}`}
      className="bg-surface rounded-lg shadow-sm border border-border p-4 hover:shadow-md transition-shadow group"
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
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(item);
          }}
          className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-hover transition-all shadow-md shadow-primary/20 active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};
