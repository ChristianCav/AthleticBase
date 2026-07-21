import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../lib/axios.js";

const CreateBasketball = ({ location, duration, title, date }) => {
  const [data, setData] = useState({
    points: 0,
    assists: 0,
    rebounds: 0,
    "shots-attempted": 0,
    "shots-made": 0,
    fouls: 0,
  });
  const type = "Basketball";
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
          <div className="inline-flex items-center rounded-full border border-white/10 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-200">
            Basketball performance
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-white">
            Add basketball stats
          </h1>
          <p className="mt-2 text-gray-400">
            Capture points, assists, rebounds, and shooting performance.
          </p>
        </div>

        <form onSubmit={handleCreate} className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Points</span>
              </label>
              <input
                type="number"
                placeholder="Enter points"
                className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    points: Number(e.target.value),
                  }));
                }}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Assists</span>
              </label>
              <input
                type="number"
                placeholder="Enter assists"
                className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    assists: Number(e.target.value),
                  }));
                }}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Rebounds</span>
              </label>
              <input
                type="number"
                placeholder="Enter rebounds"
                className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    rebounds: Number(e.target.value),
                  }));
                }}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Shots Made</span>
              </label>
              <input
                type="number"
                placeholder="Enter shots made"
                className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    "shots-made": Number(e.target.value),
                  }));
                }}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Shots Attempted</span>
              </label>
              <input
                type="number"
                placeholder="Enter shots attempted"
                className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    "shots-attempted": Number(e.target.value),
                  }));
                }}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Fouls</span>
              </label>
              <input
                type="number"
                placeholder="Enter fouls"
                className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    fouls: Number(e.target.value),
                  }));
                }}
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
            >
              Create Performance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBasketball;
