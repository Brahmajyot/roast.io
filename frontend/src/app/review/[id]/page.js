"use client";

import {
  Flame,
  Skull,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

export default function ReviewPage() {
  const [review, setReview] =
    useState(null);

  // LOAD REVIEW DATA
  useEffect(() => {
    const stored =
      localStorage.getItem(
        "reviewData"
      );

    if (stored) {
      const parsed =
        JSON.parse(stored);

      setReview(parsed.aiReview);
    }
  }, []);

  // LOADING
  if (!review) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-black mb-4 text-orange-500">
            LOADING...
          </h1>

          <p className="text-zinc-500 uppercase tracking-[0.3em]">
            Preparing Emotional Damage
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <Flame className="text-orange-500" />

            <p className="uppercase tracking-[0.3em] text-orange-500 text-sm">
              AI Roast Report
            </p>
          </div>

          <h1 className="text-6xl md:text-7xl font-black uppercase leading-none">
            Emotional
            <span className="block text-lime-400">
              Damage.
            </span>
          </h1>

          <p className="mt-6 text-zinc-400 text-lg max-w-2xl leading-relaxed">
            Recruiter-grade analysis
            mixed with internet-level
            disrespect.
          </p>
        </div>

        {/* TOP GRID */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* HIRING SCORE */}
          <div className="border border-orange-500/30 bg-black p-8">
            <div className="flex items-center gap-3 mb-5">
              <TrendingUp className="text-orange-500" />

              <p className="uppercase tracking-[0.3em] text-sm text-zinc-400">
                Hiring Score
              </p>
            </div>

            <h2 className="text-7xl font-black text-orange-500">
              {review.hiringScore}
              <span className="text-3xl text-zinc-500">
                /100
              </span>
            </h2>
          </div>

          {/* OVERALL VIBE */}
          <div className="lg:col-span-2 border border-lime-400/30 bg-black p-8">
            <div className="flex items-center gap-3 mb-5">
              <AlertTriangle className="text-lime-400" />

              <p className="uppercase tracking-[0.3em] text-sm text-zinc-400">
                Overall Vibe
              </p>
            </div>

            <p className="text-3xl font-black leading-relaxed">
              {review.overallVibe}
            </p>
          </div>
        </div>

        {/* ROAST SECTION */}
        <div className="border border-red-500/30 bg-black p-8 mb-10">
          <div className="flex items-center gap-3 mb-8">
            <Skull className="text-red-500" />

            <h2 className="text-4xl font-black uppercase">
              Brutal Roast
            </h2>
          </div>

          <div className="space-y-5">
            {review.roastSection?.map(
              (roast, index) => (
                <div
                  key={index}
                  className="border border-zinc-800 bg-zinc-950 p-6"
                >
                  <p className="text-xl font-bold leading-relaxed">
                    💀 {roast}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* STRENGTHS + WEAKNESSES */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* STRENGTHS */}
          <div className="border border-lime-400/30 bg-black p-8">
            <h2 className="text-3xl font-black uppercase text-lime-400 mb-6">
              Strengths
            </h2>

            <div className="space-y-4">
              {review.strengths?.map(
                (item, index) => (
                  <div
                    key={index}
                    className="border border-zinc-800 bg-zinc-950 p-5"
                  >
                    ✅ {item}
                  </div>
                )
              )}
            </div>
          </div>

          {/* WEAKNESSES */}
          <div className="border border-red-500/30 bg-black p-8">
            <h2 className="text-3xl font-black uppercase text-red-400 mb-6">
              Weaknesses
            </h2>

            <div className="space-y-4">
              {review.weaknesses?.map(
                (item, index) => (
                  <div
                    key={index}
                    className="border border-zinc-800 bg-zinc-950 p-5"
                  >
                    ⚠ {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* IMPROVEMENTS */}
        <div className="border border-orange-500/30 bg-black p-8 mb-10">
          <h2 className="text-4xl font-black uppercase mb-8 text-orange-500">
            Improvements
          </h2>

          <div className="space-y-5">
            {review.improvements?.map(
              (item, index) => (
                <div
                  key={index}
                  className="border border-zinc-800 bg-zinc-950 p-6"
                >
                  🚀 {item}
                </div>
              )
            )}
          </div>
        </div>

        {/* RECRUITER IMPRESSION */}
        <div className="border border-lime-400/30 bg-black p-8">
          <p className="uppercase tracking-[0.3em] text-sm text-zinc-500 mb-5">
            Recruiter Impression
          </p>

          <p className="text-3xl font-black leading-relaxed">
            {
              review.recruiterImpression
            }
          </p>
        </div>
      </div>
    </main>
  );
}
