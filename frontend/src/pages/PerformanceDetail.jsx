import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { formatDate } from "../lib/utils.js";
import Spinner from "../components/Spinner.jsx";

const PerformanceDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const index = location.pathname.lastIndexOf("/");
  const id = location.pathname.substring(index + 1);

  const [loading, setLoading] = useState(true);
  const [performance, setPerformance] = useState(null);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await api.get(`/performances/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const performanceData = Array.isArray(res.data)
          ? res.data[0]
          : res.data;
        setPerformance(performanceData || null);
      } catch (error) {
        toast.error("Couldn't fetch performance");
        console.error("Error in fetching performance", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPerformance();
    }
  }, [id]);

  const detailEntries = useMemo(() => {
    if (!performance?.data || typeof performance.data !== "object") return [];
    return Object.entries(performance.data);
  }, [performance]);

  const formatLabel = (key) => {
    return key
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const typeStyles = {
    Soccer: "bg-emerald-500/15 text-emerald-300 border-emerald-500",
    Basketball: "bg-orange-500/15 text-orange-300 border-orange-500",
    Baseball: "bg-sky-500/15 text-sky-300 border-sky-500",
    Run: "bg-violet-500/15 text-violet-300 border-violet-500",
  };

  const formattedDate = performance?.date
    ? formatDate(new Date(performance.date))
    : "N/A";
  const typeClass =
    typeStyles[performance?.type] || "bg-white/10 text-white border-white/20";

  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-10 pt-24">
      {loading ? (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center gap-4 text-white text-xl">
          <Spinner />
          Loading performance...
        </div>
      ) : (
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <button
            onClick={() => navigate(-1)}
            className="self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            ← Back
          </button>

          {!performance ? (
            <div className="rounded-3xl border border-white/10 bg-neutral-900/80 p-10 text-center shadow-2xl">
              <p className="text-lg font-semibold text-white">
                Performance not found
              </p>
              <p className="mt-3 text-sm text-gray-400">
                Check the link or return to the homepage to view another
                performance.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900/80 shadow-2xl">
              <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 px-8 py-8 sm:px-12 sm:py-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-gray-400">
                      Performance Detail
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold text-white">
                      {performance.title || "Untitled Performance"}
                    </h1>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-300">
                      <span>{formattedDate}</span>
                      <span>·</span>
                      <span>{performance.location || "No location"}</span>
                      <span>·</span>
                      <span>
                        {performance.duration
                          ? `${performance.duration} min`
                          : "Duration N/A"}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${typeClass}`}
                  >
                    {performance.type || "Unknown Sport"}
                  </span>
                </div>
              </div>

              <div className="grid gap-6 border-t border-white/10 px-6 py-8 sm:px-10 lg:grid-cols-[1.5fr_0.85fr]">
                <div className="rounded-[1.75rem] bg-neutral-950/80 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-gray-500">
                        Stats
                      </p>
                      <h2 className="mt-3 text-2xl font-semibold text-white">
                        Sport-specific performance
                      </h2>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {detailEntries.length > 0 ? (
                      detailEntries.map(([key, value]) => (
                        <div
                          key={key}
                          className="rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                        >
                          <p className="text-sm text-gray-400">
                            {formatLabel(key)}
                          </p>
                          <p className="mt-3 text-2xl font-semibold text-white">
                            {value ?? "—"}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-gray-400">
                        No sport-specific stats available for this performance.
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-neutral-950/80 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-gray-500">
                    Summary
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">
                    Performance snapshot
                  </h2>
                  <div className="mt-6 space-y-4 text-gray-300">
                    <div>
                      <p className="text-sm text-gray-400">Sport type</p>
                      <p className="mt-1 text-lg text-white">
                        {performance.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Date</p>
                      <p className="mt-1 text-lg text-white">{formattedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="mt-1 text-lg text-white">
                        {performance.location || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="mt-1 text-lg text-white">
                        {performance.duration
                          ? `${performance.duration} min`
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PerformanceDetail;
