import React from "react";
import { Link } from "react-router-dom";
import staplesImg from "../../../public/staples.png";
import sweetsImg from "../../../public/sweets.png";
import dairyImg from "../../../public/dairy.png";

export const HomeCards = () => {
  const cards = [
    {
      title: "Your Daily Staples",
      description: "Authentic Masalas for the Authentic Taste",
      bg: "bg-[#E3EDFB]",
      image: staplesImg,
      link: "/listing?category=staples",
    },
    {
      title: "Desserts & Sweets",
      description: "Authentic Masalas for the Authentic Taste",
      bg: "bg-[#E2F2E2]",
      image: sweetsImg,
      link: "/listing?category=dairy-and-bakery",
    },
    {
      title: "Dairy Products",
      description: "Authentic Masalas for the Authentic Taste",
      bg: "bg-[#FFF2D9]",
      image: dairyImg,
      link: "/listing?category=dairy-and-bakery",
    },
  ];

  return (
    <section className="w-full flex justify-center items-center px-5 md:px-10 py-15">
      <div className="w-full lg:w-11/12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {cards.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} rounded-md p-8 flex flex-col items-center justify-center text-center`}
          >
            {/* Image Container */}
            <div className="h-40 w-full flex items-center justify-center mb-6 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="max-h-full object-contain transform transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-[#191919] mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm mb-8 max-w-[220px] leading-relaxed">
              {item.description}
            </p>

            {/* Action Button */}
            <Link
              to={item.link}
              className="py-2 px-10 border text-[15px] font-bold text-[#191919] bg-white hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              Shop Now
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
