import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCartData } from "../context/CartContext";
import {
  Search,
  Truck,
  User,
  MapPin,
  ChevronDown,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";
import { useData } from "../context/AuthContext";

export const Navbar = () => {
  const { cartItems } = useCartData();
  const { isAuthenticated, logout, user } = useData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const categoryRef = useRef(null);

  const categories = [
    { title: "Fruits & Vegetables", value: "fruits-and-vegetables" },
    { title: "Dairy & Bakery", value: "dairy-and-bakery" },
    { title: "Staples", value: "staples" },
    { title: "Snacks & Branded Foods", value: "snacks-and-branded-foods" },
    { title: "Beverages", value: "beverages" },
    { title: "Home & Kitchen", value: "home-and-kitchen" },
  ];

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "New Products", path: "/list?sort=newest" },
    { title: "Shop", path: "/list" },
    { title: "Offers", path: "/list?sort=sale", special: true },
    { title: "Store Location", path: "#" },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/list?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/list");
    }
  };

  const handleCategorySelect = (val) => {
    setIsCategoryOpen(false);
    navigate(`/list?category=${val}`);
  };

  return (
    <header className="w-full z-50 bg-white border-b border-gray-200">
      {/* Top Header */}
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-[#00B67A]/10 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-[#00B67A]" />
          </div>
          <span className="text-xl font-bold text-[#191919] tracking-tight">
            Epic <span className="text-[#00B67A]">Grocery</span>
          </span>
        </Link>

        {/* Delivery Info (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 text-[#4A4A4A] shrink-0">
          <Truck className="w-5 h-5 text-gray-400" />
          <p className="text-sm font-medium">Free Delivery All Over UK*</p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-[600px] relative hidden md:block"
        >
          <input
            type="text"
            placeholder="What are you looking for ?"
            className="w-full bg-[#F5F5F5] border-none rounded-sm py-3.5 pl-5 pr-12 text-[15px] text-[#191919] focus:outline-none focus:ring-1 focus:ring-[#00B67A]/30 transition-all placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00B67A] transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* User Actions */}
        <div className="flex items-center gap-8 shrink-0">
          {/* Cart */}
          <Link to="/cart" className="flex items-center gap-3 group">
            <span className="text-[15px] font-bold text-[#191919] hidden sm:block">
              My Cart({cartItems.length})
            </span>
            <div className="relative p-2 rounded-full group-hover:bg-gray-100 transition-colors">
              <ShoppingBag className="w-6 h-6 text-[#191919]" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-[#00B67A] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-white">
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>

          {/* Account */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={logout}
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                    Log out
                  </span>
                  <span className="text-sm font-bold text-[#191919]">
                    {user?.firstName || "Account"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-3 group">
              <div className="p-2 rounded-full group-hover:bg-gray-100 transition-colors">
                <User className="w-6 h-6 text-[#191919]" />
              </div>
              <span className="text-[15px] font-bold text-[#191919]">
                Login
              </span>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-500 hover:text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-[#1C3E4C] text-white">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center">
            {/* Categories Dropdown */}
            <div
              className="relative border-r border-white/10"
              ref={categoryRef}
            >
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-4 px-8 py-4 hover:bg-white/5 transition-colors"
              >
                <span className="text-sm uppercase tracking-wider">
                  All Categories
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${isCategoryOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                  {categories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCategorySelect(cat.value)}
                      className="w-full text-left px-6 py-3 text-sm text-[#191919] hover:bg-gray-50 hover:text-[#00B67A] transition-all border-b border-gray-50 last:border-none"
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-2 pl-8">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                className={`px-4 py-4 text-sm  hover:text-[#00B67A] transition-colors ${link.special ? "text-[#E6B325]" : "text-white"}`}
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Location */}
          <div className="hidden lg:flex items-center gap-3 pr-8 text-sm">
            <span className="text-white/60">Delivery to</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Berkshire. RG42 3DH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-gray-100 rounded-lg py-3 px-4 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </form>

          <div className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-bold ${link.special ? "text-[#E6B325]" : "text-[#191919]"}`}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
