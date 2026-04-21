import React, { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { useFetch } from "../hooks/useFetch";
import { API_ENDPOINTS } from "../utils/constant";
import { Loader } from "../components/Loader";

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { loading, callApi } = useFetch();

  const fetchFeaturedProducts = async () => {
    try {
      const res = await callApi({
        endpoint: API_ENDPOINTS.PRODUCT,
      });

      if (res.success) {
        setFeaturedProducts(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch featured products:", error);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  if (loading && featuredProducts.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex justify-center items-start p-10">
        <div className="w-11/12 max-w-7xl">
          <h1 className="text-3xl font-bold text-text-main mb-6">
            Featured Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((item, i) => (
              <React.Fragment key={i}>
                <ProductCard item={item} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
