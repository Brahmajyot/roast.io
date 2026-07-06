"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import api from "@/lib/axios";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // HANDLE REGISTER
  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await api.post(
          "/auth/register",
          formData
        );

      // SAVE EMAIL
      localStorage.setItem(
        "verifyEmail",
        formData.email
      );

      toast.success(
        response.data.message
      );

      // REDIRECT
      router.push(
        "/verify-otp"
      );
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md border border-lime-400/30 bg-black p-8 shadow-2xl">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <p className="text-lime-400 uppercase tracking-[0.3em] text-sm mb-3">
            Join The Chaos
          </p>

          <h1 className="text-5xl font-black uppercase">
            REGISTER
          </h1>

          <p className="text-zinc-500 mt-4 text-sm leading-relaxed">
            Create your account and
            prepare for emotional
            damage.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* NAME */}
          <div>
            <label className="text-sm uppercase tracking-widest text-zinc-400 block mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={
                handleChange
              }
              placeholder="Your Name"
              className="w-full bg-zinc-950 border border-zinc-800 px-4 py-4 outline-none focus:border-lime-400 transition"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm uppercase tracking-widest text-zinc-400 block mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={
                handleChange
              }
              placeholder="you@example.com"
              className="w-full bg-zinc-950 border border-zinc-800 px-4 py-4 outline-none focus:border-lime-400 transition"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm uppercase tracking-widest text-zinc-400 block mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 px-4 py-4 pr-14 outline-none focus:border-lime-400 transition"
                required
              />

              {/* TOGGLE BUTTON */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-lime-400 transition"
              >
                {showPassword ? (
                  <EyeOff
                    size={20}
                  />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-lime-400 hover:bg-lime-300 transition py-4 text-black font-black uppercase tracking-widest disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-8 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-orange-400 hover:text-orange-300"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
