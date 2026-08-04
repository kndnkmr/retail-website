import { MessageCircle } from 'lucide-react'
import { useSettings } from '../context/SettingsContext'

export default function WhatsAppButton() {
  const { settings } = useSettings()

  const handleClick = () => {
    const message = encodeURIComponent(`Hi! I have a query about products at ${settings.shopName}.`)
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  )
}
