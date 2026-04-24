import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { API_ENDPOINTS } from "../../utils/constant";

export const Category = () => {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const { callApi } = useFetch();

  // Static data mapping for emojis and display labels
  const categoryDataMap = {
    "fruits-and-vegetables": {
      label: "Fresh Vegetables",
      emoji: "🥦",
      isNew: false,
    },
    staples: { label: "Pure Rice", emoji: "🍚", isNew: false },
    "dairy-and-bakery": { label: "Groceries", emoji: "🛍️", isNew: false },
    "home-and-kitchen": {
      label: "Flours, Grains & Atta",
      emoji: "🌾",
      isNew: true,
    },
    "snacks-and-branded-foods": {
      label: "Dry Fruits & Nuts",
      emoji: "🥜",
      isNew: false,
    },
    beverages: { label: "Healthy Snacks", emoji: "🍿", isNew: false },
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await callApi({
          endpoint: API_ENDPOINTS.PRODUCT,
        });

        if (res.success) {
          // Extract unique categories from product data
          const uniqueCategories = [
            ...new Set(res.data.map((p) => p.category)),
          ];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2; // Scroll by half screen for better control
      const scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  if (!categories.length) return null;

  return (
    <section className="py-8 md:py-16 overflow-hidden">
      <div className="w-full md:w-11/12 mx-auto px-6 relative">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-0">
          <div className="flex-1 text-center">
            <h2 className="text-3xl font-bold text-[#191919] tracking-tight">
              Popular Categories
            </h2>
          </div>
          <div className="flex absolute right-6 top-1">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-green-600"
              aria-label="Previous categories"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-green-600"
              aria-label="Next categories"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Categories Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-6"
        >
          {categories.map((catKey) => {
            const data = categoryDataMap[catKey] || {
              label: catKey.replace(/-/g, " "),
              emoji: "📦",
              isNew: false,
            };

            return (
              <Link
                key={catKey}
                to={`/listing?category=${catKey}`}
                className="flex-none w-[200px] sm:w-[220px] group snap-start py-10"
              >
                <div className="relative h-[140px] bg-white border border-gray-200 rounded-sm flex flex-col items-center justify-center transition-all duration-500  group-hover:-translate-y-2">
                  {/* "New" Badge */}
                  {data.isNew && (
                    <div className="absolute top-4 right-4 z-10 bg-[#E7F7F0] text-[#00B67A] text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      New
                    </div>
                  )}

                  {/* Icon/Emoji */}
                  <div className="text-6xl mb-5 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {data.emoji}
                  </div>

                  {/* Label */}
                  <h3 className="text-[16px] font-semibold text-[#191919] text-center px-4 line-clamp-1 group-hover:text-green-600 transition-colors">
                    {data.label}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
