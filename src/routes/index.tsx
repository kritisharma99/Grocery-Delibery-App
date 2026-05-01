import { Navigate, Route, Routes } from 'react-router-dom'
import { OnboardingPage } from '../pages/OnboardingPage'
import { SignInPage } from '../pages/SignInPage'
import { SplashPage } from '../pages/SplashPage'
import {OtpPage}  from '../pages/OtpPage'
import { LocationPage } from '../pages/LocationPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/verification" element={<OtpPage />} />
      <Route path='/location' element={<LocationPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
