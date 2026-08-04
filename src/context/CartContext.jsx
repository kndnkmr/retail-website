import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const getInitialCart = () => {
  try {
    const stored = localStorage.getItem('retailmart-cart')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.find(item => item.id === action.payload.id)
      if (existing) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }
      return [...state, { ...action.payload, qty: 1 }]
    }
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload)
    case 'INCREMENT': {
      return state.map(item =>
        item.id === action.payload
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    }
    case 'DECREMENT': {
      return state.map(item =>
        item.id === action.payload
          ? { ...item, qty: Math.max(1, item.qty - 1) }
          : item
      ).filter(item => item.qty > 0)
    }
    case 'CLEAR_CART':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], getInitialCart)

  useEffect(() => {
    localStorage.setItem('retailmart-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  const increment = (id) => dispatch({ type: 'INCREMENT', payload: id })
  const decrement = (id) => dispatch({ type: 'DECREMENT', payload: id })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      increment,
      decrement,
      clearCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
