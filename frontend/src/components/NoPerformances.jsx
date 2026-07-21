import React from "react";
import { Link } from "react-router";

const NoPerformances = () => {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 rounded-[1.75rem] border border-white/10 bg-neutral-950/80 px-10 py-12 text-center shadow-2xl">
      <p className="text-sm uppercase tracking-[0.32em] text-gray-500">
        Empty inbox
      </p>
      <h3 className="text-3xl font-semibold text-white">
        No performances found
      </h3>
      <p className="text-gray-400">
        When you log a performance, it will appear here with a detailed summary
        and quick access to your stats.
      </p>
      <Link
        to="/create"
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-violet-500/20 transition hover:brightness-110"
      >
        Log your first performance
      </Link>
    </div>
  );
};

export default NoPerformances;
