import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../lib/axios.js";

const CreateSoccer = ({ location, duration, title, date }) => {
  const [data, setData] = useState({
    goals: 0,
    assists: 0,
    shots: 0,
    "shots-on-target": 0,
    "yellow-cards": 0,
    "red-cards": 0,
  });
  const type = "Soccer";
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
        <div className="mb-8 flex flex-col gap-3">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200">
            Soccer performance
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-white">
              Add Soccer stats
            </h1>
            <p className="mt-2 text-gray-400">
              Record your goals, assists, shots, and cards in one clean form.
            </p>
          </div>
        </div>

        <form onSubmit={handleCreate} className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Goals</span>
              </label>
              <input
                type="number"
                placeholder="Enter goals"
                className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    goals: Number(e.target.value),
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
                <span className="label-text">Shots</span>
              </label>
              <input
                type="number"
                placeholder="Enter shots"
                className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    shots: Number(e.target.value),
                  }));
                }}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Shots on target</span>
              </label>
              <input
                type="number"
                placeholder="Enter SOT"
                className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    "shots-on-target": Number(e.target.value),
                  }));
                }}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Yellow Cards</span>
              </label>
              <input
                type="number"
                placeholder="Enter yellow cards"
                className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    "yellow-cards": Number(e.target.value),
                  }));
                }}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Red Cards</span>
              </label>
              <input
                type="number"
                placeholder="Enter red cards"
                className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    "red-cards": Number(e.target.value),
                  }));
                }}
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              Create Performance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSoccer;
