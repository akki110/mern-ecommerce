import React, { useState, useEffect, useRef } from "react";
import { ProductCard } from "../components/ProductCard";
import { useFetch } from "../hooks/useFetch";
import { API_ENDPOINTS } from "../utils/constant";
import { Loader } from "../components/Loader";
import { ChevronDown, ChevronRight } from "lucide-react";
import rangeSlider from "range-slider-input";
import "range-slider-input/dist/style.css";
import banner from "../../public/banner.png";

import { Link, useSearchParams } from "react-router-dom";

const categoriesData = [
  {
    name: "Fruits & Vegetables",
    slug: "fruits-and-vegetables",
    sub: ["Citrus Fruits", "Melons", "Apples", "Banana", "Berries", "Others"],
  },
  {
    name: "Premium Fruits",
    slug: "premium-fruits",
    sub: ["Exotic Fruits", "Imported"],
  },
  { name: "Dairy & Bakery", slug: "dairy-and-bakery", sub: ["Milk", "Bread"] },
  { name: "Staples", slug: "staples", sub: ["Rice", "Flour"] },
  {
    name: "Snacks & Branded Foods",
    slug: "snacks-and-branded-foods",
    sub: ["Chips", "Biscuits"],
  },
  { name: "Beverages", slug: "beverages", sub: ["Tea", "Coffee"] },
  {
    name: "Mom & Baby Care",
    slug: "mom-and-baby-care",
    sub: ["Diapers", "Baby Food"],
  },
  {
    name: "Home & Kitchen",
    slug: "home-and-kitchen",
    sub: ["Utensils", "Cleaners"],
  },
];

