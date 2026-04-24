import React from "react";
import { useCartData } from "../context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS, BASE_URL } from "../utils/constant";
import { useFetch } from "../hooks/useFetch";
import { useData } from "../context/AuthContext";
import toast from "react-hot-toast";

export const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } =
    useCartData();

  const navigate = useNavigate();
  const { callApi, loading: paymentLoading } = useFetch();
  const { user, isAuthenticated } = useData();

  // Handle Payment
  const handlePayment = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return toast.error("Please login to continue");
    }

    try {
      const res = await callApi({
        method: "POST",
        endpoint: `${API_ENDPOINTS.PAYMENT}/create`,
        body: { amount: cartTotal },
      });

      if (!res.success) {
        throw new Error("Order creation failed");
      }

      const orderData = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.id,
        name: "E-commerce Shop",
        description: "Payment for your order",
        handler: async (response) => {
          try {
            const verify = await callApi({
              method: "POST",
              endpoint: `${API_ENDPOINTS.PAYMENT}/verify`,
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                shippingAddress: {
                  address: "123 Test Street",
                  city: "Mumbai",
                  postalCode: "400001",
                  country: "India",
                },
              },
            });
            console.log("Verify Response:", verify); // Debugging
            if (verify && (verify.success || verify.verified)) {
              toast.success("Payment Verified Successfully");
              clearCart();
              navigate("/my-orders");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            toast.error("Payment Verification Failed");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#4f46e5",
        },
      };
      const razor = new window.Razorpay(options);
      razor.on("payment.failed", (response) => {
        toast.error("Payment Failed");
      });
      razor.open();
    } catch (error) {
      toast.error("Something went wrong with the payment");
      console.log("Payment Error: ", error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col justify-center items-center p-10">
        <div className="p-6 bg-primary/10 rounded-full mb-6">
          <ShoppingBag className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-text-main mb-2">
          Your cart is empty
        </h2>
        <p className="text-text-muted mb-8 text-center italic">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/list"
          className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-screen py-12">
      <div className="w-11/12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-text-main mb-10 flex items-center gap-3">
          <span className="text-primary">Your Shopping</span> Cart
          <span className="text-sm font-medium text-text-muted bg-border/50 px-3 py-1 rounded-full">
            {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-surface p-5 rounded-2xl border border-border shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow group"
              >
                {/* Product Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden border border-border flex-shrink-0">
                  <img
                    src={`${BASE_URL}/upload/${item?.images?.[0] || item?.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-grow flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-text-main mb-1 truncate max-w-[200px] sm:max-w-xs">
                      {item.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                      {item.category}
                    </p>
                    <p className="text-lg font-bold text-text-main">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center gap-4 sm:gap-8 ml-auto sm:ml-0">
                    <div className="flex items-center border border-border rounded-lg bg-background p-1 h-fit">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1.5 hover:bg-surface rounded-md transition-colors text-text-main disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-text-main">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1.5 hover:bg-surface rounded-md transition-colors text-text-main"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Remove Item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4">
            <div className="bg-surface p-8 rounded-2xl border border-border shadow-sm sticky top-24">
              <h3 className="text-xl font-bold text-text-main mb-6">
                Order Summary
              </h3>

              <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-text-muted">
                  <span>Subtotal</span>
                  <span className="font-semibold text-text-main">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Shipping</span>
                  <span className="text-accent font-semibold tracking-wide uppercase text-xs">
                    FREE
                  </span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Estimated Tax</span>
                  <span className="font-semibold text-text-main">₹0</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-text-main">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-primary">
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                onClick={() => {
                  handlePayment();
                }}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                Checkout Now
              </button>

              <p className="text-center text-xs text-text-muted mt-4">
                Secure SSL encryption & 100% safe payments
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
