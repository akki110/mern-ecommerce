import React from "react";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
