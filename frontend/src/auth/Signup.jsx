import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../context/AuthContext";
import { MessageCircle } from "lucide-react";

export const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    country: "",
    password: "",
  });
  const { register } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.number,
        formData.country,
        formData.password,
      );

      if (res && res.success) {
        navigate("/cart");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center relative">
      <div className="w-10/12 bg-white rounded-sm flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md p-5">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-text-main mb-2">
              Creat An Account
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="relative group">
                  <input
                    type="text"
                    required
                    name="firstName"
                    className="w-full pl-4 pr-12 py-3.5 bg-background border-2  focus:outline-none focus:border-indigo-500 transition-all text-text-main placeholder:text-gray-500"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div className="relative group">
                  <input
                    type="text"
                    required
                    name="lastName"
                    className="w-full pl-4 pr-12 py-3.5 bg-background border-2  focus:outline-none focus:border-indigo-500 transition-all text-text-main placeholder:text-gray-500"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <div className="relative group">
                <input
                  type="email"
                  required
                  name="email"
                  className="w-full pl-4 pr-12 py-3.5 bg-background border-2  focus:outline-none focus:border-indigo-500 transition-all text-text-main placeholder:text-gray-500"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <div className="relative group">
                <select
                  name="country"
                  id="country"
                  className="w-full pl-4 pr-12 py-3.5 bg-background border-2  focus:outline-none focus:border-indigo-500 transition-all text-text-main placeholder:text-gray-500"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="">Country</option>
                  <option value="india">India</option>
                  <option value="uk">UK</option>
                  <option value="usa">USA</option>
                </select>
              </div>
            </div>

            {/* Phone */}
            <div>
              <div className="relative group">
                <input
                  type="text"
                  required
                  name="number"
                  className="w-full pl-4 pr-12 py-3.5 bg-background border-2  focus:outline-none focus:border-indigo-500 transition-all text-text-main placeholder:text-gray-500"
                  placeholder="Number"
                  value={formData.number}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="relative group">
                <input
                  type="password"
                  required
                  name="password"
                  className="w-full pl-4 pr-12 py-3.5 bg-background border-2  focus:outline-none focus:border-indigo-500 transition-all text-text-main placeholder:text-gray-500"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Terms Selection */}
            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                name="terms"
                id="terms"
              />
              <p className="text-sm text-text-muted leading-relaxed">
                I have read and agree to{" "}
                <span className="text-indigo-500">Account Use Maganement</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-indigo-500 text-white font-semibold rounded-sm uppercase hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating Account..." : "Create My Account"}
            </button>
          </form>

          <div className="my-8 flex justify-center">
            <Link
              to="/login"
              className="font-semibold text-indigo-500 hover:underline underline-offset-4"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
      {/* Message Icon */}
      <div className="absolute bottom-20 right-4">
        <button className="w-14 h-14 bg-indigo-500 text-white rounded-full flex items-center justify-center">
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
