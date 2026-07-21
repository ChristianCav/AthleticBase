import React, { useState } from "react";
import { ChevronDown, Calendar, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import CreateSoccer from "../sportCreates/CreateSoccer.jsx";
import CreateRun from "../sportCreates/CreateRun.jsx";
import CreateBasketball from "../sportCreates/CreateBasketball.jsx";
import CreateBaseball from "../sportCreates/CreateBaseball.jsx";

const CreatePerformance = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [continued, setContinued] = useState(false);

  const [duration, setDuration] = useState(0);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select a type");

  const options = ["Soccer", "Basketball", "Baseball", "Run"];

  const handleContinue = () => {
    if (type.trim() === "" || !date) {
      toast.error("Date and type are required");
      return;
    }
    setContinued(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-8 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        {!continued && (
          <div className="rounded-[2rem] border border-white/10 bg-neutral-900/80 p-8 shadow-2xl">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.32em] text-gray-500">
                Performance creation
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-white">
                Log a new performance
              </h1>
              <p className="mt-2 text-gray-400">
                Select a sport type and fill in the basics to get started.
              </p>
            </div>

            <form className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Location</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>
                  <div className="relative">
                    <input
                      className={`input input-bordered w-full max-h-11 bg-neutral-950 ${
                        date ? "text-white" : "text-gray-400"
                      }`}
                      type="date"
                      onChange={(e) => setDate(e.target.value)}
                      value={date}
                      required
                    />
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Calendar size={18} />
                    </div>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Duration</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter duration (minutes)"
                    className="input input-bordered w-full max-h-11 bg-neutral-950 text-white"
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Sport Type</span>
                </label>
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className={`input input-bordered flex w-full items-center justify-between bg-neutral-950 font-normal ${
                      selected === "Select a type"
                        ? "text-gray-400"
                        : "text-white"
                    }`}
                  >
                    {selected}
                    <ChevronDown size={18} />
                  </button>

                  {open && (
                    <div className="absolute z-50 mt-1 w-full rounded-[1.5rem] border border-white/10 bg-neutral-900/80 shadow-2xl">
                      <ul className="space-y-2 p-4">
                        {options.map((option) => (
                          <li key={option}>
                            <button
                              type="button"
                              onClick={() => {
                                setType(option);
                                setSelected(option);
                                setOpen(false);
                              }}
                              className="w-full rounded-lg bg-white/5 px-4 py-3 text-left text-white transition hover:bg-white/10"
                            >
                              {option}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleContinue}
                  className="w-full rounded-full bg-gradient-to-r from-violet-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-violet-500/20 transition hover:brightness-110"
                >
                  Continue to sport details
                </button>
              </div>
            </form>
          </div>
        )}

        {continued && (
          <div>
            <button
              type="button"
              className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              onClick={() => setContinued(false)}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </button>
            {type === "Soccer" ? (
              <CreateSoccer
                date={date}
                location={location}
                title={title}
                duration={duration}
              />
            ) : null}
            {type === "Run" ? (
              <CreateRun
                date={date}
                location={location}
                title={title}
                duration={duration}
              />
            ) : null}
            {type === "Basketball" ? (
              <CreateBasketball
                date={date}
                location={location}
                title={title}
                duration={duration}
              />
            ) : null}
            {type === "Baseball" ? (
              <CreateBaseball
                date={date}
                location={location}
                title={title}
                duration={duration}
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePerformance;
