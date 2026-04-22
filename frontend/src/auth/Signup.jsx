import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  CheckCircle2,
} from "lucide-react";
import { useData } from "../context/AuthContext";

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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
        formData.name,
        formData.email,
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
    <div className="min-h-[90vh] flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md bg-surface p-8 rounded-md border border-border shadow-2xl shadow-primary/5">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 text-primary">
            <UserPlus className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-text-main mb-2">
            Create Account
          </h2>
          <p className="text-text-muted">
            Start your journey with ElevateShop today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold text-text-main mb-2 ml-1">
              Full Name
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                required
                name="name"
                className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-sm focus:outline-none focus:border-primary transition-all text-text-main placeholder:text-text-muted/50"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-bold text-text-main mb-2 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
              <input
                type="email"
                required
                name="email"
                className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-sm focus:outline-none focus:border-primary transition-all text-text-main placeholder:text-text-muted/50"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-text-main mb-2 ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                required
                name="password"
                className="w-full pl-12 pr-12 py-3.5 bg-background border border-border rounded-sm focus:outline-none focus:border-primary transition-all text-text-main placeholder:text-text-muted/50"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Terms Selection */}
          <div className="flex items-start gap-3 py-2">
            <div className="min-w-[18px] h-[18px] bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              By creating an account, you agree to our{" "}
              <span className="text-primary font-bold cursor-pointer hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-primary font-bold cursor-pointer hover:underline">
                Privacy Policy
              </span>
              .
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/30 active:scale-[0.98] mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating Account..." : "Create My Account"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-text-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-primary hover:underline underline-offset-4"
          >
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};
