import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStores'

export function LocationPage() {
  const setLocation = useAuthStore((s) => s.setLocation)
  const navigate = useNavigate()
  const [location, setLoc] = useState('')

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#f3f4f6] via-[#e5e7eb] to-[#fce7f3] px-5 py-6">
      <input
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-emerald-300"
        placeholder="Enter your address"
        value={location}
        onChange={(e) => setLoc(e.target.value)}
      />
      <button
        disabled={!location}
        onClick={() => {
          setLocation(location)
          navigate('/home')
        }}
      >
        Continue to app
            </button>
            </main>
  )
}
