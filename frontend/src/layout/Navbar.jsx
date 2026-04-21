import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCartData } from "../context/CartContext";
import { ShoppingCart, Menu, X, ShoppingBag } from "lucide-react";

export const Navbar = () => {
  const { cartItems } = useCartData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { title: "Products", path: "/list" },
    { title: "Cart", path: "/cart", badge: cartItems.length },
    { title: "Orders", path: "/my-orders" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b border-border h-16 flex justify-center items-center shadow-sm">
      <div className="w-11/12 max-w-7xl flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-primary tracking-tight flex items-center gap-2"
        >
          <div className="p-1.5 bg-primary rounded-lg text-white">
            <ShoppingBag className="w-5 h-5" />
          </div>
          Elevate<span className="text-text-main">Shop</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((data, i) => (
            <Link
              key={i}
              className="text-sm font-medium text-text-muted hover:text-primary transition-colors flex items-center gap-1.5 relative group"
              to={data.path}
            >
              {data.title === "Cart" && <ShoppingCart className="w-4 h-4" />}
              {data.title}
              {data.badge > 0 && (
                <span className="absolute -top-2 -right-3.5 bg-primary text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-sm">
                  {data.badge}
                </span>
              )}
            </Link>
          ))}
          <div className="h-4 w-[1px] bg-border mx-2"></div>
          <Link
            className="text-sm font-semibold text-text-main hover:text-primary transition-colors"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="px-5 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 active:scale-95"
            to="/register"
          >
            Join Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <Link
            to="/cart"
            className="relative group p-2 text-text-muted hover:text-primary transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItems.length > 0 && (
              <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-text-muted hover:text-primary transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-16 right-0 h-[calc(100vh-64px)] w-72 bg-surface border-l border-border transition-transform duration-300 md:hidden z-50 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col p-6 gap-6">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest pl-2">
              Navigation
            </p>
            {navLinks.map((data, i) => (
              <Link
                key={i}
                to={data.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-bold text-text-main hover:text-primary p-2 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  {data.title === "Cart" && (
                    <ShoppingCart className="w-5 h-5" />
                  )}
                  {data.title}
                </div>
                {data.badge > 0 && (
                  <span className="bg-primary/10 text-primary text-xs px-2.5 py-0.5 rounded-full">
                    {data.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="h-[1px] bg-border my-2"></div>

          <div className="flex flex-col gap-4 text-center mt-2">
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-3 text-text-main font-bold border border-border rounded-xl hover:bg-gray-50 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
