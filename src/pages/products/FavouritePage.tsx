// pages/FavouritePage.tsx
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useProductStore } from '../../stores/productStores'
import { useCartStore } from '../../stores/cartStores'
import { productsList } from '../../lib/mockData'

export function FavouritePage() {
  const navigate = useNavigate()
  const favorites = useProductStore((s) => s.favorites)
  const addToCart = useCartStore((s) => s.addToCart)

  const favoriteProducts = productsList.filter((p) =>
    favorites.includes(String(p.id))
  )

  const handleAddAllToCart = () => {
    favoriteProducts.forEach((p) => addToCart(String(p.id)))
  }

  return (
    <div className="flex min-h-screen flex-col bg-white px-5 pt-6 md:bg-[#f5f5f5]">
      <h1 className="text-heading mb-6 text-center text-gray-900">Favourites</h1>
      <div className="h-px bg-gray-100" />
      {favoriteProducts.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-gray-400">
          <span className="text-5xl">🤍</span>
          <p className="text-sm">No favourites yet</p>
          <button
            onClick={() => navigate('/home')}
            className="mt-2 text-sm font-semibold text-[#53b175]"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <>
          {/* Items list */}
          <div className="flex-1 divide-y divide-gray-100">
            {favoriteProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="flex w-full items-center gap-4 py-4 text-left"
              >
                {/* Image */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center text-4xl">
                  {product.image}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.desc}</p>
                </div>

                {/* Price + chevron */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">{product.price}</span>
                  <ChevronRight className="h-4 w-4 text-gray-700" />
                </div>
              </button>
            ))}
          </div>

          {/* Add all to cart */}
          <div className="pb-8 pt-4">
            <button
              onClick={handleAddAllToCart}
              className="btn-primary"
            >
              Add All To Cart
            </button>
          </div>
        </>
      )}
    </div>
  )
}