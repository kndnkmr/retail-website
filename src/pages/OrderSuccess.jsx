import { Link } from 'react-router-dom'
import { CheckCircle, MessageCircle, Home } from 'lucide-react'
import { useSettings } from '../context/SettingsContext'

export default function OrderSuccess() {
  const { settings } = useSettings()

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />

      <h1 className="text-3xl font-bold text-gray-900">Order Placed Successfully!</h1>

      <p className="mt-4 text-gray-600 text-lg">
        Your order has been sent to us via WhatsApp. We'll confirm your order shortly and
        get it delivered to your doorstep.
      </p>

      <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
        <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
        <p className="text-green-800 font-medium">
          Check your WhatsApp to see the order message sent to us.
        </p>
        <p className="text-green-600 text-sm mt-1">
          If WhatsApp didn't open, you can reach us at {settings.phone}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/" className="btn-primary flex items-center gap-2">
          <Home className="w-4 h-4" /> Back to Home
        </Link>
        <Link to="/products" className="btn-secondary">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
