import React from "react";
import { Link } from "react-router-dom";

export const PromoBanners = () => {
  return (
    <section className="w-full flex justify-center items-center px-5 md:px-10 py-10">
      <div className="w-full lg:w-11/12 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Banner 1: Spicy Foods */}
        <div
          className="relative h-[250px] md:h-[350px] overflow-hidden bg-[#FEF9E7] flex items-center group cursor-pointer "
          style={{
            backgroundImage: `url('/spicy_banner.jpg')`,
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="relative z-10 px-8 md:px-12 w-full md:w-3/4">
            <span className="text-primary font-bold text-[13px] md:text-sm mb-2 block tracking-tight uppercase">
              Spicy Foods
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-1 leading-tight">
              Save 35% OFF
            </h2>
            <p className="text-gray-600 text-[13px] md:text-sm mb-6 font-medium">
              Available at best prices
            </p>
            <Link
              to="/listing?category=spices"
              className="py-2 px-10 w-fit text-[15px] font-semibold text-white bg-[#FDBE44] hover:bg-[#e9ad3d] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Banner 2: Natural Beauty */}
        <div
          className="relative h-[250px] md:h-[350px] overflow-hidden bg-[#E9F7EF] flex items-center group cursor-pointer "
          style={{
            backgroundImage: `url('/beauty_banner.jpg')`,
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="relative z-10 px-8 md:px-12 w-full md:w-3/4">
            <span className="text-primary font-bold text-[13px] md:text-sm mb-2 block tracking-tight uppercase">
              Natural Beauty
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold mb-1 leading-tight">
              Save 25% OFF
            </h2>
            <p className="text-gray-600 text-[13px] md:text-sm mb-6 font-medium">
              Available at best prices
            </p>
            <Link
              to="/listing?category=beauty"
              className="py-2 px-10 w-fit text-[15px] font-semibold text-white bg-primary hover:bg-primary-hover transition-all duration-300 flex items-center justify-center gap-2"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Banner 3: Full Width Garlic Sale */}
        <div
          className="relative h-[220px] md:h-[350px] overflow-hidden bg-[#F2F2F2] flex items-center lg:col-span-2 group cursor-pointer "
          style={{
            backgroundImage: `url('/garlic_banner.jpg')`,
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="relative z-10 px-8 md:px-12 w-full md:w-1/2">
            <span className="text-primary font-bold text-[13px] md:text-sm mb-2 block tracking-tight uppercase">
              Black Fridays! offer
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 uppercase leading-none">
              Sale 50% OFF
            </h2>
            <p className="text-gray-600 text-[14px] md:text-[15px] mb-8 font-semibold">
              Available at best prices
            </p>
            <Link
              to="/listing?isSale=true"
              className="py-2 px-10 w-fit text-[15px] font-semibold text-white bg-primary hover:bg-primary-hover transition-all duration-300 flex items-center justify-center gap-2"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
