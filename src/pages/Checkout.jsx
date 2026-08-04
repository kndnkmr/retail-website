import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, MessageCircle, User, Phone, MapPin, FileText } from 'lucide-react'
import { useCart } from '../context/CartContext'

const WHATSAPP_NUMBER = '919742306716'

export default function Checkout() {
  const { cart, totalItems, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  })

  const [errors, setErrors] = useState({})

  const delivery = totalPrice >= 500 ? 0 : 40
  const grandTotal = totalPrice + delivery

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.phone.trim()) errs.phone = 'Phone number is required'
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) errs.phone = 'Enter a valid 10-digit phone number'
    if (!form.address.trim()) errs.address = 'Delivery address is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    // Build WhatsApp message
    let message = `🛒 *New Order from RetailMart*\n\n`
    message += `👤 *Customer:* ${form.name}\n`
    message += `📞 *Phone:* ${form.phone}\n`
    message += `📍 *Address:* ${form.address}\n`
    if (form.notes) message += `📝 *Notes:* ${form.notes}\n`
    message += `\n---\n*Order Items:*\n\n`

    cart.forEach((item, i) => {
      message += `${i + 1}. ${item.name} (${item.quantity})\n`
      message += `   Qty: ${item.qty} × ₹${item.price} = ₹${item.qty * item.price}\n\n`
    })

    message += `---\n`
    message += `📦 *Subtotal:* ₹${totalPrice}\n`
    message += `🚚 *Delivery:* ${delivery === 0 ? 'FREE' : '₹' + delivery}\n`
    message += `💰 *Total:* ₹${grandTotal}\n\n`
    message += `Thank you for ordering! 🙏`

    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`

    // Open WhatsApp
    window.open(whatsappURL, '_blank')

    // Clear cart and redirect
    clearCart()
    navigate('/order-success')
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">No items in cart</h2>
        <Link to="/products" className="mt-4 inline-block btn-primary">Shop Now</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/cart" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Details</h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4" /> Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.name ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Phone className="w-4 h-4" /> Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Enter 10-digit phone number"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.phone ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="w-4 h-4" /> Delivery Address
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Enter your full delivery address"
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${
                    errors.address ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              {/* Notes */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <FileText className="w-4 h-4" /> Order Notes (Optional)
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Any special instructions for delivery..."
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all text-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Place Order via WhatsApp
          </button>

          <p className="text-center text-xs text-gray-500">
            Clicking this will open WhatsApp with your complete order details pre-filled
          </p>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 py-2 border-b last:border-0">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.qty} × ₹{item.price}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">₹{item.qty * item.price}</p>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className={delivery === 0 ? 'text-green-600 font-medium' : ''}>
                  {delivery === 0 ? 'FREE' : `₹${delivery}`}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