export const Listing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";
  const sortParam = searchParams.get("sort") || "";

  const [sortBy, setSortBy] = useState(sortParam);
  const [products, setProducts] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sliderRef = useRef(null);
  const sliderInstance = useRef(null);

  const [openCategory, setOpenCategory] = useState(null);

  // Sync states with URL Search Params
  const [minPrice, setMinPriceState] = useState(
    Number(searchParams.get("minPrice")) || 0,
  );
  const [maxPrice, setMaxPriceState] = useState(
    Number(searchParams.get("maxPrice")) || 1000,
  );

  const inStockOnly = searchParams.get("inStock") === "true";
  const selectedSubCategories =
    searchParams.get("subCategory")?.split(",").filter(Boolean) || [];

  // Update states when URL changes (e.g. browser back button)
  useEffect(() => {
    setMinPriceState(Number(searchParams.get("minPrice")) || 0);
    setMaxPriceState(Number(searchParams.get("maxPrice")) || 1000);
  }, [searchParams]);

  const { loading, callApi } = useFetch();

  // sort dropdown
  const handleSortChange = (value) => {
    setSortBy(value);
    setDropdown(false);
    updateURLParams({ sort: value });
  };

  const updateURLParams = (newParams) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const updatedParams = { ...currentParams, ...newParams };

    // Remove empty values
    Object.keys(updatedParams).forEach((key) => {
      if (
        updatedParams[key] === "" ||
        updatedParams[key] === null ||
        updatedParams[key] === undefined
      ) {
        delete updatedParams[key];
      }
    });

    setSearchParams(updatedParams);
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case "price-low":
        return "Price: Low to High";
      case "price-high":
        return "Price: High to Low";
      case "sale":
        return "Sale";
      default:
        return "New In";
    }
  };

  // Sync sortBy state with URL param
  useEffect(() => {
    setSortBy(sortParam);
  }, [sortParam]);

  // Fetch products with all filters
  const fetchProducts = async (
    search = "",
    cat = "",
    sort = "",
    inStock = false,
    minP = 0,
    maxP = 1000,
    subs = [],
  ) => {
    try {
      let params = new URLSearchParams();
      if (search) params.append("q", search);
      if (cat) params.append("category", cat);
      if (inStock) params.append("inStock", "true");
      if (minP > 0) params.append("minPrice", minP);
      if (maxP < 1000) params.append("maxPrice", maxP);

      if (subs.length > 0) params.append("subCategory", subs.join(","));

      if (sort === "sale") {
        params.append("isSale", "true");
      } else if (sort) {
        params.append("sort", sort);
      }

      const res = await callApi({
        endpoint: `${API_ENDPOINTS.PRODUCT}?${params.toString()}`,
      });

      if (res.success) {
        setProducts(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // Trigger fetch on Search, Category, Sort or any Filter change
  useEffect(() => {
    fetchProducts(
      searchTerm,
      categoryParam,
      sortBy,
      inStockOnly,
      minPrice,
      maxPrice,
      selectedSubCategories,
    );
  }, [
    searchTerm,
    categoryParam,
    sortBy,
    inStockOnly,
    minPrice,
    maxPrice,
    searchParams.get("subCategory"),
  ]);

  // Sub-component for a Pure Tailwind Dual Range Slider (Smooth & Debounced)
  const PriceSlider = ({ min, max, onUpdate }) => {
    const [localMin, setLocalMin] = useState(min);
    const [localMax, setLocalMax] = useState(max);

    // Sync local state when props change (from URL or Inputs)
    useEffect(() => {
      setLocalMin(min);
      setLocalMax(max);
    }, [min, max]);

    const handleMinInput = (e) => {
      const val = Math.min(Number(e.target.value), localMax - 1);
      setLocalMin(val);
      onUpdate(val, localMax); // Real-time feedback
    };

    const handleMaxInput = (e) => {
      const val = Math.max(Number(e.target.value), localMin + 1);
      setLocalMax(val);
      onUpdate(localMin, val); // Real-time feedback
    };

    // Update URL only when user stops dragging
    const handleMouseUp = () => {
      // Logic handled in Listing.jsx debounce or onUpdate
    };

    // Calculate percentages for the green track
    const minPercent = (localMin / 1000) * 100;
    const maxPercent = (localMax / 1000) * 100;

    return (
      <div className="px-1 py-6">
        <div className="relative w-full h-1.5 bg-gray-100 rounded-full">
          {/* Green Track Range */}
          <div
            className="absolute h-full bg-[#51a133] rounded-full"
            style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
          />

          {/* Min Input */}
          <input
            type="range"
            min="0"
            max="1000"
            value={localMin}
            onInput={handleMinInput}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            className={`absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto 
                       [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
                       [&::-webkit-slider-thumb]:bg-[#51a133] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white 
                       [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 
                       [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#51a133] [&::-moz-range-thumb]:border-2 
                       [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md
                       ${localMin > 500 ? "z-40" : "z-20"}`} // Dynamic Z-index to avoid overlap issues
          />

          {/* Max Input */}
          <input
            type="range"
            min="0"
            max="1000"
            value={localMax}
            onInput={handleMaxInput}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            className="absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none cursor-pointer z-30
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto 
                       [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
                       [&::-webkit-slider-thumb]:bg-[#51a133] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white 
                       [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 
                       [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#51a133] [&::-moz-range-thumb]:border-2 
                       [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
          />
        </div>
      </div>
    );
  };

  const toggleSubCategory = (sub) => {
    const newSubs = selectedSubCategories.includes(sub)
      ? selectedSubCategories.filter((i) => i !== sub)
      : [...selectedSubCategories, sub];
    updateURLParams({
      subCategory: newSubs.length > 0 ? newSubs.join(",") : null,
    });
  };

  const setInStockOnly = (val) => {
    updateURLParams({ inStock: val ? "true" : null });
  };

  const setMinPrice = (val) => {
    setMinPriceState(val);
    debouncedUpdateURL({ minPrice: val > 0 ? val : null });
  };

  const setMaxPrice = (val) => {
    setMaxPriceState(val);
    debouncedUpdateURL({ maxPrice: val < 1000 ? val : null });
  };

  // Debounced URL Update with Merged Pending Params
  const timeoutRef = useRef(null);
  const pendingParamsRef = useRef({});

  const debouncedUpdateURL = (newParams) => {
    // Merge new changes into pending ref
    pendingParamsRef.current = { ...pendingParamsRef.current, ...newParams };

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setSearchParams((prev) => {
        const currentParams = Object.fromEntries(prev.entries());
        const updatedParams = { ...currentParams, ...pendingParamsRef.current };

        // Remove empty values
        Object.keys(updatedParams).forEach((key) => {
          if (
            updatedParams[key] === "" ||
            updatedParams[key] === null ||
            updatedParams[key] === undefined
          ) {
            delete updatedParams[key];
          }
        });

        // Clear pending ref after successful update
        pendingParamsRef.current = {};
        return updatedParams;
      });
    }, 400); // Slightly longer debounce for stability
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  // Filter Sidebar Component for reuse
  const SidebarFilters = ({ isMobile = false }) => (
    <div className={`flex flex-col gap-6 ${isMobile ? "p-6" : ""}`}>
      {/* Categories Card */}
      <div className="bg-white border border-gray-100 shadow-sm p-2">
        <div className="p-4 border-b-2 border-gray-100">
          <h3 className="text-[16px] font-bold text-[#191919]">Categories</h3>
        </div>
        <div className="flex flex-col">
          {categoriesData.map((cat, idx) => (
            <div key={idx} className="border-b-2 border-gray-100 last:border-0">
              <button
                onClick={() =>
                  setOpenCategory(openCategory === idx ? null : idx)
                }
                className="w-full flex items-center justify-between p-3.5 hover:bg-gray-50 transition-all text-[13px] font-medium text-gray-700"
              >
                {cat.name}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${openCategory === idx ? "rotate-180 text-primary" : "text-gray-400"}`}
                />
              </button>
              {openCategory === idx && (
                <div className="bg-gray-50 px-4 pb-3 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                  {cat.sub.map((sub, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => {
                        updateURLParams({
                          category: cat.slug,
                          subCategory: sub,
                        });
                        if (isMobile) setIsFilterOpen(false);
                      }}
                      className="text-[12px] text-left text-gray-500 hover:text-primary transition-colors pl-2 py-1"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filters Card */}
      <div className="bg-white border border-gray-100 shadow-sm p-2">
        <div className="p-4 border-b-2 border-gray-100 flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-[#191919]">Filters</h3>
          <button
            onClick={clearAllFilters}
            className="text-[11px] font-semibold hover:underline"
          >
            Clear All
          </button>
        </div>

        {/* Availability */}
        <div className="p-4 border-b-2 border-gray-100">
          <h4 className="text-[13px] font-bold text-[#191919] mb-3 uppercase tracking-wider">
            Availability
          </h4>
          <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-[13px] text-gray-600 group-hover:text-black transition-colors">
              InStock Products
            </span>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 accent-primary cursor-pointer border-gray-300 rounded"
            />
          </label>
        </div>

        {/* Sub-Categories */}
        <div className="p-4 border-b-2 border-gray-100">
          <h4 className="text-[13px] font-bold text-[#191919] mb-3 uppercase tracking-wider">
            Categories
          </h4>
          <div className="flex flex-col gap-2.5">
            {(
              categoriesData.find((c) => c.slug === categoryParam)?.sub ||
              categoriesData[0].sub
            ).map((sub, idx) => (
              <label
                key={idx}
                className="flex items-center justify-between cursor-pointer group"
              >
                <span className="text-[13px] text-gray-600 group-hover:text-black transition-colors">
                  {sub}
                </span>
                <input
                  type="checkbox"
                  checked={selectedSubCategories.includes(sub)}
                  onChange={() => toggleSubCategory(sub)}
                  className="w-4 h-4 accent-primary cursor-pointer border-gray-300 rounded"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="p-4">
          <h4 className="text-[13px] font-bold text-[#191919] mb-4 uppercase tracking-wider">
            Price
          </h4>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">
                  Min Price
                </label>
                <div className="relative">
                  <span className="absolute left-2 top-1.5 text-gray-400 text-[12px]">
                    $
                  </span>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-full border border-gray-100 rounded bg-gray-50 pl-5 pr-2 py-1.5 text-[12px] focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">
                  Max Price
                </label>
                <div className="relative">
                  <span className="absolute left-2 top-1.5 text-gray-400 text-[12px]">
                    $
                  </span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full border border-gray-100 rounded bg-gray-50 pl-5 pr-2 py-1.5 text-[12px] focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
          <PriceSlider
            min={minPrice}
            max={maxPrice}
            onUpdate={(min, max) => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
          />
        </div>
      </div>
    </div>
  );

  const suggestedTerms = [
    "Maggi",
    "Veggies",
    "Haldiram's",
    "Veenas",
    "Parle",
    "Maggi",
    "Veggies",
  ];
  const isSearchActive = !!searchTerm;

  return (
    <div className="w-full flex flex-col justify-center items-center p-6 md:p-10 min-h-screen bg-background">
      {/* Mobile Filter Drawer Overlay */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Mobile Filter Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold">Filters</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <SidebarFilters isMobile={true} />
      </div>

      <div className="w-full max-w-7xl">
        {/* Breadcrumb & Title - Show only if search is NOT active */}
        {!isSearchActive && (
          <div className=" w-full mb-6">
            <nav className="flex items-center gap-2 mb-3 text-[13px] text-gray-500">
              <Link to="/" className="hover:text-black">
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/list" className="hover:text-black">
                All Categories
              </Link>

              {categoryParam && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <Link
                    to={`/list?category=${categoryParam}`}
                    className="capitalize hover:text-black"
                  >
                    {categoryParam.replace(/-/g, " ")}
                  </Link>
                  <ChevronRight className="w-3 h-3" />
                </>
              )}
            </nav>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-main capitalize">
                {categoryParam
                  ? categoryParam.replace(/-/g, " ")
                  : "All Products"}
              </h2>
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-bold bg-white shadow-sm hover:border-primary transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
                Filters
              </button>
            </div>
          </div>
        )}

        {/* Search Results Header - Show only if search IS active */}
        {isSearchActive && (
          <div className="w-full flex flex-col items-center py-6 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold text-[#191919] mb-12">
              Search results for "{searchTerm}" ({products?.length || 0})
            </h1>

            <div className="w-full mb-10">
              <h3 className="text-[14px] font-medium text-gray-400 mb-4 text-left">
                Suggested Teams
              </h3>
              <div className="flex flex-wrap gap-2 justify-start">
                {suggestedTerms.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => updateURLParams({ q: term })}
                    className="px-5 py-1.5 border border-gray-300 rounded-full text-[13px] font-medium text-[#191919] hover:border-primary hover:text-primary transition-all bg-white"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full border-b border-gray-100 mb-8">
              <h2 className="text-[16px] font-bold text-[#191919] mb-4">
                Recent Search Products
              </h2>
            </div>
          </div>
        )}

        <div>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar Filters - Hide if search active */}
            {!isSearchActive && (
              <div className="hidden lg:block w-1/5">
                <SidebarFilters />
              </div>
            )}

            {/* Products Area */}
            <div
              className={`w-full ${isSearchActive ? "" : "lg:w-4/5"} products flex flex-col items-center`}
            >
              {/* Sorting and Filters Header - Hide if search active */}
              {!isSearchActive && (
                <div className="w-full flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-800 font-medium">
                      Showing {products ? products.length : 0} results
                      {categoryParam &&
                        ` in ${categoryParam.replace(/-/g, " ")}`}
                    </p>
                  </div>
                  <div className="relative">
                    {/* Sort Dropdown Button */}
                    <button
                      onClick={() => setDropdown(!dropdown)}
                      className="flex items-center gap-2 text-[15px] font-medium text-[#191919] hover:text-primary transition-colors"
                    >
                      Sort By {getSortLabel()}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${dropdown ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {dropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex flex-col">
                          {[
                            { id: "", label: "New In" },
                            { id: "price-low", label: "Price: Low to High" },
                            { id: "price-high", label: "Price: High to Low" },
                            { id: "sale", label: "On Sale" },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => handleSortChange(opt.id)}
                              className={`px-5 py-3.5 text-left text-[14px] hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 ${sortBy === opt.id ? "text-primary font-semibold" : "text-[#191919]"}`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Banner - Hide if search active */}
              {!isSearchActive && (
                <div className="w-full mb-8 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                  <img
                    src={banner}
                    alt="Banner"
                    className="w-full h-32 md:h-48 object-cover"
                  />
                </div>
              )}

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader />
                </div>
              ) : products && products.length > 0 ? (
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${isSearchActive ? "lg:grid-cols-5" : "lg:grid-cols-4"} gap-4 md:gap-6 animate-in fade-in duration-500 w-full`}
                >
                  {products.map((item) => (
                    <ProductCard key={item._id} item={item} />
                  ))}
                </div>
              ) : products && products.length === 0 ? (
                <div className="text-center py-20 w-full bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <div className="mb-4 text-gray-300">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-gray-500 mb-2">
                    No products found
                  </p>
                  <p className="text-gray-400 text-sm mb-6">
                    Try adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2 bg-primary text-white font-bold rounded hover:bg-primary-hover transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : null}

              {/* Load More Button / Pagination */}
              {products && products.length > 0 && (
                <div className="flex flex-col justify-center items-center my-8 md:my-12">
                  {isSearchActive ? (
                    <div className="mx-auto flex items-center gap-2">
                      <button className="p-2 border border-gray-200 rounded hover:bg-gray-50">
                        <ChevronRight className="w-4 h-4 rotate-180" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center border border-primary text-primary font-bold rounded">
                        1
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 hover:border-primary hover:text-primary rounded">
                        2
                      </button>
                      <span className="px-2 text-gray-400">...</span>
                      <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 hover:border-primary hover:text-primary rounded">
                        9
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 hover:border-primary hover:text-primary rounded">
                        10
                      </button>
                      <button className="p-2 border border-gray-200 rounded hover:bg-gray-50">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button className="bg-primary hover:bg-primary-hover py-3 px-6 text-white font-bold rounded-sm">
                      Load More
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
