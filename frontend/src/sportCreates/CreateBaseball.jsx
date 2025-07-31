import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import api from '../lib/axios.js';

const CreateBaseball = ({location, duration, title, date}) => {
  const [data, setData] = useState({
    "hits": 0,
    "at-bats": 0,
    "rbis": 0,
    "home-runs": 0,
  });
  const type = "Baseball"
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
                    <span className="label-text">Hits</span>
                </label>
                <input
                    type="number"
                    placeholder="Enter hits"
                    className="input input-bordered w-full max-h-11"
                    onChange={(e) => {
                        setData(prev => ({
                            ...prev,
                            "hits": Number(e.target.value),
                        }));
                    }}
                />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">At Bats</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Enter at bats"
                        className="input input-bordered w-full max-h-11"
                        onChange={(e) => {
                            setData(prev => ({
                                ...prev,
                                "at-bats": Number(e.target.value),
                            }));
                        }}
                    />
                </div>
            </div>

            <div className="shots-container flex flex-row gap-x-6">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">RBIs</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Enter RBIs"
                        className="input input-bordered w-full max-h-11"
                        onChange={(e) => {
                            setData(prev => ({
                                ...prev,
                                "rbis": Number(e.target.value),
                            }));
                        }}
                    />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Home Runs</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Enter home runs"
                        className="input input-bordered w-full max-h-11"
                        onChange={(e) => {
                            setData(prev => ({
                                ...prev,
                                "home-runs": Number(e.target.value),
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

export default CreateBaseball