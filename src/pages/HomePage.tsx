import { useEffect, useState, useMemo } from 'react'
import { useAuthStore } from '../stores/authStores'
import { Search, ChevronDown } from 'lucide-react'
import MapIcon from '../assets/map.svg'
import carrotLogo from "../assets/carrot 3.svg"
import ProductCard from '../components/ProductCard'
import CardSkeletonLoader from '../components/common/CardSkeletonLoader'

const banners = [
  { id: 1, title: 'Fresh Vegetables', subtitle: 'Get Up To 40% OFF', bg: 'from-green-50 to-green-100', textColor: 'text-green-600' },
  { id: 2, title: 'Fresh Fruits', subtitle: 'Get Up To 30% OFF', bg: 'from-orange-50 to-orange-100', textColor: 'text-orange-500' },
]

const exclusiveOffers = [
  { id: 1, name: 'Organic Bananas', desc: '7pcs, Priceg', price: '$4.99', image: '🍌', category: 'fruits' },
  { id: 2, name: 'Red Apple', desc: '1kg, Priceg', price: '$4.99', image: '🍎', category: 'fruits' },
  { id: 3, name: 'Bell Pepper', desc: '1kg, Priceg', price: '$3.99', image: '🫑', category: 'vegetables' },
  { id: 4, name: 'Ginger', desc: '250g, Price', price: '$2.99', image: '🫚', category: 'vegetables' },
]

const bestSelling = [
  { id: 5, name: 'Red Capsicum', desc: '500g, Priceg', price: '$1.50', image: '🌶️', category: 'vegetables' },
  { id: 6, name: 'Broccoli', desc: '1kg, Priceg', price: '$2.99', image: '🥦', category: 'vegetables' },
  { id: 7, name: 'Avocado', desc: '1pc, Priceg', price: '$3.49', image: '🥑', category: 'fruits' },
  { id: 8, name: 'Watermelon', desc: '1pc, Priceg', price: '$5.99', image: '🍉', category: 'fruits' },
]

export function HomePage() {
  const user = useAuthStore((s) => s.user)

  const [activeBanner, setActiveBanner] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // 🔥 Combine all products
  const allProducts = useMemo(() => {
    return [...exclusiveOffers, ...bestSelling]
  }, [])

  // 🔥 Filter products
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return []

    const query = searchQuery.toLowerCase()

    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
    )
  }, [searchQuery, allProducts])

  return (
    <div className="min-h-screen bg-white md:bg-[#f5f5f5]">
      <div className="mx-auto max-w-lg px-5 md:max-w-none md:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col items-center pt-6">
          <div className="mb-2 flex justify-center">
            <img src={carrotLogo} alt="logo" className="h-[30px] w-[26px]" />
          </div>

          <button className="flex items-center gap-1 text-sm text-gray-500">
            <img src={MapIcon} alt="map" className="h-[15px] w-[15px]" />
            <span className="font-medium text-gray-800">
              {user?.location}
            </span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* ── Search ── */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Store"
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>

        {/* ── Banner ── */}
        <div className="mt-5">
          <div className={`relative rounded-2xl bg-gradient-to-r ${banners[activeBanner].bg} px-5 py-6`}>
            <div className="max-w-[55%]">
              <p className="text-xs text-gray-500">Starting from</p>
              <h2 className="text-xl font-bold">{banners[activeBanner].title}</h2>
              <p className={`${banners[activeBanner].textColor}`}>
                {banners[activeBanner].subtitle}
              </p>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl">
              🥦
            </div>
          </div>

          <div className="mt-3 flex justify-center gap-1.5">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveBanner(i)}
                className={`h-2 rounded-full ${
                  i === activeBanner ? 'w-5 bg-green-500' : 'w-2 bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 🔍 SEARCH MODE */}
        {searchQuery ? (
          <section className="mt-6 pb-8">
            <h2 className="text-head mb-3">Search Results</h2>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-gray-400 mt-6">
                No products found
              </p>
            )}
          </section>
        ) : (
          <>
            {/* ── Exclusive Offer ── */}
            <section className="mt-6">
              <div className="flex justify-between">
                <h2 className="text-head">Exclusive Offer</h2>
                <button className="text-green-600">See all</button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <CardSkeletonLoader key={i} />
                    ))
                  : exclusiveOffers.map((p) => (
                      <ProductCard key={p.id} {...p} />
                    ))}
              </div>
            </section>

            {/* ── Best Selling ── */}
            <section className="mt-6 pb-8">
              <div className="flex justify-between">
                <h2 className="text-head">Best Selling</h2>
                <button className="text-green-600">See all</button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <CardSkeletonLoader key={i} />
                    ))
                  : bestSelling.map((p) => (
                      <ProductCard key={p.id} {...p} />
                    ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}