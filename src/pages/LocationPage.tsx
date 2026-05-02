import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStores'
import { ChevronLeft } from 'lucide-react'
import { PageShell } from '../components/PageShell'

import mapLogo from "../assets/illustration.svg"

export function LocationPage() {
    const setLocation = useAuthStore((s) => s.setLocation)
    const navigate = useNavigate()
    const [zone, setZone] = useState('Banasree')
    const [area, setArea] = useState('')
    const [zoneOpen, setZoneOpen] = useState(false)
    const [areaOpen, setAreaOpen] = useState(false)

    const zones = ['Banasree', 'Gulshan', 'Dhanmondi', 'Mirpur', 'Uttara']
    const areas = ['Block A', 'Block B', 'Block C', 'Block D', 'Block E']

    return (
        <PageShell>
            <div className="relative z-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex h-10 w-10 items-center justify-center"
                >
                    <ChevronLeft className="h-6 w-6 text-gray-700" />
                </button>

                {/* Map Illustration */}
                <div className="mb-8 flex justify-center">
                    <img
                        src={mapLogo}
                        alt="Carrot logo"
                        className="h-14 w-auto object-contain"
                    />
                </div>

                {/* Title */}
                <h1 className="mb-2 text-center text-2xl font-semibold text-gray-900">
                    Select Your Location
                </h1>
                <p className="mb-10 text-center text-sm leading-relaxed text-gray-500">
                    Switch on your location to stay in tune with{'\n'}
                    what's happening in your area
                </p>

                {/* Form */}
                <div className="space-y-6">
                    {/* Your Zone Dropdown */}
                    <div>
                        <label className="mb-2 block text-sm text-gray-500">Your Zone</label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setZoneOpen(!zoneOpen)}
                                className="flex w-full items-center justify-between border-b border-gray-200 bg-transparent py-3 text-left text-base text-gray-900 outline-none transition focus:border-emerald-400"
                            >
                                <span>{zone}</span>
                                <ChevronLeft
                                    className={`h-5 w-5 text-gray-400 transition-transform ${zoneOpen ? 'rotate-90' : '-rotate-90'
                                        }`}
                                />
                            </button>
                            {zoneOpen && (
                                <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                                    {zones.map((z) => (
                                        <button
                                            key={z}
                                            onClick={() => {
                                                setZone(z)
                                                setZoneOpen(false)
                                            }}
                                            className={`w-full px-4 py-2.5 text-left text-sm transition hover:bg-gray-50 ${z === zone ? 'text-emerald-500' : 'text-gray-700'
                                                }`}
                                        >
                                            {z}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Your Area Dropdown */}
                    <div>
                        <label className="mb-2 block text-sm text-gray-500">Your Area</label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setAreaOpen(!areaOpen)}
                                className="flex w-full items-center justify-between border-b border-gray-200 bg-transparent py-3 text-left text-base outline-none transition focus:border-emerald-400"
                            >
                                <span className={area ? 'text-gray-900' : 'text-gray-400'}>
                                    {area || 'Types of your area'}
                                </span>
                                <ChevronLeft
                                    className={`h-5 w-5 text-gray-400 transition-transform ${areaOpen ? 'rotate-90' : '-rotate-90'
                                        }`}
                                />
                            </button>
                            {areaOpen && (
                                <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                                    {areas.map((a) => (
                                        <button
                                            key={a}
                                            onClick={() => {
                                                setArea(a)
                                                setAreaOpen(false)
                                            }}
                                            className={`w-full px-4 py-2.5 text-left text-sm transition hover:bg-gray-50 ${a === area ? 'text-emerald-500' : 'text-gray-700'
                                                }`}
                                        >
                                            {a}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    disabled={!zone}
                    onClick={() => {
                        setLocation(`${zone}${area ? ', ' + area : ''}`)
                        navigate('/home')
                    }}
                    className="mt-12 w-full rounded-full bg-emerald-400 py-4 text-base font-medium text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-500 disabled:opacity-50"
                >
                    Submit
                </button>
            </div>
        </PageShell>


    )
}
