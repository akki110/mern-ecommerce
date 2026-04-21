import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Loader } from "./components/Loader";

// Lazy loading pages
const Home = lazy(() => import("./pages/Home").then(m => ({ default: m.Home })));
const Listing = lazy(() => import("./pages/Listing").then(m => ({ default: m.Listing })));
const ProductDetails = lazy(() => import("./pages/ProductDetails").then(m => ({ default: m.ProductDetails })));
const Cart = lazy(() => import("./pages/Cart").then(m => ({ default: m.Cart })));
const MyOrders = lazy(() => import("./pages/MyOrders").then(m => ({ default: m.MyOrders })));
const Login = lazy(() => import("./pages/Login").then(m => ({ default: m.Login })));
const Signup = lazy(() => import("./pages/Signup").then(m => ({ default: m.Signup })));

export default function App() {
  return (
    <>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<Listing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Route>
      </Routes>
    </Suspense>
    </>
  );
}
