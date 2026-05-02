import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStores'
import { PageShell } from '../components/PageShell'
import { Eye, EyeOff } from 'lucide-react'
import carrotLogo from "../assets/carrot 3.svg"

export function SignupPage() {
  const navigate = useNavigate()
  const signup = useAuthStore((s) => s.signup)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isValid = name.length > 0 && email.length > 0 && password.length > 0

  const handleSignup = async () => {
    if (!isValid) return
    setIsLoading(true)
    await signup(name, email)
    setIsLoading(false)
    navigate('/location')
  }

  return (
    <PageShell>
      <div className="flex min-h-screen flex-col px-6 py-4 md:min-h-full">

        {/* Carrot Logo */}
        <div className="mb-8 flex justify-center pt-8">
  <img
    src={carrotLogo}
    alt="Carrot logo"
    className="h-14 w-auto object-contain"
  />
</div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-heading mb-1 text-left text-gray-900">
            Sign Up
          </h1>
          <p className="text-subheading text-left text-gray-500">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">

          {/* Username */}
          <div>
            <label className="mb-2 block text-md text-gray-500">Username</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full border-b border-gray-200 bg-transparent py-3 text-base text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-[#53b175]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-md text-gray-500">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full border-b border-gray-200 bg-transparent py-3 text-base text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-[#53b175]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-md text-gray-500">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border-b border-gray-200 bg-transparent py-3 pr-10 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#53b175]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword
                  ? <Eye className="h-5 w-5" />
                  : <EyeOff className="h-5 w-5" />
                }
              </button>
            </div>
          </div>

          {/* Terms */}
          <p className="text-sm leading-relaxed text-gray-400 mb-2">
            By continuing you agree to our{' '}
            <button className="text-[#53b175] underline">Terms of Service</button>
            {' '}and{' '}
            <button className="text-[#53b175] underline">Privacy Policy</button>
          </p>

        </div>

        {/* Bottom */}
        <div className="mt-auto flex flex-col items-center gap-4 pb-6">

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            disabled={!isValid || isLoading}
            className="btn-primary"
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>

          {/* Login link */}
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-semibold text-[#53b175]"
            >
              Login
            </button>
          </p>

        </div>
      </div>
    </PageShell>
  )
}