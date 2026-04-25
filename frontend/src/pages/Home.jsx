import React, { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { API_ENDPOINTS } from "../utils/constant";
import { Loader } from "../components/Loader";
import { Slider } from "../components/home/Slider";
import { Category } from "../components/home/Category";
import { Cards } from "../components/Cards";
import img1 from "../../public/bg1.jpg";
import img2 from "../../public/bg2.jpg";
import ProductCarousel from "../components/ProductCarousel";
import { HomeCards } from "../components/home/HomeCards";
import { ServiceCard } from "../components/home/ServiceCard";
import { PromoBanners } from "../components/home/PromoBanners";
import { Features } from "../components/home/Features";
import boy from "../../public/delivery-boy.png";

export const Home = () => {
  const [topsellingProducts, setTopSellingProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const { loading, callApi } = useFetch();

  // Cards
  const sectionthreecards = [
    {
      title: "Summer Offer 20% Off",
      description: "Fresh Fruits Big Sale",
      btntitle: "Shop Now",
      btnlink: "/list",
      image: img1,
    },
    {
      title: "Fresh Farm Products 40% Off",
      description: "Vegetable Big Sale",
      btntitle: "Shop Now",
      btnlink: "/list",
      image: img2,
    },
  ];

  const fetchTopSellingProducts = async () => {
    try {
      const res = await callApi({
        endpoint: `${API_ENDPOINTS.PRODUCT}?isSale=true`,
      });

      if (res.success) {
        setTopSellingProducts(res.data);
      }
    } catch (error) {}
  };

  const fetchFeaturedProducts = async () => {
    try {
      const res = await callApi({
        endpoint: API_ENDPOINTS.PRODUCT,
      });

      if (res.success) {
        setFeaturedProducts(res.data);
      }
    } catch (error) {}
  };

  const fetchRecentProducts = async () => {
    try {
      const res = await callApi({
        endpoint: `${API_ENDPOINTS.PRODUCT}?new=true`,
      });

      if (res.success) {
        setRecentProducts(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchFeaturedProducts();
    fetchTopSellingProducts();
    fetchRecentProducts();
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
      <Slider />
      <Category />
      {/* Section 3 */}
      <div className="flex justify-center items-center w-full px-5 md:px-10">
        <div className="w-full md:w-11/12 flex flex-col md:flex-row justify-center items-center gap-8">
          {sectionthreecards.map((data, i) => (
            <div className="w-full" key={i}>
              <Cards {...data} />
            </div>
          ))}
        </div>
      </div>
      {/* Top Selling Products */}
      <div className="w-full flex justify-center items-start px-5 md:px-10 py-10 md:py-15">
        <div className="w-full md:w-11/12">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-text-main mb-1">
              Top Selling Items
            </h2>
            <p className="text-gray-500 text-sm">Available at best prices</p>
          </div>

          <div className="">
            <ProductCarousel title={null} data={topsellingProducts} />
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="w-full flex justify-center items-start px-5 md:px-10 py-10 md:py-15">
        <div className="w-full md:w-11/12">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-text-main mb-1">
              Featured Products
            </h2>
            <p className="text-gray-500 text-sm">Available at best prices</p>
          </div>

          <div className="">
            <ProductCarousel title={null} data={featuredProducts} />
          </div>
        </div>
      </div>

      {/* Home Cards */}
      <HomeCards />

      {/* Deals of the week */}
      <div className="w-full flex justify-center items-start px-5 md:px-10 py-10 md:py-15">
        <div className="w-full md:w-11/12">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-text-main mb-1">
              Deals of the week
            </h2>
            <p className="text-gray-500 text-sm">Recently added our store</p>
          </div>

          <div className="">
            <ProductCarousel title={null} data={recentProducts} rows={2} />
          </div>
        </div>
      </div>

      {/* Service Provide */}
      <ServiceCard />

      <PromoBanners />

      <Features />

      <div className="w-full h-44">
        <img className="w-full h-full" src={boy} alt="delivery-boy" />
      </div>
    </>
  );
};
