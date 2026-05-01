import React from 'react'
import { useAuthStore } from '../stores/authStores'
import { useNavigate } from 'react-router-dom';

export function OtpPage() {
  const navigate = useNavigate();
  const phone = useAuthStore((s) => s.phone)
  const countryCode = useAuthStore((s) => s.countryCode)
  const verifyOtp = useAuthStore((s) => s.verifyOtp)
  const signInWithPhone = useAuthStore((s) => s.signInWithPhone)
  const authLoadingProvider = useAuthStore((s) => s.authLoadingProvider)

  const isLoading = authLoadingProvider === 'phone'

  const [otp, setOtp] = React.useState('')

  const isComplete = otp.length === 4

  const handleChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4)
    setOtp(cleaned)
  }

  const handleSubmit = async () => {
    if (!isComplete) return
  
    await verifyOtp()
  
    // Navigate after success
    navigate('/location')
  }

  const handleResend = async () => {
    const fullPhone = `${countryCode}${phone}`
    await signInWithPhone(fullPhone)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f3f4f6] via-[#e5e7eb] to-[#fce7f3] px-5 py-6">

      {/* Back */}
      <div className="mb-8 flex items-center">
        <button className="text-xl">←</button>
      </div>

      {/* Content */}
      <section className="mx-auto max-w-md">

        <h1 className="text-2xl font-semibold text-slate-900">
          Enter your 4-digit code
        </h1>

        <div className="mt-6 text-left">
          <label className="text-[16px] text-slate-500 text-left">Code</label>

          {/* OTP Input */}
          <input
            type="text"
            value={otp}
            onChange={(e) => handleChange(e.target.value)}
            className="mt-2 w-full border-b border-slate-300 bg-transparent pb-2 text-2xl tracking-[0.5em] outline-none focus:border-green-500"
            placeholder="----"
          />
        </div>
      </section>

      {/* Bottom */}
      <div className="absolute bottom-6 left-5 right-5 flex items-center justify-between">

        {/* Resend */}
        <button
          onClick={handleResend}
          disabled={isLoading}
          className="btn text-green-600 disabled:opacity-50"
          style={{ fontWeight: 400 }}
        >
          {isLoading ? 'Sending...' : 'Resend Code'}
        </button>

        {/* Mobile Arrow */}
        <button
          onClick={handleSubmit}
          disabled={!isComplete || isLoading}
          className="bg-[#53b175] flex h-[67px] w-[67px] items-center justify-center rounded-full text-white shadow-md disabled:opacity-40 md:hidden"
        >
          →
        </button>

        {/* Desktop */}
        <button
          onClick={handleSubmit}
          disabled={!isComplete || isLoading}
          className="hidden bg-[#53b175] rounded-xl px-6 py-3 text-white shadow-md disabled:opacity-40 md:block"
        >
          {isLoading ? 'Verifying...' : 'Proceed'}
        </button>
      </div>
    </main>
  )
}