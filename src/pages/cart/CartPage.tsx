import { useNavigate } from 'react-router-dom'
import { X, Minus, Plus } from 'lucide-react'
import { useCartStore } from '../../stores/cartStores'
import { productsList } from '../../lib/mockData'
import { useState } from 'react'
import { CheckoutSheet } from './CheckoutSheet'
import { OrderStatus } from '../../types/domain'

import successLogo  from '../../assets/success.svg'
import { OrderFailedModal } from './OrderFailedPage'

export function CartPage() {
    const navigate = useNavigate()
    const items = useCartStore((s) => s.items)
    const updateQty = useCartStore((s) => s.updateQty)
    const checkout = useCartStore((s) => s.checkout)

    const orderStatus = useCartStore((s) => s.orderStatus)
  const clear = useCartStore((s) => s.clear)


    const [showCheckout, setShowCheckout] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const cartProducts = items
        .map((item) => ({
            ...item,
            product: productsList.find((p) => String(p.id) === item.productId),
        }))
        .filter((item) => item.product)

    const total = cartProducts.reduce((sum, item) => {
        const price = Number(item.product!.price.replace('$', ''))
        return sum + price * item.quantity
    }, 0)

    const handlePlaceOrder = async () => {
        setIsLoading(true)
        await checkout()
        setIsLoading(false)
        setShowCheckout(false)
    }
    
    // ── Success ──
  if (orderStatus === OrderStatus.Success) {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-white px-8 text-center">
  
        {/* 🔥 Image */}
        <img
          src={successLogo}
          alt="Order Success"
          className="mb-6 w-40 md:w-48 object-contain"
        />
      
        <div className="relative mb-8">
          <div className="absolute -top-6 -left-6 h-3 w-3 rounded-full bg-green-300" />
          <div className="absolute -top-2 -right-4 h-2 w-2 rounded-full bg-yellow-300" />
          <div className="absolute -bottom-2 -left-8 h-2 w-2 rounded-full bg-pink-300" />
          <div className="absolute -bottom-4 right-2 h-3 w-3 rounded-full bg-blue-300" />
          <div className="absolute top-4 -right-8 h-2 w-2 rounded-full bg-purple-300" />
        </div>
      
        <h1 className="text-heading mb-3 mt-3 text-gray-900">
          Your Order has been accepted
        </h1>
      
        <p className="text-subheading mb-12 text-gray-400">
          Your items have been placed and is on its way to being processed
        </p>
      
        <div className="flex w-full flex-col gap-3">
          <button onClick={() => { clear(); navigate('/home') }} className="btn-primary">
            Track Order
          </button>
          <button onClick={() => { clear(); navigate('/home') }} className="py-4 text-sm font-medium text-gray-400">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  // ── Failed ──
  if (orderStatus === OrderStatus.Failed) {
    return (
        <OrderFailedModal
        isLoading={isLoading}
        onRetry={async () => {
          await handlePlaceOrder()
        }}
        onClose={() => {
          clear()
          navigate('/home')
        }}
      />
    )
  }

    return (
        <div className="flex h-[90vh] flex-col overflow-hidden bg-white md:bg-[#f5f5f5]">

            {/* Header */}
            <div className="px-5 pt-6 shrink-0">
                <h1 className="mb-4 text-center text-[20px] text-gray-900">My Cart</h1>
                <div className="h-px bg-gray-100" />
            </div>

            {cartProducts.length === 0 ? (
                <div className="flex flex-1 items-center justify-center text-gray-400">
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-5xl">🛒</span>
                        <p className="text-sm">Your cart is empty</p>
                        <button
                            onClick={() => navigate('/home')}
                            className="mt-2 text-sm font-semibold text-[#53b175]"
                        >
                            Start Shopping
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {/* ✅ Scroll ONLY here */}
                    <div className="flex-1 min-h-0 overflow-y-auto px-5 divide-y divide-gray-100">
                        {cartProducts.map(({ productId, quantity, product }) => {
                            const price = Number(product!.price.replace('$', ''))
                            return (
                                <div key={productId} className="flex items-center gap-4 py-4">

                                    {/* Image */}
                                    <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center text-4xl">
                                        {product!.image}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-900">
                                            {product!.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {product!.desc}
                                        </p>

                                        <div className="mt-2 flex items-center gap-3">
                                            <button
                                                onClick={() => updateQty(productId, quantity - 1)}
                                                className="flex h-7 w-7 items-center justify-center rounded-[17px]  border border-gray-200"
                                            >
                                                <Minus className="h-3 w-3 text-gray-500" />
                                            </button>

                                            <span className="text-sm font-semibold text-gray-900">
                                                {quantity}
                                            </span>

                                            <button
                                                onClick={() => updateQty(productId, quantity + 1)}
                                                className="flex h-7 w-7 items-center justify-center rounded-[17px]  border border-gray-200"
                                            >
                                                <Plus className="h-3 w-3 text-[#53b175]" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price + remove */}
                                    <div className="flex flex-col items-end gap-3">
                                        <button
                                            onClick={() => updateQty(productId, 0)}
                                            className="text-gray-300 hover:text-gray-500"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>

                                        <span className="text-sm font-bold text-gray-900">
                                            ${(price * quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* ✅ Always bottom */}
                    <div className="sm:fixed sm:bottom-12 sm:left-0 sm:right-0 md:relative md:bottom-0 border-t border-gray-100 px-5 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
                        <button
                            onClick={() => setShowCheckout(true)}
                            className="btn-primary relative flex w-full items-center justify-center px-4"
                        >
                            {/* Center text */}
                            <span>Go to Checkout</span>

                            {/* Right aligned price */}
                            <span className="absolute right-4 rounded-lg bg-white/20 px-2 py-0.5 text-sm font-bold">
                                ${total.toFixed(2)}
                            </span>
                        </button>
                        </div>
                        
                        {showCheckout && (
  <CheckoutSheet
    total={total}
    isLoading={isLoading}
    onClose={() => setShowCheckout(false)}
    onPlaceOrder={handlePlaceOrder}
  />
)}
                </>
            )}
        </div>
    )
}