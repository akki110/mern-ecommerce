import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full bg-surface border-t border-border py-12 flex justify-center items-center">
      <div className="w-11/12 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link
            to="/"
            className="text-xl font-bold text-primary tracking-tight"
          >
            Elevate<span className="text-text-main">Shop</span>
          </Link>
          <p className="text-sm text-text-muted">
            Premium goods for your modern lifestyle.
          </p>
        </div>

        <div>
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} ElevateShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
