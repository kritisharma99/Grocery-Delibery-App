import { X, ChevronRight } from 'lucide-react'


interface CheckoutSheetProps {
  total: number
  isLoading: boolean
  onClose: () => void
  onPlaceOrder: () => void
}

export function CheckoutSheet({ total, isLoading, onClose, onPlaceOrder }: CheckoutSheetProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-40 bg-black/30"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-white px-5 pt-4 pb-24 shadow-[0_-4px_24px_rgba(0,0,0,0.12)]">

        {/* Handle */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-200" />

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Checkout</h2>
          
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center"
          >
            <X className="h-4 w-4 text-gray-900" />
          </button>
        </div>

        <div className="h-px bg-gray-100 mb-2" />

        {/* Rows */}
        <div className="space-y-4 mb-2">
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-gray-400">Delivery</span>
            <button className="flex items-center gap-1 text-sm font-medium text-gray-800">
              Select Method <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          <div className="h-px bg-gray-100" />

          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-gray-400">Payment</span>
            <button className="flex items-center gap-2 text-sm font-medium text-gray-800">
              <span className="flex h-6 w-9 items-center justify-center rounded bg-blue-600 text-[10px] font-bold text-white">
                VISA
              </span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          <div className="h-px bg-gray-100" />

          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-gray-400">Promo Code</span>
            <button className="flex items-center gap-1 text-sm font-medium text-gray-800">
              Pick discount <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          <div className="h-px bg-gray-100" />

          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-gray-400">Total Cost</span>
            <button className="flex items-center gap-1 text-sm font-bold text-gray-900">
              ${total.toFixed(2)} <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>

        <p className="my-5 text-xs text-gray-400">
          By placing an order you agree to our{' '}
          <span className="font-semibold text-gray-700">Terms</span> And{' '}
          <span className="font-semibold text-gray-700">Conditions</span>
        </p>

        <button
          onClick={onPlaceOrder}
          disabled={isLoading}
          className="btn-primary sm:fixed sm:bottom-12 md:relative md: bottom-0 "
        >
          {isLoading ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </>
  )
}