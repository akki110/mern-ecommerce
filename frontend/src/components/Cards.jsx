import React from "react";
import { Link } from "react-router-dom";

export const Cards = ({ image, title, description, btntitle, btnlink }) => {
  return (
    <div
      className="w-full h-[300px]  bg-center bg-cover"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="w-full h-full flex flex-col justify-center items-start px-5 md:px-10s">
        <p className="text-md font-semibold text-primary mb-2">{title}</p>
        <p className="text-gray-800 text-2xl font-bold max-w-[70%] mb-4">
          {description}
        </p>
        <Link
          to={btnlink}
          className="bg-primary transition-all hover:bg-primary-hover text-white px-10 py-2.5"
        >
          {btntitle}
        </Link>
      </div>
    </div>
  );
};
