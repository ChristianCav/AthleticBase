import React, { useState } from 'react'
import { ChevronDown, Calendar, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import Login from './Login.jsx';
import CreateSoccer from '../components/CreateSoccer.jsx';
import CreateRun from '../components/CreateRun.jsx';

const CreatePerformance = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState('');
  const [continued, setContinued] = useState(false);

  const [duration, setDuration] = useState(0);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select a type");

  const options = ["Soccer", "Golf", "Run", "Workout"];

  const handleContinue = () => {
    if(type.trim() === "" || !date){
      toast.error("Date and type are required");
      return
    }
    setContinued(true);
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-950'>
      {!continued && <div className="card-body text-white max-w-xl">
            <div className="w-full flex flex-col items-center gap-x-6">

              <div className="flex flex-row w-full max-w-4xl justify-between gap-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    className="input input-bordered w-full max-h-11"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Location</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="input input-bordered w-full max-h-11"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-row w-full max-w-4xl justify-between gap-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>
                  <div className="relative">
                    <input
                      className={`input input-bordered border-white w-full max-h-11 ${
                        date ? "text-white" : "text-gray-400"
                      }`}
                      type="date"
                      onChange={(e) => setDate(e.target.value)}
                      value={date}
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                      <Calendar size={18} />
                    </div>
                  </div>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Duration</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter duration (minutes)"
                    className="input input-bordered w-full max-h-11"
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </div>
            </div>


            <div className="form-control">
              <label className="label">
                <span className="label-text">Type</span>
              </label>
              <div className="relative w-full">
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className={`input input-bordered border-white ${selected === "Select a type" ? "text-gray-400" : "text-white"} font-normal flex justify-between items-center w-full`}
                >
                  {selected}
                  <ChevronDown size={18} className="ml-2" />
                </button>

                {open && (
                  <div className="absolute w-full mt-1 bg-base-100 shadow-md rounded-box z-50 border border-gray-700">
                    <ul className="menu p-0">
                      {options.map(option => (
                        <li key={option}>
                          <button
                            type="button"
                            onClick={() => {
                            setType(option);
                              setSelected(option)
                              setOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-neutral-700 bg-black"
                          >
                            <span className='text-white'>{option}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="form-control mt-6">
              <button type="button" onClick={handleContinue} className="btn btn-primary max-h-11">Continue</button>
            </div>
          </div>}


          {continued && (
            <div>
              <button type="button" className='btn btn-bordered text-white top-28 left-20 absolute' onClick={() => setContinued(false)}>
                Back
                <ArrowLeft size={18} />
              </button>
              {type === "Soccer" ? <CreateSoccer date={date} location={location} title={title} duration={duration} /> : null}
              {type === "Run" ? <CreateRun date={date} location={location} title={title} duration={duration} /> : null}
            </div>
          )}
    </div>
  )
}

export default CreatePerformance