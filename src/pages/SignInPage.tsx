import type { FormEvent } from 'react'
import onboardingArt from '../assets/Mask Group.svg'
import { useAuthStore } from '../stores/authStores'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useNavigate } from 'react-router-dom'

export function SignInPage() {
  const navigate = useNavigate();
  const phone = useAuthStore((state) => state.phone)
  const authLoadingProvider = useAuthStore((state) => state.authLoadingProvider)
  const setPhone = useAuthStore((state) => state.setPhone)
  const signInWithPhone = useAuthStore((state) => state.signInWithPhone)
  const signInWithProvider = useAuthStore((state) => state.signInWithProvider)

  // ✅ Loading helpers
  const isLoadingPhone = authLoadingProvider === 'phone'
  const isLoadingGoogle = authLoadingProvider === 'google'
  const isLoadingFacebook = authLoadingProvider === 'facebook'
  const isAnyLoading = authLoadingProvider !== null

  // ✅ Phone submit
  const handlePhoneSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!phone || phone.length < 8) {
      alert('Enter a valid phone number')
      return
    }

    try {
      await signInWithPhone(phone)
    } catch (error) {
      console.error(error)
      alert('Phone login failed')
    }
  }

  // ✅ Social login handler
  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      await signInWithProvider(provider)
    } catch (error) {
      console.error(error)
      alert('Login failed. Try again.')
    }
  }

  return (
    <main className="bg-app min-h-screen w-full md:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">

        {/* Left Image */}
        <article className="hidden h-full min-h-[520px] overflow-hidden md:rounded-3xl bg-white shadow-sm lg:block">
          <img
            src={onboardingArt}
            alt="Fresh groceries"
            className="h-full w-full object-cover"
          />
        </article>

        {/* Right Form */}
        <article className="mx-auto w-full max-w-md md:rounded-3xl bg-white shadow-sm sm:p-8">

          <img
            src={onboardingArt}
            alt="Fresh groceries"
            className="mb-6 h-[374px] w-full rounded-2xl object-cover lg:hidden"
          />

          <h1 className="text-3xl font-semibold text-slate-900 text-left p-6  md:text-center">
            Get your groceries 
            <br  /> 
            with nectar
          </h1>

          {/* 📱 Phone Login */}
          <form onSubmit={handlePhoneSubmit} className="px-6 space-y-4">

          <div className="flex items-center gap-2 border-b border-slate-300 pb-2 focus-within:border-green-500">
            <PhoneInput
              defaultCountry="IN"
              value={phone}
              onChange={(value) => setPhone(value || '')}
              placeholder="Phone number"
              className="w-full text-base outline-none"
            />
          </div>

            <button
              type="submit"
              disabled={isLoadingPhone}
              onClick={() => (phone || phone.length === 10) && navigate('/verification')}
              className="btn btn-primary w-full p-6  disabled:opacity-70"
            >
              {isLoadingPhone ? 'Please wait...' : 'Continue with Phone'}
            </button>
          </form>

          {/* Divider */}
          <p className="p-6 text-center text-xs text-slate-400">
            Or connect with social media
          </p>

          {/* 🌐 Social Login */}
          <div className="space-y-4 p-6 ">

          {/* Google */}
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled={isAnyLoading}
            className="flex w-full items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-[#5B86E5] to-[#4CA1AF] px-6 py-4 font-medium text-white shadow-md transition hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
          >
            <span className="text-base font-semibold">G</span>
            {isLoadingGoogle ? 'Connecting...' : 'Continue with Google'}
          </button>

          {/* Facebook */}
          <button
            type="button"
            onClick={() => handleSocialLogin('facebook')}
            disabled={isAnyLoading}
            className="flex w-full items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-[#667db6] to-[#5a67d8] px-6 py-4 text-10px font-medium text-white shadow-md transition hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
          >
            <span className="text-base font-semibold">F</span>
            {isLoadingFacebook ? 'Connecting...' : 'Continue with Facebook'}
          </button>

        </div>
        </article>
      </section>
    </main>
  )
}