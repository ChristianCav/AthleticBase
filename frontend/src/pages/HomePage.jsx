import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import NoPerformances from "../components/NoPerformances.jsx";
import PerformanceCard from "../components/PerformanceCard.jsx";
import { Link } from "react-router";
import { Plus, Check } from "lucide-react";
import Spinner from "../components/Spinner.jsx";

const HomePage = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [performances, setPerformances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [sortStarred, setSortStarred] = useState(false);

  useEffect(() => {
    const fetchPerformances = async () => {
      try {
        const token = localStorage.getItem("token");
        setIsLoading(true);
        const res = await api.get(
          `/performances?sortStarredFirst=${sortStarred}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setIsAuthorized(true);
        setPerformances(res.data);
      } catch (error) {
        toast.error("Couldn't fetch performances");
        if (error?.response?.status === 401) setIsAuthorized(false);
        console.error("Error in fetching performances", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerformances();
  }, [refreshFlag, sortStarred]);

  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-8 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900/80 p-8 shadow-2xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-gray-500">
                Performance feed
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-white">
                Your latest workouts
              </h1>
              <p className="mt-3 max-w-2xl text-gray-400">
                Browse recent performances, star what matters most, and jump
                into a detailed breakdown with one click.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                className={`inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 ${sortStarred ? "shadow-lg shadow-amber-500/10" : ""}`}
                onClick={() => setSortStarred((prev) => !prev)}
              >
                {sortStarred ? "Showing starred first" : "Sort by starred"}
              </button>
              <Link
                to="/create"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-violet-500/20 transition hover:brightness-110"
              >
                <Plus size={18} className="mr-2" />
                New performance
              </Link>
            </div>
          </div>
        </div>

        {isLoading && isAuthorized && (
          <div className="flex min-h-[50vh] items-center justify-center rounded-[2rem] border border-white/10 bg-neutral-900/80 p-10 text-white">
            <Spinner />
            <span className="ml-4 text-xl">Loading performances...</span>
          </div>
        )}

        {!isLoading && isAuthorized && performances.length === 0 && (
          <div className="rounded-[2rem] border border-dashed border-white/10 bg-neutral-900/80 p-14 text-center shadow-2xl">
            <NoPerformances />
          </div>
        )}

        {!isLoading && isAuthorized && performances.length !== 0 && (
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {performances.map((performance) => (
              <PerformanceCard
                key={performance._id}
                performance={performance}
                setRefreshFlag={setRefreshFlag}
              />
            ))}
          </div>
        )}

        {!isAuthorized && (
          <div className="rounded-[2rem] border border-white/10 bg-neutral-900/80 p-10 text-center text-white shadow-2xl">
            Not authorized, please log in.
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
