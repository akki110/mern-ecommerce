import React, { useRef, useState, useEffect, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ProductCarousel = ({ title, data, rows = 1 }) => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Chunk data for multi-row slides
  const slides = useMemo(() => {
    if (rows === 1) return [data];

    const itemsPerSlide = rows * 5; // 10 items for 2 rows
    const chunks = [];
    for (let i = 0; i < data.length; i += itemsPerSlide) {
      chunks.push(data.slice(i, i + itemsPerSlide));
    }
    return chunks;
  }, [data, rows]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const scrollAmount = clientWidth;
      let scrollTo;

      if (direction === "left") {
        if (scrollLeft <= 0) {
          scrollTo = scrollWidth - clientWidth;
        } else {
          scrollTo = scrollLeft - scrollAmount;
        }
      } else {
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollTo = 0;
        } else {
          scrollTo = scrollLeft + scrollAmount;
        }
      }

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (isPaused || !data || data.length === 0) return;

    const interval = setInterval(() => {
      scroll("right");
    }, 5000);

    return () => clearInterval(interval);
  }, [data, isPaused]);

  if (!data || data.length === 0) return null;

  return (
    <div
      className="w-full relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between mb-8">
        {title && (
          <h2 className="text-xl md:text-2xl font-bold text-[#191919]">
            {title}
          </h2>
        )}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-green-600"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-green-600"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
      >
        {rows === 1
          ? // Single row behavior (standard)
            data.map((item) => (
              <div
                key={item._id}
                className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2.5 snap-start"
              >
                <ProductCard item={item} />
              </div>
            ))
          : // Multi-row behavior (Chunked into slides of 10)
            slides.map((slideItems, slideIdx) => {
              const reorderedItems = [];
              for (let i = 0; i < 5; i++) {
                if (slideItems[i * 2]) reorderedItems[i] = slideItems[i * 2];
                if (slideItems[i * 2 + 1])
                  reorderedItems[i + 5] = slideItems[i * 2 + 1];
              }

              return (
                <div
                  key={slideIdx}
                  className="flex-none w-full snap-start px-2.5"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-rows-2 gap-5 py-2">
                    {reorderedItems.map((item, idx) => (
                      <div key={item?._id || idx} className="w-full">
                        {item ? (
                          <ProductCard item={item} />
                        ) : (
                          <div className="h-full" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default ProductCarousel;
