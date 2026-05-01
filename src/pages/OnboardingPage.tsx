import logo from '../assets/carrot.svg'
import { useNavigate } from 'react-router-dom'

export function OnboardingPage() {
  const navigate = useNavigate()

  return (
    <main className="bg-app flex h-screen w-full items-center justify-center overflow-hidden">
      <section
        aria-label="Welcome onboarding"
        className="relative h-screen w-full overflow-hidden bg-slate-900"
      >
        
        {/* Bottom Content */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 sm:px-7 md:px-10 pb-8 sm:pb-10 md:pb-12 pt-20 text-center text-white  w-full">
          
          {/* Logo */}
          <img
            src={logo}
            alt=""
            aria-hidden="true"
            className="mx-auto mb-4 w-8 sm:w-10 md:w-12"
          />

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            Welcome
            <br />
            to our store
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-sm sm:text-base text-white/80">
            Get your groceries in as fast as one hour
          </p>

          {/* Button */}
          <button
            type="button"
            aria-label="Get started"
            className="btn btn-primary mt-6 sm:mt-8 md:mt-10 w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base"
            onClick={() => navigate('/signin')}
          >
            Get Started
          </button>
        </div>
      </section>
    </main>
  )
}