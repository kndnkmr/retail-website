import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, removeFromCart, increment, decrement, totalItems, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="mt-6 inline-block btn-primary">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/products" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({totalItems} items)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border p-4 flex gap-4">
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-semibold text-gray-800 hover:text-primary-600 transition-colors truncate">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500">{item.quantity}</p>
                <p className="text-lg font-bold text-gray-900 mt-1">₹{item.price}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => decrement(item.id)}
                      className="p-1.5 hover:bg-gray-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 font-semibold text-sm">{item.qty}</span>
                    <button
                      onClick={() => increment(item.id)}
                      className="p-1.5 hover:bg-gray-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="hidden sm:block text-right">
                <p className="font-bold text-gray-900">₹{item.price * item.qty}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className={totalPrice >= 500 ? 'text-green-600 font-medium' : ''}>
                  {totalPrice >= 500 ? 'FREE' : '₹40'}
                </span>
              </div>
              {totalPrice < 500 && (
                <p className="text-xs text-primary-600 bg-primary-50 p-2 rounded-lg">
                  Add ₹{500 - totalPrice} more for free delivery!
                </p>
              )}
              <div className="border-t pt-3 flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span>₹{totalPrice >= 500 ? totalPrice : totalPrice + 40}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-6 btn-primary w-full block text-center"
            >
              Proceed to Checkout
            </Link>

            <p className="text-xs text-gray-400 text-center mt-3">
              Order will be sent via WhatsApp
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
