import React, { useState, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { useFetch } from "../hooks/useFetch";
import { API_ENDPOINTS } from "../utils/constant";
import { Loader } from "../components/Loader";
import { ChevronDown } from "lucide-react";
import banner from "../../public/banner.png";

import { useSearchParams } from "react-router-dom";

export const Listing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const sortParam = searchParams.get("sort") || "";

  const [sortBy, setSortBy] = useState(sortParam);
  const [products, setProducts] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  const { loading, callApi } = useFetch();

  // sort dropdown
  const handleSortChange = (value) => {
    setSortBy(value);
    setDropdown(false);
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

  // Fetch products with search, category and sorting
  const fetchProducts = async (search = "", cat = "", sort = "") => {
    try {
      let params = new URLSearchParams();
      if (search) params.append("q", search);
      if (cat) params.append("category", cat);

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

  // Trigger fetch on Search, Category or Sort change
  useEffect(() => {
    fetchProducts(searchTerm, category, sortBy);
  }, [searchTerm, category, sortBy]);

  return (
    <div className="w-full flex flex-col justify-center items-center p-10 min-h-screen bg-background">
      <div className="w-11/12 max-w-7xl">
        <h2 className="text-3xl font-bold text-text-main mb-6">
          <span className="text-primary">All</span> Products
        </h2>

        {/* Sorting and Filters Header */}
        <div className="w-full flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-800 font-medium">
              showing {products ? products.length : 0} of{" "}
              {products ? products.length : 0} results
              {category && ` in ${category.replace(/-/g, " ")}`}
            </p>
          </div>
          <div className="relative">
            {/* Sort Dropdown Button */}
            <button
              onClick={() => setDropdown(!dropdown)}
              className="flex items-center gap-2 text-[15px] font-medium text-[#191919] hover:text-primary transition-colors"
            >
              Sort By
              <ChevronDown
                className={`w-4 h-4 transition-transform ${dropdown ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex flex-col">
                  <button
                    onClick={() => handleSortChange("")}
                    className={`px-5 py-3.5 text-left text-[14px] hover:bg-gray-50 transition-colors border-b border-gray-200 ${sortBy === "" ? "text-primary font-semibold" : "text-[#191919]"}`}
                  >
                    New In
                  </button>
                  <button
                    onClick={() => handleSortChange("price-low")}
                    className={`px-5 py-3.5 text-left text-[14px] hover:bg-gray-50 transition-colors border-b border-gray-200 ${sortBy === "price-low" ? "text-primary font-semibold" : "text-[#191919]"}`}
                  >
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => handleSortChange("price-high")}
                    className={`px-5 py-3.5 text-left text-[14px] hover:bg-gray-50 transition-colors border-b border-gray-200 ${sortBy === "price-high" ? "text-primary font-semibold" : "text-[#191919]"}`}
                  >
                    Price: High to Low
                  </button>
                  <button
                    onClick={() => handleSortChange("sale")}
                    className={`px-5 py-3.5 text-left text-[14px] hover:bg-gray-50 transition-colors ${sortBy === "sale" ? "text-primary font-semibold" : "text-[#191919]"}`}
                  >
                    Sale
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Banner */}
        <div className="w-full mb-8">
          <img
            src={banner}
            alt="Banner"
            className="w-full h-48 object-cover border border-gray-100"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
            {products.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        ) : products && products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-text-muted">
              No products found matching your criteria.
            </p>
          </div>
        ) : null}
      </div>

      {/* Load More Button */}
      <div className="mx-auto my-8 md:my-12">
        <button className="bg-primary text-white hover:bg-primary-hover py-3 px-8 font-semibold tracking-wider rounded-sm">
          Load More
        </button>
      </div>
    </div>
  );
};
