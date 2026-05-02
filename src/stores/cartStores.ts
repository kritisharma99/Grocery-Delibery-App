import { create } from 'zustand'
import { fakeApi } from '../lib/fakeApi'
import { OrderStatus } from '../types/domain'
import type { CartItem } from '../types/domain'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'

type CartStore = {
  items: CartItem[]
  orderStatus: OrderStatus
  addToCart: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clear: () => void
  checkout: () => Promise<OrderStatus>
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        orderStatus: OrderStatus.Idle,

        addToCart: (productId) =>
          set((state) => {
            const item = state.items.find(
              (entry) => entry.productId === productId
            )

            if (item) {
              return {
                items: state.items.map((entry) =>
                  entry.productId === productId
                    ? { ...entry, quantity: entry.quantity + 1 }
                    : entry
                ),
              }
            }

            return {
              items: [...state.items, { productId, quantity: 1 }],
            }
          }, false, 'cart/addToCart'),

        updateQty: (productId, qty) =>
          set(
            (state) => ({
              items:
                qty <= 0
                  ? state.items.filter(
                      (entry) => entry.productId !== productId
                    )
                  : state.items.map((entry) =>
                      entry.productId === productId
                        ? { ...entry, quantity: qty }
                        : entry
                    ),
            }),
            false,
            'cart/updateQty'
          ),

        clear: () =>
          set(
            { items: [], orderStatus: OrderStatus.Idle },
            false,
            'cart/clear'
          ),

        checkout: async () => {
          set({ orderStatus: OrderStatus.Processing }, false, 'cart/checkout/start')

          await fakeApi(true, 1200)

          const success =
            get().items.length > 0 && Math.random() > 0.25

          const status = success
            ? OrderStatus.Success
            : OrderStatus.Failed

          set({ orderStatus: status }, false, 'cart/checkout/done')

          return status
        },
      }),
      {
        name: 'cart-storage',

        // ✅ persist only cart items
        partialize: (state) => ({
          items: state.items,
        }),

        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: 'CartStore' }
  )
)