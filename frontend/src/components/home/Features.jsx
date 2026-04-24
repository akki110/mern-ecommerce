import { Headphones, Package, ThumbsUp, Truck } from "lucide-react";
import React from "react";

export const Features = () => {
  const features = [
    {
      icon: (
        <Truck
          className="w-8 md:w-12 h-8 md:h-12 text-slate-700"
          strokeWidth={1}
        />
      ),
      title: "Free Delivery",
      subtitle: "When you spend over £60!",
    },
    {
      icon: (
        <Package
          className="w-8 md:w-12 h-8 md:h-12 text-slate-700"
          strokeWidth={1}
        />
      ),
      title: "Shipping Info",
      subtitle: "Fast Service",
    },
    {
      icon: (
        <ThumbsUp
          className="w-8 md:w-12 h-8 md:h-12 text-slate-700"
          strokeWidth={1}
        />
      ),
      title: "Loyalty Scheme",
      subtitle: "Earn Points With an Account",
    },
    {
      icon: (
        <Headphones
          className="w-8 md:w-12 h-8 md:h-12 text-slate-700"
          strokeWidth={1}
        />
      ),
      title: "Contact Us",
      subtitle: "Here to Help",
    },
  ];

  return (
    <section className="w-full flex justify-center items-center px-5 md:px-10 py-16 bg-white border-t border-gray-100">
      <div className="w-full lg:w-11/12 flex flex-col items-center gap-12">
        <h2 className="text-2xl font-bold tracking-tight">Why Shop With Us?</h2>

        <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center justify-center lg:justify-start gap-4 group cursor-pointer"
            >
              <div className="">{feature.icon}</div>
              <div className="flex flex-col">
                <h3 className="text-md md:text-xl font-semibold leading-tight mb-0.5">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-[9px] md:text-[12px] font-medium">
                  {feature.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
