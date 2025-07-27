import React from 'react'

const LandingPage = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative pt-16">
      
      <div className="absolute top-0 -z-10 inset-0 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="text-center max-w-lg px-6 mt-16 pt-4 mb-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-200">
          Track Your Game. Improve Your Game.
        </h1>
        <p className="text-[19px] text-gray-400 mb-8">
          Log your performances in all forms of physical activity. Whether it's soccer, golf, or anything in between, you can log it.
        </p>
      </div>

      <div className="max-w-3xl text-center border-t border-gray-300 pt-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">What is AthleticBase?</h2>
        <p className="text-gray-400 mb-16">
          Whether you're a casual athlete or training competitively, AthleticBase helps you 
          stay on top of your game by organizing all your performance data in one place.
        </p>
      
        <div className="grid sm:grid-cols-2 gap-8 text-left text-gray-700 mb-20">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-center text-gray-300">⚽ Multi-Sport Tracking</h3>
            <p className='text-center text-gray-400'>Log activities like soccer, golf, runs, or workouts — each with sport-specific stats.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-center text-gray-300">📈 Performance Insights</h3>
            <p className='text-center text-gray-400'>Track your progress over time and get insights into how you're improving.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-center text-gray-300">🌐 Cloud-Synced</h3>
            <p className='text-center text-gray-400'>Access your data from any device, anytime — safely stored in the cloud.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-center text-gray-300">🔒 Simple & Private</h3>
            <p className='text-center text-gray-400'>No clutter. No noise. Just your performances, clean and secure.</p>
          </div>
        </div>
      </div>


    </div>
  );
}


export default LandingPage