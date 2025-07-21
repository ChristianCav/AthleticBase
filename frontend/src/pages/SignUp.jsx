import React from 'react'

const SignUp = () => {
  return (
      <div className="min-h-screen flex items-center justify-center">
      <div className="absolute top-0 -z-10 inset-0 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="card w-full mt-2 max-w-md bg-neutral-850" style={{ boxShadow: '0 10px 25px rgba(255, 255, 255, 0.5)' }}>
          <div className="card-body text-white">
            <h2 className="card-title justify-center">Sign Up</h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className="input input-bordered"
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Create Account</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default SignUp





