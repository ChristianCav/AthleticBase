import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import api from '../lib/axios.js';

const CreateSoccer = ({location, duration, title, date}) => {
  const [data, setData] = useState({
    "goals": 0,
    "assists": 0,
    "shots": 0,
    "shots-on-target": 0,
    "yellow-cards": 0,
    "red-cards": 0
  });
  const type = "Soccer"
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
                <span className="label-text">Goals</span>
              </label>
              <input
                type="number"
                placeholder="Enter goals"
                className="input input-bordered w-full max-h-11"
                onChange={(e) => {
                    setData(prev => ({
                        ...prev,
                        "goals": e.target.value,
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
                    <span className="label-text">Shots</span>
                </label>
                <input
                    type="number"
                    placeholder="Enter shots"
                    className="input input-bordered w-full max-h-11"
                    onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            "shots": e.target.value,
                        }));
                    }}
                />
            </div>

            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Shots on target</span>
                </label>
                <input
                    type="number"
                    placeholder="Enter SOT"
                    className="input input-bordered w-full max-h-11"
                    onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            "shots-on-target": e.target.value,
                        }));
                    }}
                />
            </div>
        </div>

        <div className="cards-container flex flex-row gap-x-6">
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Yellow Cards</span>
                </label>
                <input
                    type="number"
                    placeholder="Enter yellow cards"
                    className="input input-bordered w-full max-h-11"
                    onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            "yellow-cards": e.target.value,
                        }));
                    }}
                />
            </div>

            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Red Cards</span>
                </label>
                <input
                    type="number"
                    placeholder="Enter red cards"
                    className="input input-bordered w-full max-h-11"
                    onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            "red-cards": e.target.value,
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

export default CreateSoccer