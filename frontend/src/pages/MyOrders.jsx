import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useData } from "../context/AuthContext";
import { API_ENDPOINTS, BASE_URL } from "../utils/constant";

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { callApi, loading: isLoading } = useFetch();
  const { user, isAuthenticated } = useData();

  // fetch user orders

  const fetchUserOrders = async () => {
    if (isAuthenticated) {
      try {
        const orders = await callApi({
          endpoint: `${API_ENDPOINTS.ORDER}/myorders`,
        });
        if (orders.success) {
          setOrders(orders.data);
        }
      } catch (error) {
        toast.error("Failed to fetch orders");
      }
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [isAuthenticated]);

  if (orders.length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col justify-center items-center p-10">
        <div className="p-6 bg-primary/10 rounded-full mb-6">
          <Package className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-text-main mb-2">
          No orders found
        </h2>
        <p className="text-text-muted mb-8 text-center italic">
          You haven't placed any orders yet. Start your shopping journey today!
        </p>
        <Link
          to="/list"
          className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-screen py-12">
      <div className="w-11/12 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-text-main mb-2">
              <span className="text-primary">My Order</span> History
            </h1>
            <p className="text-text-muted">
              Track and manage your recent purchases
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-surface border border-border">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <span className="font-bold text-text-main">
              {orders.length} Total Orders
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {orders.map((order) => {
            return (
              <div
                key={order._id}
                className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all group"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-border bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-wrap gap-4 md:gap-8">
                    <div>
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
                        Order ID
                      </p>
                      <p className="text-sm font-bold text-text-main">
                        {order._id.slice(0, 8)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
                        Date Placed
                      </p>
                      <p className="text-sm font-bold text-text-main">
                        {order.createdAt.split("T")[0]}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
                        Total Amount
                      </p>
                      <p className="text-sm font-bold text-primary">
                        ₹{order.totalPrice.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex justify-center items-center gap-2 px-3 py-1.5 rounded-full ${order.isPaid ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"} font-bold text-xs`}
                  >
                    {order.isPaid ? "Paid" : "Not Paid"}
                  </div>
                </div>

                {/* Items List */}
                <div className="p-6">
                  <div className="flex flex-col gap-6">
                    {order.orderItems.map((item) => (
                      <div key={item._id} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-border flex-shrink-0">
                          <img
                            src={`${BASE_URL}/upload/${item.image}`}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-bold text-text-main leading-tight mb-1">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-3">
                            <p className="text-xs text-text-muted">
                              Quantity:{" "}
                              <span className="font-bold text-text-main">
                                {item.qty}
                              </span>
                            </p>
                            <span className="w-1 h-1 bg-border rounded-full"></span>
                            <p className="text-xs text-text-muted">
                              Price:{" "}
                              <span className="font-bold text-text-main">
                                ₹{item.price.toLocaleString("en-IN")}
                              </span>
                            </p>
                          </div>
                        </div>
                        <Link
                          to={`/product/${item.product}`}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-text-muted hover:text-primary"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 bg-gray-50/30 border-t border-border flex justify-end gap-4">
                  <button className="text-xs font-bold text-primary hover:underline">
                    Track Package
                  </button>
                  <button className="text-xs font-bold text-text-muted hover:text-text-main">
                    View Receipt
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
