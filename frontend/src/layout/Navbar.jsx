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
  Phone,
  LayoutGrid,
} from "lucide-react";
import { useData } from "../context/AuthContext";

export const Navbar = () => {
  const { cartItems } = useCartData();
  const { isAuthenticated, logout, user } = useData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const categoryRef = useRef(null);
  const userRef = useRef(null);

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
      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/list?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsMobileMenuOpen(false);
    } else {
      navigate("/list");
    }
  };

  const handleCategorySelect = (val) => {
    setIsCategoryOpen(false);
    setIsMobileMenuOpen(false);
    navigate(`/list?category=${val}`);
  };

  return (
    <>
      <header className="w-full z-[100] bg-white sticky top-0 border-b border-gray-100 shadow-sm">
        {/* Top Header */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4 md:gap-8">
          {/* Mobile Menu Button (Left on Mobile) */}
          <button
            className="lg:hidden p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <span className="text-lg md:text-xl font-bold text-[#191919] tracking-tight">
              Epic <span className="text-primary">Grocery</span>
            </span>
          </Link>

          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-[600px] relative hidden lg:block"
          >
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full bg-[#F5F5F5] border-none rounded-md py-3 pl-5 pr-12 text-[15px] text-[#191919] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* User Actions */}
          <div className="flex items-center gap-2 md:gap-6 shrink-0">
            {/* Cart */}
            <Link to="/cart" className="flex items-center gap-2 md:gap-3 group">
              <div className="relative p-2 md:p-2.5 rounded-full hover:bg-gray-100 transition-colors">
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-[#191919]" />
                {cartItems.length > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] md:text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-white">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                  My Cart
                </span>
                <span className="text-sm font-bold text-[#191919]">
                  Items: {cartItems.length}
                </span>
              </div>
            </Link>
            {/* Account (Hidden on small mobile, show icon) */}
            {isAuthenticated ? (
              <div className="relative group" ref={userRef}>
                <div
                  className="flex items-center gap-2 md:gap-3 cursor-pointer py-2"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-100 hover:bg-gray-200 transition-colors overflow-hidden">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                      Account
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-[#191919]">
                        {user?.firstName || "User"}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isUserDropdownOpen ? "rotate-180" : "group-hover:rotate-180"}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Account Dropdown */}
                <div
                  className={`absolute top-full right-0 w-48 bg-white shadow-xl border border-gray-100 py-2 z-50 rounded-xl overflow-hidden transition-all duration-300
                    ${
                      isUserDropdownOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible translate-y-2 lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:translate-y-0"
                    }`}
                >
                  <Link
                    to="/my-orders"
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    My Orders
                  </Link>
                  {/* <Link 
                    to="/account" 
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-50"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link> */}
                  <button
                    onClick={() => {
                      logout();
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors text-left"
                  >
                    <X className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 md:gap-3 group"
              >
                <div className="p-2 md:p-2.5 rounded-full hover:bg-gray-100 transition-colors">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-[#191919]" />
                </div>
                <span className="text-[14px] md:text-[15px] font-bold text-[#191919] hidden sm:block">
                  Login
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Navigation Bar (Desktop Only) */}
        <div className="hidden lg:block bg-[#1C3E4C] text-white">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            <div className="flex items-center">
              {/* Categories Dropdown */}
              <div
                className="relative border-r border-white/10"
                ref={categoryRef}
              >
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center gap-4 px-8 py-3.5 hover:bg-white/5 transition-colors"
                >
                  <LayoutGrid className="w-4 h-4 text-primary" />
                  <span className="text-xs md:text-sm uppercase tracking-wider font-semibold">
                    All Categories
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isCategoryOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isCategoryOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                    {categories.map((cat, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleCategorySelect(cat.value)}
                        className="w-full text-left px-6 py-3 text-[13px] text-[#191919] hover:bg-gray-50 hover:text-primary transition-all border-b border-gray-50 last:border-none font-medium"
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Nav Links */}
              <nav className="flex items-center gap-2 pl-6">
                {navLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.path}
                    className={`px-4 py-3.5 text-[13px] font-bold uppercase tracking-wide hover:text-primary transition-colors ${link.special ? "text-[#FFB800]" : "text-white"}`}
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Location & Support */}
            <div className="flex items-center gap-8 pr-8">
              <div className="hidden xl:flex items-center gap-3 text-xs font-medium">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-white/80">Berkshire, RG42 3DH</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold border-l border-white/10 pl-8">
                <Phone className="w-4 h-4 text-primary" />
                <span>+44 1234 567890</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-[200] transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-[201] shadow-2xl transition-transform duration-300 ease-in-out transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <span className="text-lg font-bold text-[#191919]">
                Epic <span className="text-primary">Grocery</span>
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto py-6 px-5 custom-scrollbar">
            {/* Search (Mobile) */}
            <form onSubmit={handleSearch} className="mb-8 relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:border-primary transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </form>

            {/* Nav Links */}
            <div className="space-y-1 mb-8">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                Main Menu
              </p>
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-2 text-[15px] font-bold rounded-lg transition-colors ${link.special ? "text-[#FFB800] bg-[#FFB800]/5" : "text-[#191919] hover:bg-gray-50"}`}
                >
                  {link.title}
                </Link>
              ))}
            </div>

            {/* Categories */}
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                Shop By Category
              </p>
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCategorySelect(cat.value)}
                  className="w-full text-left py-3 px-2 text-[14px] font-semibold text-gray-600 hover:text-primary transition-colors border-b border-gray-50"
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-gray-100">
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-3 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-3 py-3 bg-primary text-white font-bold rounded-xl"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
