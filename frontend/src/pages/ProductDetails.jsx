import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import {
  Minus,
  Plus,
  ShoppingCart,
  Star,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useCartData } from "../context/CartContext";

export const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartData();

  // Mock product data (In a real app, you'd fetch this using the 'id')
  const product = {
    id: 1,
    name: "Minimalist Leather Watch",
    description:
      "A sleek, minimalist watch with a genuine leather strap. This timepiece combines classic elegance with modern functionality, making it perfect for both formal and casual settings. Crafted with a stainless steel case and scratch-resistant sapphire glass.",
    category: "Accessories",
    price: 120.0,
    stock: true,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  const handleCart = () => {
    addToCart(product, quantity);
  };

  // const handleBuyNow = () => {
  //   toast.loading("Redirecting to checkout...");
  // };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-11/12 max-w-7xl mx-auto py-8">
        {/* Breadcrumbs / Navigation */}
        <div className="flex items-center gap-2 mb-8 text-sm text-text-muted">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/list" className="hover:text-primary transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-text-main font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-surface p-6 rounded-2xl border border-border shadow-md">
          {/* Left Column: Image Section */}
          <div className="lg:col-span-7">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gray-50 border border-border">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Info & Actions Section */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-2 flex items-center gap-4">
              <div className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-primary bg-primary/10 rounded-full uppercase">
                {product.category}
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`text-sm font-medium ${product.stock > 0 ? "text-accent" : "text-red-500"}`}
                >
                  {product.stock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-text-main mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="text-3xl font-bold text-primary mb-8 px-1">
              ₹{product.price.toLocaleString("en-IN")}
            </div>

            <div className="border-t border-border pt-6 mb-8">
              <p className="text-base text-text-muted leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-text-main mb-3 uppercase tracking-wide">
                Quantity
              </label>
              <div className="flex items-center w-fit border border-border rounded-lg bg-background p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-surface rounded-md transition-colors text-text-main"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-12 text-center font-bold text-text-main bg-transparent focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-surface rounded-md transition-colors text-text-main"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleCart}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/30"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              {/* <button
                onClick={handleBuyNow}
                className="flex-1 px-8 py-4 bg-text-main text-white font-bold rounded-xl hover:bg-black transition-all"
              >
                Buy Now
              </button> */}
            </div>

            {/* Features/Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-border">
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <div className="p-2 bg-background rounded-lg border border-border">
                  <Truck className="w-4 h-4 text-primary" />
                </div>
                <span>Fast & Free Shipping</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <div className="p-2 bg-background rounded-lg border border-border">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                </div>
                <span>Extended Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
