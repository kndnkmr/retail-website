import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Star, Package, Truck, Shield, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import products from '../data/products.json'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)

  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <Link to="/products" className="mt-4 inline-block btn-primary">Back to Products</Link>
      </div>
    )
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/products" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>

      {/* Product Detail */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 md:h-[500px] object-cover rounded-2xl shadow-lg"
          />
          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full w-fit">
            {product.category}
          </span>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
            {discount > 0 && (
              <>
                <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                  Save ₹{product.originalPrice - product.price}
                </span>
              </>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-2">Pack Size: {product.quantity}</p>

          {/* Description */}
          <p className="mt-6 text-gray-600 leading-relaxed">{product.description}</p>

          {/* Quantity Selector */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="p-2 hover:bg-gray-50 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 font-semibold text-gray-800 min-w-[40px] text-center">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="p-2 hover:bg-gray-50 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-6 btn-primary flex items-center justify-center gap-2 w-full md:w-auto"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart — ₹{product.price * qty}
          </button>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t pt-6">
            {[
              { icon: Package, label: 'Fresh Quality' },
              { icon: Truck, label: 'Free Delivery' },
              { icon: Shield, label: 'Secure Order' },
            ].map((feat, i) => (
              <div key={i} className="text-center">
                <feat.icon className="w-6 h-6 text-primary-600 mx-auto" />
                <span className="text-xs text-gray-600 mt-1 block">{feat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
