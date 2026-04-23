import React, { useState, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { useFetch } from "../hooks/useFetch";
import { API_ENDPOINTS } from "../utils/constant";
import { Loader } from "../components/Loader";

import { useSearchParams } from "react-router-dom";

export const Listing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const sortParam = searchParams.get("sort") || "";
  
  const [sortBy, setSortBy] = useState(sortParam);
  const [products, setProducts] = useState(null);

  const { loading, callApi } = useFetch();

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
    <div className="w-full flex justify-center items-start p-10 min-h-screen bg-background">
      <div className="w-11/12 max-w-7xl">
        <h2 className="text-3xl font-bold text-text-main mb-6">
          <span className="text-primary">All</span> Products
        </h2>

        {/* Sorting and Filters Header */}
        <div className="w-full flex items-center justify-between mb-8 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <p className="text-sm text-text-muted">
              {products ? products.length : 0} items found
              {category && ` in ${category.replace(/-/g, " ")}`}
            </p>
          </div>
          <div className="w-full md:w-1/4">
            <select
              className="w-full px-5 py-3.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary transition-all shadow-sm text-text-main font-medium cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By (Default)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="oldest">Oldest First</option>
              <option value="sale">On Sale</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-in fade-in duration-500">
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
    </div>
  );
};
