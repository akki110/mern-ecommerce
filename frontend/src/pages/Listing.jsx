import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";

export const Listing = () => {
  const products = [
    {
      id: 1,
      name: "Minimalist Leather Watch",
      description: "A sleek, minimalist watch with a genuine leather strap.",
      category: "Accessories",
      price: 120.0,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Noise Cancelling Headphones",
      description: "Premium sound quality with active noise cancellation.",
      category: "Electronics",
      price: 250.0,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop",
    },
  ];

  return (
    <>
      <div className="w-full flex justify-center items-start p-10">
        <div className="w-11/12 max-w-7xl">
          <h2 className="text-3xl font-bold text-text-main mb-6">
            All Products
          </h2>
          {/* Search and Sorting */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 mb-5">
            <div className="w-full md:w-5/6">
              <input
                type="text"
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
                placeholder="Search"
                value={"search by category and name"}
              />
            </div>
            <div className="w-full md:w-1/6">
              <select
                name=""
                id=""
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
              >
                <option value="">Sort By</option>
                <option value="">Price: Low to High</option>
                <option value="">Price: High to Low</option>
                <option value="">Newest First</option>
                <option value="">Sale</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item, i) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
