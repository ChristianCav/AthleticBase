import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../lib/axios.js";

const CreateBaseball = ({ location, duration, title, date }) => {
  const [data, setData] = useState({
    hits: 0,
    "at-bats": 0,
    rbis: 0,
    "home-runs": 0,
  });
  const type = "Baseball";
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!date || !type.trim()) {
      toast.error("All fields required");
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      toast.error("Not authorized");
      return;
    }

    const userId = user._id;
    try {
      // have to send bearer token as well
      const res = await api.post(
        "/performances",
        {
          ...(title !== "" && { title }),
          type,
          date,
          location,
          data,
          userId,
          duration,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Performance Created!");
      navigate("/homepage");
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-neutral-900/80 p-8 shadow-2xl">
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-200">
            Baseball performance
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-white">
            Add baseball stats
          </h1>
          <p className="mt-2 text-gray-400">
            Store hits, at-bats, RBIs, and home run totals for this game.
          </p>
        </div>

        <form onSubmit={handleCreate} className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Hits</span>
              </label>
              <input
                type="number"
                placeholder="Enter hits"
                className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    hits: Number(e.target.value),
                  }));
                }}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">At Bats</span>
              </label>
              <input
                type="number"
                placeholder="Enter at bats"
                className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    "at-bats": Number(e.target.value),
                  }));
                }}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">RBIs</span>
              </label>
              <input
                type="number"
                placeholder="Enter RBIs"
                className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    rbis: Number(e.target.value),
                  }));
                }}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Home Runs</span>
              </label>
              <input
                type="number"
                placeholder="Enter home runs"
                className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    "home-runs": Number(e.target.value),
                  }));
                }}
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Create Performance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBaseball;
