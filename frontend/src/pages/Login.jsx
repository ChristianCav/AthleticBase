import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import api from '../lib/axios.js'
import { Link } from 'react-router'
import Spinner from '../components/Spinner.jsx'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(!email.trim() || !password.trim()){
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try{
      const res = await api.post("/users/login", {email, password})
      if(res.data.token){
        localStorage.setItem("token", res.data.token)
      }
      if(res.data.user){
        localStorage.setItem("user", JSON.stringify(res.data.user))
      }
      console.log(res.data.token)
      console.log("Logged in!")
      toast.success("Logged in successfully!");
      navigate("/homepage");
    } 
    catch(error){
      console.log("Error logging in",error);
      if(error.response.status === 400){
        toast.error("Invalid Credentials");
      }
      else{
        toast.error("Failed to log in, try again later")
      }
    }
    finally{
      setLoading(false)
    }
  }
  return (
      <div className="min-h-screen flex items-center justify-center">
      <div className="absolute top-0 -z-10 inset-0 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        {!loading && !user && <div className="card w-full mt-2 max-w-md bg-neutral-850" style={{ boxShadow: '0 10px 25px rgba(255, 255, 255, 0.5)' }}>
          <div className="card-body text-white">
            <h2 className="card-title justify-center">Log In</h2>
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
                  placeholder="Enter your password"
                  className="input input-bordered max-h-11"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary max-h-11">Log In</button>
              </div>
            </form>
          </div>
        </div>}
        {user && !loading && 
        <div className='text-white text-xl flex flex-col gap-y-5 items-center justify-center'>
          Oops, you are logged in already...
          <Link to="/homepage" className='btn btn-bordered'>Your Performances</Link>
        </div>
        }
        {loading && 
        <div className='text-white text-xl flex flex-row gap-x-5 items-center justify-center'>
            <Spinner />
            Logging in...
        </div>
        }
      </div>
  )
}

export default Login