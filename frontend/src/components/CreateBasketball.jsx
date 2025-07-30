import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import api from '../lib/axios.js';

const CreateBasketball = ({location, duration, title, date}) => {
  const [data, setData] = useState({
    "points": 0,
    "assists": 0,
    "rebounds": 0,
    "shots-attempted": 0,
    "shots-made": 0,
    "fouls": 0
  });
  const type = "Basketball"
  const navigate = useNavigate();

  const handleCreate = async(e) => {
    e.preventDefault();
    
    if(!date || !type.trim()){
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
    }

  }
  return (
    <div className='w-full flex text-white items-center justify-center'>
        <form onSubmit={handleCreate}>
        <div className="shots-container flex flex-row gap-x-6">
            <div className="form-control w-full">
                <label className="label">
                <span className="label-text">Points</span>
              </label>
              <input
                type="number"
                placeholder="Enter points"
                className="input input-bordered w-full max-h-11"
                onChange={(e) => {
                    setData(prev => ({
                        ...prev,
                        "points": e.target.value,
                    }));
                }}
              />
            </div>

            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Assists</span>
                </label>
                <input
                    type="number"
                    placeholder="Enter assists"
                    className="input input-bordered w-full max-h-11"
                    onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            "assists": e.target.value,
                        }));
                    }}
                />
            </div>
        </div>

        <div className="shots-container flex flex-row gap-x-6">
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Rebounds</span>
                </label>
                <input
                    type="number"
                    placeholder="Enter rebounds"
                    className="input input-bordered w-full max-h-11"
                    onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            "rebounds": e.target.value,
                        }));
                    }}
                />
            </div>

            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Shots Made</span>
                </label>
                <input
                    type="number"
                    placeholder="Enter shots made"
                    className="input input-bordered w-full max-h-11"
                    onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            "shots-made": e.target.value,
                        }));
                    }}
                />
            </div>
        </div>

        <div className="cards-container flex flex-row gap-x-6">
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Shots Attempted</span>
                </label>
                <input
                    type="number"
                    placeholder="Enter shots attempted"
                    className="input input-bordered w-full max-h-11"
                    onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            "shots-attempted": e.target.value,
                        }));
                    }}
                />
            </div>

            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Fouls</span>
                </label>
                <input
                    type="number"
                    placeholder="Enter fouls"
                    className="input input-bordered w-full max-h-11"
                    onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            "fouls": e.target.value,
                        }));
                    }}
                />
            </div>            
        </div>


            <div className="form-control mt-6">
              <button type="submit" onClick={handleCreate} className="btn btn-primary max-h-11">Create Performance</button>
            </div>
        </form>
    </div>
  )
}

export default CreateBasketball