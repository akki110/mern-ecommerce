import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import visa from "../../public/visa.svg";
import mastercard from "../../public/mastercard.svg";
import amex from "../../public/amex.svg";
import applepay from "../../public/apple-pay.svg";

export const Footer = () => {
  const information = [
    { title: "Store Location", link: "#" },
    { title: "Term & Conditions", link: "#" },
    { title: "Sitemap", link: "#" },
    { title: "Contact Us", link: "#" },
    { title: "Refunds & Returns", link: "#" },
  ];

  const aboutus = [
    { title: "Our Story", link: "#" },
    { title: "General Enquiries", link: "#" },
    { title: "Contact Us", link: "#" },
    { title: "FAQs", link: "#" },
    { title: "Terms & Conditions", link: "#" },
  ];

  const shop = [
    { title: "All Products", link: "/list" },
    { title: "Special Offers", link: "#" },
    { title: "Brands", link: "#" },
    { title: "Grocery", link: "#" },
    { title: "Daily Needs", link: "#" },
  ];

  const cards = [
    { img: visa, alt: "Visa" },
    { img: mastercard, alt: "Mastercard" },
    { img: applepay, alt: "Apple Pay" },
    { img: amex, alt: "Amex" },
  ];

  return (
    <footer className="w-full bg-[#F8F9FB] pt-20 pb-8 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Information Section */}
          <div className=" flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[#191919] uppercase tracking-wider">
              Information
            </h3>
            <ul className="flex flex-col gap-2">
              {information.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="text-[15px] text-[#4A4A4A] hover:text-[#191919] transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[#191919] uppercase tracking-wider">
              About us
            </h3>
            <ul className="flex flex-col gap-2">
              {aboutus.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="text-[15px] text-[#4A4A4A] hover:text-[#191919] transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[#191919] uppercase tracking-wider">
              Shop
            </h3>
            <ul className="flex flex-col gap-2">
              {shop.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="text-[15px] text-[#4A4A4A] hover:text-[#191919] transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-[#191919] uppercase tracking-wider">
                Newslatter
              </h3>
              <p className="text-sm text-[#4A4A4A]">
                Register now to get updates on promotions & coupons
              </p>
            </div>

            <div className="relative flex items-center w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white border border-gray-300 rounded-full py-3.5 pl-5 pr-32 text-sm text-[#191919] focus:outline-none focus:border-black transition-all"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-[#121212] text-white text-sm font-medium px-8 rounded-full hover:bg-black transition-all">
                Subscribe
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-5 pt-2">
              <a
                href="#"
                className="text-[#191919] hover:text-[#000] transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#191919] hover:text-[#000] transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#191919] hover:text-[#000] transition-colors"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#191919] hover:text-[#000] transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Payments */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <p className="text-[15px] font-bold text-[#191919]">Epic Grocery</p>
            <p className="text-[15px] text-[#4A4A4A]">
              2021. All Rights Reserved
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <p className="text-xs text-[#4A4A4A] uppercase tracking-tight">
              We Use Secure Payment Processing Methods
            </p>
            <div className="flex items-center gap-4">
              {cards.map((card, index) => (
                <img
                  src={card.img}
                  alt={card.alt}
                  className="h-7 object-contain grayscale-[0.5] hover:grayscale-0 transition-all"
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
