import { create } from 'zustand'
import type { ProductCategory } from '../types/domain'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'

type ProductStore = {
  favorites: string[]
  filter: ProductCategory | 'all'
  toggleFavorite: (id: string) => void
  setFilter: (filter: ProductCategory | 'all') => void
}

export const useProductStore = create<ProductStore>()(
  devtools(
    persist(
      (set) => ({
        favorites: [],
        filter: 'all',

        toggleFavorite: (id) =>
          set(
            (state) => ({
              favorites: state.favorites.includes(id)
                ? state.favorites.filter((productId) => productId !== id)
                : [...state.favorites, id],
            }),
            false,
            'product/toggleFavorite'
          ),

        setFilter: (filter) =>
          set({ filter }, false, 'product/setFilter'),
      }),
      {
        name: 'product-storage',

        // ✅ persist both (these are user preferences)
        partialize: (state) => ({
          favorites: state.favorites,
          filter: state.filter,
        }),

        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: 'ProductStore' }
  )
)