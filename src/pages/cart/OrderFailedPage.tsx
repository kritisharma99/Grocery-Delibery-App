import { X } from 'lucide-react'
import errorLogo from '../../assets/error page.svg'

interface OrderFailedModalProps {
  isLoading: boolean
  onRetry: () => void
  onClose: () => void
}

export function OrderFailedModal({ isLoading, onRetry, onClose }: OrderFailedModalProps) {
    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={onClose}
        />
  
        {/* Modal Wrapper */}
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          
          {/* Modal */}
          <div className="
            w-full max-w-sm md:max-w-md
            rounded-3xl bg-white px-6 pb-8 pt-5 shadow-2xl
          ">
            
            {/* Close */}
            <button
              onClick={onClose}
              className="mb-2 flex h-8 w-8 items-center justify-center"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
  
            {/* Illustration */}
            <div className="mx-auto mb-6 flex h-40 w-40 items-center justify-center rounded-full bg-green-50">
              <img
                src={errorLogo}
                alt="Order Failed"
                className="h-24 w-24 object-contain"
              />
            </div>
  
            {/* Text */}
            <h2 className="text-heading mb-2 text-gray-900 mt-3">
              Oops! Order Failed
            </h2>
  
            <p className="text-subheading mb-8 text-gray-400">
              Something went terribly wrong.
            </p>
  
            {/* Buttons */}
            <button
              onClick={onRetry}
              disabled={isLoading}
              className="btn-primary mb-3"
            >
              {isLoading ? 'Retrying...' : 'Please Try Again'}
            </button>
  
            <button
              onClick={onClose}
              className="w-full text-center text-sm font-semibold text-gray-500"
            >
              Back to home
            </button>
          </div>
        </div>
      </>
    )
  }