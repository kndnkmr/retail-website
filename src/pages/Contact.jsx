import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { useSettings } from '../context/SettingsContext'

export default function Contact() {
  const { settings } = useSettings()

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi! I have a question about your products/services.')
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, '_blank')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600">
          Have questions? We'd love to hear from you. Reach out to us through any of
          the channels below.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Store Address</h3>
                  <p className="text-sm text-gray-600 mt-1">{settings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-50 rounded-lg">
                  <Phone className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Phone</h3>
                  <p className="text-sm text-gray-600 mt-1">{settings.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-50 rounded-lg">
                  <Mail className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Email</h3>
                  <p className="text-sm text-gray-600 mt-1">{settings.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-50 rounded-lg">
                  <Clock className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Working Hours</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {settings.workingHours}<br />
                    Delivery: {settings.deliveryHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-bold text-green-800 text-lg">Quick Connect on WhatsApp</h3>
            <p className="text-green-700 text-sm mt-2">
              The fastest way to reach us! Get instant replies for orders, queries, or feedback.
            </p>
            <button
              onClick={handleWhatsApp}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </button>
          </div>
        </div>

        {/* Map / Image */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <img
            src={settings.heroImage}
            alt="Our store"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="font-bold text-gray-900 text-lg">Visit Our Store</h3>
            <p className="text-gray-600 text-sm mt-2">
              Come visit us at our physical store. We'd love to meet you in person!
              Our friendly staff is always ready to help you find what you need.
            </p>
            <div className="mt-4 bg-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-700 font-medium">How to reach us:</p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
                {settings.landmark1 && <li>{settings.landmark1}</li>}
                {settings.landmark2 && <li>{settings.landmark2}</li>}
                {settings.landmark3 && <li>{settings.landmark3}</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
