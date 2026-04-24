import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import bg1 from "../../../public/bg1.jpg";
import bg2 from "../../../public/bg2.jpg";
import bg3 from "../../../public/bg3.jpg";

export const Slider = () => {
  const sliderdata = [
    {
      title: "Amazing Grocery deals",
      subtitle: "Save upto 30%",
      desc: "10% certifled oranic mi x of fruit and veies. Perfect for weekly cookin and snacking!",
      btntitle: "Shop Now",
      btnlink: "/list",
      bgimg: bg1,
    },
    {
      title: "Amazing Grocery deals",
      subtitle: "Save upto 30%",
      desc: "10% certifled oranic mi x of fruit and veies. Perfect for weekly cookin and snacking!",
      btntitle: "Shop Now",
      btnlink: "/list",
      bgimg: bg2,
    },
    {
      title: "Amazing Grocery deals",
      subtitle: "Save upto 30%",
      desc: "10% certifled oranic mi x of fruit and veies. Perfect for weekly cookin and snacking!",
      btntitle: "Shop Now",
      btnlink: "/list",
      bgimg: bg3,
    },
  ];

  return (
    <div>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mySwiper h-[500px]"
      >
        {sliderdata.map((item, i) => (
          <SwiperSlide
            key={i}
            style={{ backgroundImage: `url(${item.bgimg})` }}
            className="w-full h-[500px] bg-center bg-cover"
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-10/12 flex justify-between items-center">
                <div>
                  <p className="text-primary font-semibold uppercase">
                    {item.subtitle}
                  </p>
                  <h1 className="text-4xl md:text-6xl max-w-[65%] leading-[40px] md:leading-[60px] tracking-wider font-bold text-text-main mb-6">
                    {item.title}
                  </h1>
                  <p className="text-gray-800 text-md max-w-[70%] mb-4">
                    {item.desc}
                  </p>
                  <button className="bg-primary text-white px-10 py-2.5">
                    {item.btntitle}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
