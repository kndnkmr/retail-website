import { Link } from 'react-router-dom'
import { Store, MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Store className="w-8 h-8 text-primary-400" />
              <span className="text-xl font-bold text-white">
                Gopal<span className="text-primary-400">Shop</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted neighborhood store bringing quality products at the best prices.
              Fresh groceries, daily essentials, and more — now order online!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-sm hover:text-primary-400 transition-colors">All Products</Link></li>
              <li><Link to="/cart" className="text-sm hover:text-primary-400 transition-colors">My Cart</Link></li>
              <li><Link to="/about" className="text-sm hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=Groceries" className="text-sm hover:text-primary-400 transition-colors">Groceries</Link></li>
              <li><Link to="/products?category=Fruits+%26+Vegetables" className="text-sm hover:text-primary-400 transition-colors">Fruits & Vegetables</Link></li>
              <li><Link to="/products?category=Dairy+%26+Bakery" className="text-sm hover:text-primary-400 transition-colors">Dairy & Bakery</Link></li>
              <li><Link to="/products?category=Beverages" className="text-sm hover:text-primary-400 transition-colors">Beverages</Link></li>
              <li><Link to="/products?category=Household" className="text-sm hover:text-primary-400 transition-colors">Household</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                <span className="text-sm">123 Market Street, Main Road, Bangalore - 560001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-sm">+91 9742306716</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-sm">gopalshop@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-sm">Mon-Sun: 8:00 AM - 10:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Gopal Shop. All rights reserved. | Made with ❤️ for our customers
          </p>
        </div>
      </div>
    </footer>
  )
}
