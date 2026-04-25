import { BadgeCheck, Gift, MessageCircle, Package } from "lucide-react";
import React from "react";
import delivery from "../../../public/delivery.png";

export const ServiceCard = () => {
  return (
    <div className="w-full flex justify-center items-start px-5 lg:px-10 py-10 lg:py-15 bg-primary/10">
      <div className="w-full lg:w-11/12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left */}
        <div className="flex flex-col items-start justify-center gap-5">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
            We are at <span className="text-primary">your service</span>
          </h2>
          <p className="text-gray-600 text-md">
            A came with the passion to offer ethnic, hih uality Indian and
            Enlish rocery items at competitive prices, which will not only make
            you want to buy from us but also stay with us as a reular customer.
          </p>
          <div className="w-full flex justify-center items-center gap-10 lg:gap-16 mt-8">
            <div className="flex flex-col justify-center items-center">
              <Package strokeWidth={1} className="w-15 h-15 text-primary" />
              <p>10,000+ Products</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <BadgeCheck strokeWidth={1} className="w-15 h-15 text-primary" />
              <p>3000+ Brands</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <MessageCircle
                strokeWidth={1}
                className="w-15 h-15 text-primary"
              />
              <p>24*7 Online Support</p>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="w-full h-[300px] md:h-[500px]">
          <img src={delivery} alt="Delivert" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};
