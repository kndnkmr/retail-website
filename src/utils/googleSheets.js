/**
 * Google Sheets Integration for Gopal Shop
 * 
 * HOW IT WORKS:
 * 1. The shop owner manages products AND settings in a Google Sheet
 * 2. The sheet is published to the web (File > Share > Publish to web > CSV)
 * 3. This utility fetches data and converts it to JSON for the website
 * 
 * SHEET TABS:
 * - "Products" tab (gid=0): id | name | category | price | originalPrice | quantity | image | description | inStock | rating | reviews
 * - "Settings" tab (gid=second sheet): key | value (shop name, phone, address, etc.)
 */

// Published URL base (from File > Share > Publish to web)
// This is the part before ?output=csv
const PUBLISHED_BASE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS5-2j8EkJ-boATyK19kRUJ2xRHxFc4x-mQC0SJ-YMuhqqNaFsd5qrLtv2VcR96IzjioRclX1XKnOEI/pub'

const PRODUCTS_CACHE_KEY = 'gopalshop-products-cache'
const SETTINGS_CACHE_KEY = 'gopalshop-settings-cache'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Default settings (used when Settings tab doesn't exist or can't be fetched)
const DEFAULT_SETTINGS = {
  shopName: 'Gopal Shop',
  tagline: 'Your Trusted Neighborhood Store',
  whatsappNumber: '919742306716',
  phone: '+91 9742306716',
  email: 'gopalshop@gmail.com',
  address: '123 Market Street, Main Road, Bangalore - 560001',
  workingHours: 'Mon-Sun: 8:00 AM - 10:00 PM',
  deliveryHours: '9:00 AM - 9:00 PM',
  deliveryFee: '40',
  freeDeliveryAbove: '500',
  heroTitle: 'Fresh Groceries at Your Doorstep',
  heroSubtitle: 'Quality products at the best prices. Order now and get it delivered fresh to your home!',
  heroImage: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop',
  landmark1: '5 mins walk from Main Bus Stand',
  landmark2: 'Near City Market Junction',
  landmark3: 'Landmark: Next to State Bank',
  currency: '₹',
}

function getProductsCSVUrl() {
  return `${PUBLISHED_BASE_URL}?gid=0&single=true&output=csv`
}

function getSettingsCSVUrl() {
  // Settings tab GID (found in sheet URL when clicking the Settings tab)
  return `${PUBLISHED_BASE_URL}?gid=745929028&single=true&output=csv`
}

function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

function parseProductsCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim())
  if (lines.length < 2) return []

  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''))
  const products = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length < 3) continue

    const product = {}
    headers.forEach((header, index) => {
      product[header] = values[index] || ''
    })

    const parsed = {
      id: parseInt(product.id) || i,
      name: product.name || '',
      category: product.category || 'General',
      price: parseFloat(product.price) || 0,
      originalPrice: parseFloat(product.originalprice || product.price) || 0,
      quantity: product.quantity || '',
      image: product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop',
      description: product.description || '',
      inStock: (product.instock || 'true').toLowerCase() !== 'false',
      rating: parseFloat(product.rating) || 4.0,
      reviews: parseInt(product.reviews) || 0,
    }

    if (parsed.name) {
      products.push(parsed)
    }
  }

  return products
}

function parseSettingsCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim())
  if (lines.length < 2) return {}

  // Check if this is actually the Products sheet (wrong data)
  const firstHeader = parseCSVLine(lines[0])[0].toLowerCase().trim()
  if (firstHeader === 'id') return {} // This is the products sheet, not settings

  const settings = {}
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length >= 2 && values[0]) {
      const key = values[0].trim()
      const value = values[1].trim()
      if (key) settings[key] = value
    }
  }
  return settings
}

function getCache(key) {
  try {
    const cached = localStorage.getItem(key)
    if (!cached) return null
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data
    }
  } catch {
    // ignore
  }
  return null
}

function setCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }))
  } catch {
    // ignore
  }
}

export async function fetchProducts() {
  const cached = getCache(PRODUCTS_CACHE_KEY)
  if (cached) return cached

  if (!PUBLISHED_BASE_URL || PUBLISHED_BASE_URL.includes('YOUR_')) {
    const localProducts = await import('../data/products.json')
    return localProducts.default
  }

  try {
    const url = getProductsCSVUrl()
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const csvText = await response.text()
    const products = parseProductsCSV(csvText)

    if (products.length > 0) {
      setCache(PRODUCTS_CACHE_KEY, products)
      return products
    }
    throw new Error('No products found')
  } catch (error) {
    console.warn('Failed to fetch products from Google Sheets:', error.message)
    const localProducts = await import('../data/products.json')
    return localProducts.default
  }
}

export async function fetchSettings() {
  const cached = getCache(SETTINGS_CACHE_KEY)
  if (cached) return cached

  if (!PUBLISHED_BASE_URL || PUBLISHED_BASE_URL.includes('YOUR_')) {
    return DEFAULT_SETTINGS
  }

  try {
    const url = getSettingsCSVUrl()
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const csvText = await response.text()
    const sheetSettings = parseSettingsCSV(csvText)

    // If we got valid settings (not empty / not products data), merge with defaults
    if (Object.keys(sheetSettings).length > 0) {
      const merged = { ...DEFAULT_SETTINGS, ...sheetSettings }
      setCache(SETTINGS_CACHE_KEY, merged)
      return merged
    }

    // Settings tab doesn't exist yet, use defaults
    setCache(SETTINGS_CACHE_KEY, DEFAULT_SETTINGS)
    return DEFAULT_SETTINGS
  } catch (error) {
    console.warn('Failed to fetch settings from Google Sheets:', error.message)
    return DEFAULT_SETTINGS
  }
}

export function getDefaultSettings() {
  return DEFAULT_SETTINGS
}
