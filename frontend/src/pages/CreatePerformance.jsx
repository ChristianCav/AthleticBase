import React, { useState } from 'react'
import { ChevronDown, Calendar } from 'lucide-react'
import toast from 'react-hot-toast';
import api from '../lib/axios.js';
import { useNavigate } from 'react-router';

const CreatePerformance = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState('');
  const [data, setData] = useState({
    "goals": 0
  });
  const [duration, setDuration] = useState(0);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select a type");

  const navigate = useNavigate();
  const options = ["Soccer", "Golf", "Run", "Workout"];
  const handleCreate = async(e) => {
    e.preventDefault();
    
    if(!date || !type.trim()){
      console.log(type)
      toast.error("All fields required")
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token")
    
    if(!user || !token){
      toast.error("Not authorized");
      return
    }

    const userId = user._id
    setLoading(true);
    try{
      // have to send bearer token as well
      const res = await api.post("/performances", {...(title !== "" && { title }), type, date, location, data, userId, duration}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      toast.success("Performance Created!");
      navigate("/homepage")
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }

  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-950'>
      <div className="card-body text-white max-w-xl">
            <form onSubmit={handleCreate}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter title"
                  className="input input-bordered max-h-11"
                  onChange={(e) =>{
                    setTitle(e.target.value)
                  }}
                />
              </div>

              <div className="form-control mt-2">
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

              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter location"
                  className="input input-bordered max-h-11"
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
              </div>

              <div className="data-container flex flex-row items-center justify-center w-full gap-32"> 

                <div className="form-control mt-2">
                  <label className='label'>
                    <span className='label-text'>Date</span>
                  </label>
                  <div className='relative w-full'>
                    <input 
                    className={`input input-bordered ${date ? "text-white" : "text-gray-400"} border-white`} 
                    type="date" 
                    onChange={(e) => {
                      setDate(e.target.value)
                    }}
                    value={date}
                    required />
                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'>
                      <Calendar size={18}></Calendar>
                    </div>
                  </div>
                </div>


                <div className="form-control mt-2">
                  <label className="label">
                    <span className="label-text">Duration</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter duration (minutes)"
                    className="input input-bordered max-h-11"
                    onChange={(e) => {
                      setDuration(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="data-container flex flex-row items-center justify-center w-full gap-20"> 
                <div className="form-control mt-2 justify-start">
                  <label className="label">
                    <span className="label-text">Key</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter key"
                    className="input input-bordered max-h-11"
                    onChange={(e) => {
                      setData(e.target.value);
                    }}
                  />
                </div>

                <div className="form-control mt-2 justify-end">
                  <label className="label">
                    <span className="label-text">Value</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter value"
                    className="input input-bordered max-h-11"
                    onChange={(e) => {
                      setData(prev => ({
                        ...prev, 
                        "goals": e.target.value
                      }));
                    }}
                  />
                </div>
              </div>    

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary max-h-11">Create Performance</button>
              </div>
            </form>
          </div>
    </div>
  )
}

export default CreatePerformance