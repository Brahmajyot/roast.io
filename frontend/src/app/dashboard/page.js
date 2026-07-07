"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {
  Flame,
  LogOut,
  Home,Loader2
} from "lucide-react";

import api from "@/lib/axios";

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [url, setUrl] =
    useState("");

  const [roastMode, setRoastMode] =
    useState("medium");

  // CHECK LOGIN
  const isLoggedIn =
    typeof window !== "undefined" &&
    localStorage.getItem(
      "accessToken"
    );

  // ANALYZE WEBSITE
  const handleAnalyze = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await api.post(
          "/test/scrape",
          {
            url,

            roastMode,
          }
        );

      // SAVE REVIEW DATA
      localStorage.setItem(
        "reviewData",
        JSON.stringify(
          response.data
        )
      );

      toast.success(
        "Portfolio roasted successfully"
      );

      // REDIRECT
      router.push(
        "/review/test"
      );
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Analysis failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const handleLogout =
    async () => {
      try {
        await api.post(
          "/auth/logout"
        );

        // CLEAR STORAGE
        localStorage.clear();

        toast.success(
          "Logged out successfully"
        );

        // REDIRECT
        router.push("/");
      } catch (error) {
        toast.error(
          "Logout failed"
        );
      }
    };

  return (
    <main className="min-h-screen bg-[#050505] text-white px-4 sm:px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <Flame className="text-orange-500" />

            <p className="uppercase tracking-[0.3em] text-orange-500 text-xs sm:text-sm">
              AI Roast Engine
            </p>
          </div>

          {/* RIGHT */}
          {isLoggedIn ? (
            <button
              onClick={
                handleLogout
              }
              className="flex items-center justify-center gap-2 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition px-5 py-3 uppercase tracking-[0.2em] text-sm font-bold"
            >
              <LogOut size={18} />

              Logout
            </button>
          ) : (
            <Link
              href="/"
              className="flex items-center justify-center gap-2 border border-lime-400/30 bg-lime-400/10 hover:bg-lime-400/20 transition px-5 py-3 uppercase tracking-[0.2em] text-sm font-bold"
            >
              <Home size={18} />

              Home
            </Link>
          )}
        </div>

        {/* HEADER */}
        <div className="mb-14">
          <h1 className="text-6xl md:text-7xl font-black uppercase leading-none">
            Feed The
            <span className="block text-lime-400">
              Flames.
            </span>
          </h1>

          <p className="mt-6 text-zinc-400 text-lg max-w-2xl leading-relaxed">
            Submit your portfolio and
            let AI judge your design,
            projects, recruiter appeal,
            and developer decisions.
          </p>
        </div>

        {/* MAIN PANEL */}
        <div className="border border-orange-500/30 bg-black p-8 md:p-10 shadow-2xl">
          <form
            onSubmit={handleAnalyze}
            className="space-y-10"
          >
            {/* URL */}
            <div>
              <label className="block mb-4 uppercase tracking-[0.3em] text-sm text-zinc-400">
                Portfolio URL
              </label>

              <input
                type="url"
                value={url}
                onChange={(e) =>
                  setUrl(
                    e.target.value
                  )
                }
                placeholder="https://your-overengineered-portfolio.dev"
                className="w-full bg-zinc-950 border border-zinc-800 px-6 py-5 text-lg outline-none focus:border-orange-500 transition"
                required
              />
            </div>

            {/* ROAST MODES */}
            <div>
              <label className="block mb-5 uppercase tracking-[0.3em] text-sm text-zinc-400">
                Heat Level
              </label>

              <div className="grid md:grid-cols-3 gap-5">
                {/* MEDIUM */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    setRoastMode(
                      "medium"
                    )
                  }
                  className={`border p-6 text-left transition ${
                    roastMode ===
                    "medium"
                      ? "border-lime-400 bg-lime-400/10"
                      : "border-zinc-800 bg-zinc-950 hover:border-lime-400/40"
                  }`}
                >
                  <p className="text-lime-400 uppercase tracking-[0.3em] text-xs mb-3">
                    Medium Rare
                  </p>

                  <h3 className="text-3xl font-black uppercase mb-3">
                    Light Smoke
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Constructive criticism
                    with mild sarcasm.
                  </p>
                </button>

                {/* WELL DONE */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    setRoastMode(
                      "well-done"
                    )
                  }
                  className={`border p-6 text-left transition ${
                    roastMode ===
                    "well-done"
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-zinc-800 bg-zinc-950 hover:border-orange-500/40"
                  }`}
                >
                  <p className="text-orange-400 uppercase tracking-[0.3em] text-xs mb-3">
                    Well Done
                  </p>

                  <h3 className="text-3xl font-black uppercase mb-3">
                    Recruiter Mode
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Brutally honest hiring
                    feedback.
                  </p>
                </button>

                {/* BURNT */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    setRoastMode(
                      "burnt"
                    )
                  }
                  className={`border p-6 text-left transition ${
                    roastMode ===
                    "burnt"
                      ? "border-red-500 bg-red-500/10"
                      : "border-zinc-800 bg-zinc-950 hover:border-red-500/40"
                  }`}
                >
                  <p className="text-red-400 uppercase tracking-[0.3em] text-xs mb-3">
                    Burnt
                  </p>

                  <h3 className="text-3xl font-black uppercase mb-3">
                    Emotional Damage
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Internet-level roasting.
                    Maximum chaos.
                  </p>
                </button>
              </div>
            </div>

            {/* LIVE FEED */}
            <div className="border border-zinc-800 bg-zinc-950 p-6">
              <p className="uppercase tracking-[0.3em] text-xs text-zinc-500 mb-5">
                Live Roast Feed
              </p>

              <div className="space-y-3 font-mono text-sm">
                <p className="text-lime-400">
                  🔥 alexdev.io got cooked
                </p>

                <p className="text-orange-400">
                  💀 recruiter rejected another navbar
                </p>

                <p className="text-red-400">
                  ⚠ excessive animation detected
                </p>
              </div>
            </div>

            {/* BUTTON */}
           <button
  disabled={loading}
  className="w-full bg-orange-500 hover:bg-orange-600 transition py-5 text-black text-xl font-black uppercase tracking-[0.3em] disabled:opacity-50 flex items-center justify-center gap-3"
>
  {loading ? (
    <>
      <Loader2 className="animate-spin" size={24} />
      Analyzing...
    </>
  ) : (
    "Start The Fire"
  )}
</button>
          </form>
        </div>
      </div>
    </main>
  );
}
