import React, { useRef } from "react";
import { ProductCard } from "./ProductCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ProductCarousel = ({ title, data }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const scrollAmount = clientWidth + 20;
      let scrollTo;

      if (direction === "left") {
        // If at the very start, wrap to the end
        if (scrollLeft <= 0) {
          scrollTo = scrollWidth - clientWidth;
        } else {
          scrollTo = scrollLeft - scrollAmount;
        }
      } else {
        // If at the very end (with a small buffer), wrap to the start
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

  const [isPaused, setIsPaused] = React.useState(false);

  // Auto-run in infinite loop every 5 seconds
  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      scroll("right");
    }, 5000);

    return () => clearInterval(interval);
  }, [data, isPaused]);

  if (!data || data.length === 0) return null;

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#191919]">
          {title}
        </h2>
        <div className="flex gap-2">
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
        className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
      >
        {data.map((item) => (
          <div
            key={item._id}
            className="flex-none w-full sm:w-[calc((100%-20px)/2)] md:w-[calc((100%-60px)/3)] lg:w-[calc((100%-80px)/4)] xl:w-[calc((100%-100px)/5)] snap-start"
          >
            <ProductCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
