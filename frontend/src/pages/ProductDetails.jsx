import React, { useEffect, useState } from "react";
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
import { useFetch } from "../hooks/useFetch";
import { API_ENDPOINTS, BASE_URL } from "../utils/constant";
import { Loader } from "../components/Loader";

export const ProductDetails = () => {
  const { id } = useParams();
  const { cartItems, addToCart, updateQuantity, removeFromCart } =
    useCartData();
  const [product, setProduct] = useState(null);

  const { loading, callApi } = useFetch();

  // Find if this product is already in the cart
  const cartItem = cartItems.find((ci) => (ci._id || ci.id) === id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await callApi({
          endpoint: `${API_ENDPOINTS.PRODUCT}/${id}`,
        });
        if (res.success) {
          setProduct(res.data);
        }
      } catch (error) {
        console.log("Failed to Fetch product");
      }
    };
    if (id) {
      fetchProductData();
    }
  }, [id, callApi]);

  const handleIncrement = () => {
    if (product) {
      if (cartQuantity === 0) {
        addToCart(product, 1);
      } else {
        updateQuantity(product._id, cartQuantity + 1);
      }
    }
  };

  const handleDecrement = () => {
    if (product && cartQuantity > 0) {
      if (cartQuantity === 1) {
        removeFromCart(product._id);
      } else {
        updateQuantity(product._id, cartQuantity - 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-11/12 max-w-7xl mx-auto py-8">
        {loading && !product ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : product ? (
          <>
            {/* Breadcrumbs / Navigation */}
            <div className="flex items-center gap-2 mb-5 text-sm text-text-muted">
              <Link
                to="/"
                className="hover:text-primary text-[12px] transition-colors uppercase"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                to="/list"
                className="hover:text-primary text-[12px] transition-colors uppercase"
              >
                {product.category}
              </Link>
              <span>/</span>
              <span className="text-primary text-[12px] font-medium uppercase">
                {product.name}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-surface p-6 rounded-2xl border border-border shadow-md">
              {/* Left Column: Image Section */}
              <div className="lg:col-span-7">
                <div className="aspect-[1/1] rounded-xl overflow-hidden bg-gray-50 border border-border">
                  <img
                    src={`${BASE_URL}/upload/${product.image}`}
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
                      className={`text-sm font-medium ${product.countInStock > 10 ? "text-accent" : "text-red-500"}`}
                    >
                      {product.countInStock <= 10 ? "Low Stock" : "In Stock"}
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
                      onClick={handleDecrement}
                      disabled={cartQuantity === 0}
                      className="p-2 hover:bg-surface rounded-md transition-colors text-text-main disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="w-12 text-center font-bold text-text-main">
                      {cartQuantity || 1}
                    </div>
                    <button
                      onClick={handleIncrement}
                      className="p-2 hover:bg-surface rounded-md transition-colors text-text-main"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  {cartQuantity === 0 ? (
                    <button
                      onClick={handleIncrement}
                      className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/30"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                  ) : (
                    <Link
                      to="/cart"
                      className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/30"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      View in Cart ({cartQuantity})
                    </Link>
                  )}
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
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-text-muted">Product not found.</p>
            <Link
              to="/list"
              className="text-primary hover:underline mt-4 inline-block"
            >
              Back to Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
