import { Navigate, Route, Routes } from 'react-router-dom'
import { OnboardingPage } from '../pages/OnboardingPage'
import { SignInPage } from '../pages/SignInPage'
import { SplashPage } from '../pages/SplashPage'
import { OtpPage } from '../pages/OtpPage'
import { LocationPage } from '../pages/LocationPage'
import { LoginPage } from '../pages/LoginPage'
import { SignupPage } from '../pages/SignupPage'
import { AppLayout } from '../components/layouts/AppLayout'
import { HomePage } from '../pages/HomePage'
import { ProductDetailPage } from '../pages/products/ProductDetailsPage'
import { CartPage } from '../pages/cart/CartPage'
import { FavouritePage } from '../pages/products/FavouritePage'
import { ExplorePage } from '../pages/products/ExploreProduct'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/verification" element={<OtpPage />} />
      <Route path='/location' element={<LocationPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route element={<AppLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favourite" element={<FavouritePage />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Route>
    </Routes>
  )
}
