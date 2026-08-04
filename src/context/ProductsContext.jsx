import { createContext, useContext, useState, useEffect } from 'react'
import { fetchProducts } from '../utils/googleSheets'

const ProductsContext = createContext()

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load products:', err)
    } finally {
      setLoading(false)
    }
  }

  // Extract unique categories from products
  const categories = [...new Set(products.map(p => p.category))].map(name => ({
    name,
    image: products.find(p => p.category === name)?.image || '',
  }))

  return (
    <ProductsContext.Provider value={{
      products,
      categories,
      loading,
      error,
      refreshProducts: loadProducts,
    }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (!context) throw new Error('useProducts must be used within ProductsProvider')
  return context
}
