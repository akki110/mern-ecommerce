import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useData } from "../context/AuthContext";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useData();
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
      const res = await login(formData.email, formData.password);
      if (res.success) {
        navigate("/");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center ">
      <div className="w-10/12 bg-white rounded-sm flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md p-5">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-text-main mb-2">
              Login
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <div className="relative group">
                <input
                  type="email"
                  required
                  name="email"
                  className="w-full pl-4 pr-12 py-3.5 bg-background border-2  focus:outline-none focus:border-primary transition-all text-text-main placeholder:text-gray-500"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="relative group">
                <input
                  type="password"
                  required
                  name="password"
                  className="w-full pl-4 pr-12 py-3.5 bg-background border-2  focus:outline-none focus:border-primary transition-all text-text-main placeholder:text-gray-500"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-end">
              <Link to={"/"} className="text-indigo-500 font-semibold">
                Forgot Password ?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-indigo-500 text-white font-semibold rounded-sm uppercase hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
              {!isSubmitting && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="my-8 flex justify-center">
            <Link
              to="/register"
              className="font-semibold text-indigo-500 hover:underline underline-offset-4"
            >
              Sign Up
            </Link>
          </div>
          <p className="text-gray-400 text-sm">
            Protected and subject to the User Agreement and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};
