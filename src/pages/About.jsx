import { Users, Award, Clock, Heart } from 'lucide-react'

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">About Gopal Shop</h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          We are your trusted neighborhood store that has been serving the community
          for years. Now we're bringing the same quality and trust online,
          making it easier for you to shop from the comfort of your home.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Users, value: '5000+', label: 'Happy Customers' },
          { icon: Award, value: '10+', label: 'Years Experience' },
          { icon: Clock, value: '1 Hour', label: 'Avg Delivery Time' },
          { icon: Heart, value: '100%', label: 'Quality Products' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm border">
            <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Story */}
      <div className="mt-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop"
            alt="Our store"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Gopal Shop started as a small kirana store in the heart of the city. Over the years,
            we've grown by staying true to our values — fresh products, honest pricing, and
            genuine customer care.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Today, we bring that same experience to your fingertips. Browse our catalog,
            add items to your cart, and place your order via WhatsApp. It's that simple!
            No complicated apps, no hidden charges.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            We believe in building relationships, not just transactions. Every order is
            personally checked for quality before delivery.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Promise</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Fresh & Quality',
              desc: 'We source directly from farms and trusted suppliers. Every product is quality checked before it reaches you.',
            },
            {
              title: 'Best Prices',
              desc: 'We keep our margins low so you always get the best prices. No hidden fees, what you see is what you pay.',
            },
            {
              title: 'Fast Delivery',
              desc: 'Same-day delivery for orders placed before 2 PM. We know you need your groceries fresh and fast.',
            },
          ].map((value, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-bold text-gray-900">{value.title}</h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
