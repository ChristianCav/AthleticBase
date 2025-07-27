import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import api from '../lib/axios.js'
import { Eye, EyeOff } from 'lucide-react'
import Spinner from '../components/Spinner.jsx'
import { Link } from 'react-router'


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = localStorage.getItem("user");

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(!email.trim() || !password.trim() || !username.trim() || !confirmed.trim()){
      toast.error("All fields are required");
      return;
    }

    if(password !== confirmed){
      toast.error("Passwords do not match, please try again");
      return
    }

    try{
      setLoading(true);
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
    }finally{
      setLoading(false)
    }
  }
  return (
      <div className="min-h-screen flex items-center justify-center">
      <div className="absolute top-0 -z-10 inset-0 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      {!loading && !user &&
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
                  className="input input-bordered max-h-10"
                  onKeyDown={(e) => {
                    if(e.key === ' '){
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) =>{
                    setEmail(e.target.value)
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
                  className="input input-bordered max-h-10"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
              </div>              

              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="input input-bordered max-h-10 w-full pr-12"
                    onKeyDown={(e) => {
                      if(e.key === ' '){
                        e.preventDefault();
                      }
                    }}                  
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                  <button type='button' className='absolute top-1/2 -translate-y-1/2 right-3' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="input input-bordered max-h-10 w-full pr-12"
                    onKeyDown={(e) => {
                      if(e.key === ' '){
                        e.preventDefault();
                      }
                    }}                  
                    onChange={(e) => {
                      setConfirmed(e.target.value);
                    }}
                    required
                  />
                  <button type='button' className='absolute top-1/2 -translate-y-1/2 right-3' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary max-h-10">Create Account</button>
              </div>
            </form>
          </div>
        </div>}
        {loading && 
          <div className='text-white text-xl flex flex-row gap-x-5 items-center justify-center'>
            <Spinner />
            Creating account...
          </div>}
        {!loading && user && <div className='text-white text-xl flex flex-col gap-y-5 items-center justify-center'>
          Oops, you are logged in already...
          <Link to="/homepage" className='btn btn-bordered'>Your Performances</Link>
        </div>
        }
      </div>
  )
}

export default SignUp





