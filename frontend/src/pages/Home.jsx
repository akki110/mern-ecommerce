import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";

export const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Minimalist Leather Watch",
      description: "A sleek, minimalist watch with a genuine leather strap.",
      category: "Accessories",
      price: 120.0,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Noise Cancelling Headphones",
      description: "Premium sound quality with active noise cancellation.",
      category: "Electronics",
      price: 250.0,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Premium Canvas Backpack",
      description: "Durable and stylish backpack for everyday carry.",
      category: "Bags",
      price: 85.0,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1170&auto=format&fit=crop",
    },
  ];

  return (
    <>
      <div className="w-full flex justify-center items-start p-10">
        <div className="w-11/12 max-w-7xl">
          <h1 className="text-3xl font-bold text-text-main mb-6">
            Featured Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((item, i) => (
              <ProductCard item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
