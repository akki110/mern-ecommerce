// import React from "react";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";
// import { ProductCard } from "../components/ProductCard";

// export const Listing = () => {
//   const products = [
//     {
//       id: 1,
//       name: "Minimalist Leather Watch",
//       description: "A sleek, minimalist watch with a genuine leather strap.",
//       category: "Accessories",
//       price: 120.0,
//       image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop",
//     },
//     {
//       id: 2,
//       name: "Noise Cancelling Headphones",
//       description: "Premium sound quality with active noise cancellation.",
//       category: "Electronics",
//       price: 250.0,
//       image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop",
//     },
//   ];

//   return (
//     <>
//       <div className="w-full flex justify-center items-start p-10">
//         <div className="w-11/12 max-w-7xl">
//           <h2 className="text-3xl font-bold text-text-main mb-6">
//             All Products
//           </h2>
//           {/* Search and Sorting */}
//           <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 mb-5">
//             <div className="w-full md:w-5/6">
//               <input
//                 type="text"
//                 className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
//                 placeholder="Search"
//                 value={"search by category and name"}
//               />
//             </div>
//             <div className="w-full md:w-1/6">
//               <select
//                 name=""
//                 id=""
//                 className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
//               >
//                 <option value="">Sort By</option>
//                 <option value="">Price: Low to High</option>
//                 <option value="">Price: High to Low</option>
//                 <option value="">Newest First</option>
//                 <option value="">Sale</option>
//               </select>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((item, i) => (
//               <ProductCard key={item.id} item={item} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

import React, { useState, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { useFetch } from "../hooks/useFetch";
import { API_ENDPOINTS } from "../utils/constant";
import { Loader } from "../components/Loader";

export const Listing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [products, setProducts] = useState(null);

  const { loading, callApi } = useFetch();

  // Fetch products with search and sorting
  const fetchProducts = async (search = "", sort = "") => {
    try {
      let params = new URLSearchParams();
      if (search) params.append("q", search);

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

  // Combined useEffect for Search and Sort
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts(searchTerm, sortBy);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, sortBy]);

  return (
    <div className="w-full flex justify-center items-start p-10 min-h-screen bg-background">
      <div className="w-11/12 max-w-7xl">
        <h2 className="text-3xl font-bold text-text-main mb-6">All Products</h2>

        {/* Search and Sorting */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="w-full md:w-3/4">
            <input
              type="text"
              className="w-full px-5 py-3.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary transition-all shadow-sm text-text-main placeholder:text-text-muted/50"
              placeholder="Search by category or product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
