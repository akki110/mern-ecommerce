import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useData } from "../context/AuthContext";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    // code here
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md bg-surface p-8 rounded-md border border-border shadow-2xl shadow-primary/5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-text-main mb-2">
            Welcome Back
          </h2>
          <p className="text-text-muted">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
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

          {/* Password Field */}
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm text-text-muted cursor-pointer select-none"
            >
              Keep me logged in
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            Sign In
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-text-muted">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-primary hover:underline underline-offset-4"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
