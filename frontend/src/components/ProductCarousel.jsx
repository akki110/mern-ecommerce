import React, { useRef } from "react";
import { ProductCard } from "./ProductCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ProductCarousel = ({ title, data }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Calculate one item width (roughly 20% of container on large screens)
      const itemWidth = clientWidth / 5;
      const scrollTo =
        direction === "left" ? scrollLeft - itemWidth : scrollLeft + itemWidth;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  if (!data || data.length === 0) return null;

  return (
    <div className="w-full ">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#191919]">
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {data.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          >
            <ProductCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
