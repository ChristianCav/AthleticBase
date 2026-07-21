import React from "react";
import { Link } from "react-router";
import { formatDate, shortenTitle } from "../lib/utils.js";
import { Trash, Star } from "lucide-react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const PerformanceCard = ({ performance, setRefreshFlag }) => {
  const token = localStorage.getItem("token");

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (!window.confirm("Are you sure you want to delete this performance?"))
        return;
      await api.delete(`/performances/${performance._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRefreshFlag((prev) => !prev);
      toast.success("Performance deleted successfully");
    } catch (error) {
      console.log("Error deleting performance", error);
      toast.error("Couldn't delete performance");
    }
  };

  const handleStar = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const currentStarred = performance.starred;
      await api.put(
        `/performances/${performance._id}`,
        { starred: !currentStarred },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(
        currentStarred ? "Unstarred Performance" : "Starred Performance",
      );
      setRefreshFlag((prev) => !prev);
    } catch (error) {
      console.log("Error starring performance", error);
      toast.error("Couldn't star performance");
    }
  };

  const statSummary = () => {
    if (!performance.data || typeof performance.data !== "object")
      return "No stats available";
    const entries = Object.entries(performance.data);
    if (!entries.length) return "No stats available";
    const [firstKey, firstValue] = entries[0];
    return `${firstValue} ${firstKey.replace(/[-_]/g, " ")}`;
  };

  return (
    <Link
      to={`/performance/${performance._id}`}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-900/80 p-6 transition hover:-translate-y-1 hover:bg-neutral-800 hover:shadow-2xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
            {performance.type}
          </p>
          <h3 className="mt-4 text-xl font-semibold text-white">
            {shortenTitle(performance.title)}
          </h3>
        </div>

        <button
          onClick={handleStar}
          className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10"
          aria-label="Star performance"
        >
          {performance.starred ? (
            <Star
              size={20}
              color="rgb(253 224 71)"
              className="fill-yellow-300"
            />
          ) : (
            <Star size={20} />
          )}
        </button>
      </div>

      <p className="mt-5 text-sm text-gray-400">
        {formatDate(new Date(performance.date))}
      </p>
      <p className="mt-2 text-sm text-gray-400">
        Location: {performance.location || "N/A"}
      </p>
      <p className="mt-6 rounded-3xl bg-white/5 px-4 py-3 text-sm text-gray-200">
        {statSummary()}
      </p>

      <button
        className="absolute right-4 bottom-4 rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10"
        onClick={handleDelete}
        aria-label="Delete performance"
      >
        <Trash size={20} />
      </button>
    </Link>
  );
};

export default PerformanceCard;
