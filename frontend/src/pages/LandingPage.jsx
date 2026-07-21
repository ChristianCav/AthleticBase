import React from "react";
import { Link } from "react-router";
import { ArrowRight, Trophy, TrendingUp, Cloud, Lock } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="w-full bg-neutral-950">
      <div className="absolute top-0 inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-12 pt-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-sm font-semibold text-white">
              Welcome to AthleticBase
            </span>
          </div>

          <h1 className="mt-8 bg-gradient-to-br from-white via-gray-200 to-gray-400 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl lg:text-7xl">
            Track Your Game.
            <br />
            Improve Your Game.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-400">
            Log your performances in soccer, basketball, baseball, runs, and
            more. Get instant insights into your athletic progress with
            sport-specific statistics and trends.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-sky-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-violet-500/20 transition hover:brightness-110"
            >
              Get started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Everything you need to level up
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Designed for athletes who take their performance seriously.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/50 to-neutral-950/50 p-8 backdrop-blur transition hover:border-white/20 hover:bg-gradient-to-br hover:from-neutral-900 hover:to-neutral-900/50">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-3 text-lg font-semibold text-white">
              Multi-Sport Tracking
            </h3>
            <p className="text-gray-400">
              Log soccer, basketball, baseball, runs, and more with
              sport-specific stats built in.
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/50 to-neutral-950/50 p-8 backdrop-blur transition hover:border-white/20 hover:bg-gradient-to-br hover:from-neutral-900 hover:to-neutral-900/50">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-600">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-3 text-lg font-semibold text-white">
              Performance Insights
            </h3>
            <p className="text-gray-400">
              Track progress over time and visualize how you're improving across
              all sports.
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/50 to-neutral-950/50 p-8 backdrop-blur transition hover:border-white/20 hover:bg-gradient-to-br hover:from-neutral-900 hover:to-neutral-900/50">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600">
              <Cloud className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-3 text-lg font-semibold text-white">
              Cloud-Synced Data
            </h3>
            <p className="text-gray-400">
              Access your performances from any device, anytime. Your data is
              always available.
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/50 to-neutral-950/50 p-8 backdrop-blur transition hover:border-white/20 hover:bg-gradient-to-br hover:from-neutral-900 hover:to-neutral-900/50">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-rose-600">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-3 text-lg font-semibold text-white">
              Private & Secure
            </h3>
            <p className="text-gray-400">
              Your performance data is encrypted and never shared without
              permission.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-violet-500/10 to-sky-500/10 p-12 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to track your performance?
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Join athletes who are already improving their game with
              AthleticBase.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-sky-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-violet-500/20 transition hover:brightness-110"
              >
                Create free account
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
