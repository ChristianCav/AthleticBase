import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import api from '../lib/axios.js'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(!email.trim() || !password.trim() || !username.trim()){
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try{
      const res = await api.post("/users/signup", {username, email, password})
      if(res.data.token){
        localStorage.setItem("token", res.data.token)
      }
      if(res.data.user){
        localStorage.setItem("user", JSON.stringify(res.data.user))
      }
      console.log(res.data.token)
      toast.success("Account created successfully!");
      navigate("/homepage");
    } 
    catch(error){
      console.log("Error creating account",error);
      toast.error("Failed to create account, try again later")
    }
    finally{
      setLoading(false)
    }
  }
  return (
      <div className="min-h-screen flex items-center justify-center">
      <div className="absolute top-0 -z-10 inset-0 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="card w-full mt-2 max-w-md bg-neutral-850" style={{ boxShadow: '0 10px 25px rgba(255, 255, 255, 0.5)' }}>
          <div className="card-body text-white">
            <h2 className="card-title justify-center">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered max-h-11"
                  onChange={(e) =>{
                    setEmail(e.target.value)
                  }}
                  required
                />
              </div>

              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="input input-bordered max-h-11"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Create a username"
                  className="input input-bordered max-h-11"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary max-h-11">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default SignUp





