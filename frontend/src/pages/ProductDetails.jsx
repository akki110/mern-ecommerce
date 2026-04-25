import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Truck,
  ChevronRight,
  MapPin,
  Check,
  Percent,
  Star,
  ChevronLeft,
} from "lucide-react";
import { useCartData } from "../context/CartContext";
import { useFetch } from "../hooks/useFetch";
import { API_ENDPOINTS, BASE_URL } from "../utils/constant";
import { Loader } from "../components/Loader";
import ProductCarousel from "../components/ProductCarousel";
import visa from "../../public/visa.svg";
import mastercard from "../../public/mastercard.svg";

export const ProductDetails = () => {
  const { id } = useParams();
  const { cartItems, addToCart, updateQuantity, removeFromCart } =
    useCartData();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [pincode, setPincode] = useState("400020");
  const [similarProducts, setSimilarProducts] = useState([]);

  const { loading, callApi } = useFetch();

  // Find if this product is already in the cart
  const cartItem = cartItems.find((ci) => (ci._id || ci.id) === id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await callApi({
          endpoint: `${API_ENDPOINTS.PRODUCT}/${id}`,
        });
        if (res.success) {
          setProduct(res.data);
          setSelectedImage(0);
        }
      } catch (error) {}
    };
    if (id) {
      fetchProductData();
    }
  }, [id, callApi]);

  useEffect(() => {
    if (product?.category) {
      const fetchSimilar = async () => {
        try {
          const res = await callApi({
            endpoint: `${API_ENDPOINTS.PRODUCT}`,
          });
          if (res.success) {
            setSimilarProducts(res.data.filter((p) => p._id !== id));
          }
        } catch (error) {}
      };
      fetchSimilar();
    }
  }, [product, id, callApi]);

  const handleIncrement = () => {
    if (product) {
      if (cartQuantity === 0) {
        addToCart(product, 1);
      } else {
        updateQuantity(product._id, cartQuantity + 1);
      }
    }
  };

  const handleDecrement = () => {
    if (product && cartQuantity > 0) {
      if (cartQuantity === 1) {
        removeFromCart(product._id);
      } else {
        updateQuantity(product._id, cartQuantity - 1);
      }
    }
  };

  if (loading && !product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-gray-500 font-medium">Product not found.</p>
        <Link to="/list" className="text-[#00B67A] font-bold hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-10 text-[13px] text-gray-500">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            to={`/list?category=${product.category}`}
            className="capitalize hover:text-black"
          >
            {product.category.replace(/-/g, " ")}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black font-medium">{product.name}</span>
        </nav>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Image Gallery */}
          <div className="w-full flex  flex-col lg:flex-row gap-5">
            {/* Thumbnails */}
            <div className="order-2 lg:order-1 w-full lg:w-20">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 border rounded-sm p-2 mb-0 lg:mb-2 mr-2 lg:mr-0 overflow-hidden transition-all bg-white ${
                    selectedImage === idx
                      ? "border-[#00B67A] ring-1 ring-[#00B67A]"
                      : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={`${BASE_URL}/upload/${img}`}
                    alt={`${product.name} ${idx}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="order-1 lg:order-2 w-full h-full  rounded-sm flex justify-center items-center">
              <img
                src={`${BASE_URL}/upload/${productImages[selectedImage]}`}
                alt={product.name}
                className="w-full lg:w-[90%] h-full object-contain border border-gray-400 rounded-sm"
              />
              {product.isSale && (
                <div className="absolute top-6 right-6 w-14 h-14 bg-[#00B67A] rounded-full flex flex-col items-center justify-center text-white shadow-lg z-10">
                  <span className="text-sm font-bold">20%</span>
                  <span className="text-[10px] font-medium">off</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full">
            <div className="mb-0">
              <h1 className="text-2xl md:text-3xl font-semibold text-[#191919] leading-tight mb-2">
                {product.brand && (
                  <span className="text-gray-400 font-normal mr-2">
                    {product.brand}
                  </span>
                )}
                {product.name}
              </h1>
              {product.weight && (
                <p className="text-gray-500 font-medium text-lg">
                  ({product.weight})
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-lg font-semibold text-[#191919]">
                ${product.price}
              </span>
              {product.isSale && (
                <span className="text-[13px] text-gray-600">
                  You Save: <span>20%(Inclusive of all taxes)</span>
                </span>
              )}
            </div>

            <p className="text-green-500 text-sm font-normal mb-4 flex items-center gap-2">
              In Stock
            </p>

            <div className="mb-4">
              <span className="text-[14px] font-semibold text-[#191919] block mb-2">
                Inaugural Offer Free Shipping
              </span>
              <div className="flex gap-3">
                <img src={visa} alt="Visa" className="h-8" />
                <img src={mastercard} alt="Mastercard" className="h-8" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mb-6">
              {cartQuantity > 0 ? (
                <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden h-13 w-full max-w-[200px]">
                  <button
                    onClick={handleDecrement}
                    className="flex-1 h-full flex items-center justify-center bg-white hover:bg-gray-50 text-[#191919] transition-colors"
                  >
                    <span className="text-xl font-bold">−</span>
                  </button>
                  <span className="flex-1 text-center font-bold text-lg text-[#191919]">
                    {cartQuantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="flex-1 h-full flex items-center justify-center bg-white hover:bg-gray-50 text-[#191919] transition-colors"
                  >
                    <span className="text-xl font-bold">+</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleIncrement}
                  className="flex-1 h-13 w-full max-w-[300px] bg-primary text-white font-bold rounded-sm hover:bg-primary-hover transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to cart
                </button>
              )}

              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`w-14 h-13 flex items-center justify-center transition-colors hover:border-gray-400 shrink-0 ${isLiked ? "text-red-500" : "text-gray-400"}`}
              >
                <Heart className={`w-6 h-6 ${isLiked ? "fill-red-500" : ""}`} />
              </button>
            </div>

            {/* Delivery Section */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4 text-[#191919]">
                <Truck className="w-5 h-5" />
                <span className="font-bold">Delivery</span>
              </div>
              <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden w-full max-w-[300px]">
                <div className="pl-4 pr-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 py-3 outline-none text-sm font-medium"
                />
                <button className="px-6 py-3 bg-gray-100 text-primary font-bold text-sm hover:bg-gray-200 border-l border-gray-200">
                  Check
                </button>
              </div>
              <p className="text-[11px] text-gray-400 mt-2 italic">
                Check for estimated delivery date
              </p>
            </div>

            {/* Offers Section */}
            <div className="">
              <h3 className="font-bold text-[#191919] mb-2">Offers</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 w-5 h-5 shrink-0 bg-[#00B67A]/10 rounded-full flex items-center justify-center text-[#00B67A]">
                    <Percent className="w-3 h-3" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    Cashback T&C Apply
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 w-5 h-5 shrink-0 bg-[#00B67A]/10 rounded-full flex items-center justify-center text-[#00B67A]">
                    <Percent className="w-3 h-3" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium leading-tight">
                    AU Bank - 10% Cashback* Up to Rs. 500/- T&C Apply
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 border-t-2 border-gray-100 mt-10 md:mt-20 pt-10 md:pt-20">
          {/* Description Section (Optional / Below) */}
          {/* Left Section*/}
          <div className="left-section">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#191919] mb-4">
                About the Product
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm max-w-4xl">
                {product.description}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#191919] mb-4">
                Benifits
              </h2>
              <ul className="list-disc list-inside">
                <li className="text-gray-600 leading-relaxed text-sm max-w-4xl mb-3">
                  Apples are one of the healthiest fruits. Rich in vitamin C and
                  dietary and immune system healthy.
                </li>
                <li className="text-gray-600 leading-relaxed text-sm max-w-4xl mb-3">
                  Protects from Alzheimers, type 2 diabetes and cancer. It is a
                  natural teeth whitener and prevent bad breath.
                </li>
                <li className="text-gray-600 leading-relaxed text-sm max-w-4xl mb-3">
                  Eating apple peel lowers the risk of obesity. Apple mask is an
                  excellent cure for wrinkles
                </li>
              </ul>
            </div>
          </div>
          {/* Right Section*/}
          <div className="right-section">
            <h2 className="text-xl font-bold text-[#191919] mb-8">
              Product Information
            </h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-bold text-[#191919]">
                  AN Code:{" "}
                  <span className="font-normal text-gray-600">40033824</span>
                </p>
                <p className="text-sm font-bold text-[#191919]">
                  Country of origin:{" "}
                  <span className="font-normal text-gray-600">USA</span>
                </p>
              </div>

              <div>
                <p className="text-sm font-bold text-[#191919] mb-1">
                  Manufacturer Details:
                </p>
                <p className="text-sm text-gray-600">Epic Grocery Ltd.</p>
                <p className="text-sm text-gray-600">
                  4590 Lang Avenue, Salt Lake City, Utah, United States, 84111.
                </p>
                <p className="text-sm font-bold text-[#191919] mt-2">
                  Customer Care No.{" "}
                  <span className="font-normal text-gray-600">
                    1-800-208-2400
                  </span>
                </p>
              </div>

              <div>
                <p className="text-sm font-bold text-[#191919] mb-2">
                  Disclaimer
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Every effort is made to maintain the accuracy of all
                  information. However, actual product packaging and materials
                  may contain more and/or different information. It is
                  recommended not to solely rely on the information presented.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*  Products Simillar*/}
        <div className="border-t-2 border-gray-100 mt-10 md:mt-20 pt-10">
          <ProductCarousel title="Don't Forget to Add" data={similarProducts} />
        </div>

        {/* Reviews Products */}
        <div className="border-t-2 border-gray-100 mt-10 md:mt-20 pt-10 md:pt-20">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12">
            <div>
              <h2 className="text-xl font-bold text-[#191919] mb-4">
                Product Rating
              </h2>
              <div className="flex flex-col gap-2">
                <span className="text-6xl font-bold text-[#191919]">4.0/5</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < 4
                          ? "fill-[#FFB800] text-[#FFB800]"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <button className="mt-6 md:mt-0 px-8 py-3 bg-primary text-white font-bold rounded-sm hover:bg-primary-hover transition-all">
              write a review
            </button>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#191919] mb-8 border-b-2 border-gray-300 pb-3">
              All Review (4)
            </h3>

            <div className="space-y-10">
              {/* Static Review 1 */}
              <div className=" pb-10">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-primary">Cameron Williamson</h4>
                  <span className="text-sm text-gray-400">5 Jun, 2021</span>
                </div>
                <p className="font-bold text-sm text-[#191919] mb-4">
                  Osk, Totem Credence
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Highlay recommand everyone. The matrial is super slight and
                  great for me, but little see througts, so be careful
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
