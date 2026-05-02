import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import splashLogo from '../assets/Group 1.svg'

export function SplashPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const delay = prefersReducedMotion ? 0 : 1200
    const id = setTimeout(() => navigate('/onboarding', { replace: true }), delay)
    return () => clearTimeout(id)
  }, [navigate])

  return (
    <main
      aria-label="Splash screen"
      className="bg-green-600 text-on-primary flex min-h-screen items-center justify-center"
    >
      <img src={splashLogo} alt="Nectar logo" className="w-56 max-w-[80vw]" />
      <p className="sr-only">Loading app, redirecting to onboarding.</p>
    </main>
  )
}
