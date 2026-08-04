import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Shield, Clock, Tag } from 'lucide-react'
import { useProducts } from '../context/ProductsContext'
import { useSettings } from '../context/SettingsContext'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Home() {
  const { products, categories, loading } = useProducts()
  const { settings } = useSettings()
  const featuredProducts = products.slice(0, 8)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1 rounded-full mb-4">
                🎉 Free delivery on orders above {settings.currency}{settings.freeDeliveryAbove}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {settings.heroTitle}
              </h1>
              <p className="mt-4 text-lg text-blue-100 leading-relaxed">
                {settings.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/products" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                  Shop Now
                </Link>
                <Link to="/about" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Know More
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src={settings.heroImage}
                alt="Fresh groceries"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Delivery', desc: `On orders above ${settings.currency}${settings.freeDeliveryAbove}` },
              { icon: Shield, title: 'Secure Payment', desc: 'Cash on delivery available' },
              { icon: Clock, title: 'Same Day Delivery', desc: 'Order before 2 PM' },
              { icon: Tag, title: 'Best Prices', desc: 'Lowest price guaranteed' },
            ].map((feature, i) => (
              <div key={i} className="text-center p-4">
                <feature.icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800 text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop by Category</h2>
                <p className="text-gray-500 mt-1">Find what you need quickly</p>
              </div>
              <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {categories.map(cat => (
                <Link
                  key={cat.name}
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group text-center"
                >
                  <div className="relative overflow-hidden rounded-xl aspect-square mb-2">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-500 mt-1">Handpicked deals just for you</p>
            </div>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Order via WhatsApp</h2>
          <p className="mt-4 text-green-100 text-lg max-w-2xl mx-auto">
            Add products to your cart, checkout, and your order will be sent directly to us via WhatsApp.
            Simple, fast, and no app download needed!
          </p>
          <Link
            to="/products"
            className="mt-8 inline-block bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  )
}
