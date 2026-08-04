/**
 * Google Sheets Integration for Gopal Shop
 * 
 * HOW IT WORKS:
 * 1. The shop owner manages products AND settings in a Google Sheet
 * 2. The sheet is published to the web (File > Share > Publish to web > CSV)
 * 3. This utility fetches data and converts it to JSON for the website
 * 
 * SHEET TABS:
 * - "Products" tab: id | name | category | price | originalPrice | quantity | image | description | inStock | rating | reviews
 * - "Settings" tab: key | value (shop name, phone, address, etc.)
 */

// Replace this with your Google Sheet ID after creating it
// The Sheet ID is the long string in the URL: https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'
const PRODUCTS_SHEET = 'Products'
const SETTINGS_SHEET = 'Settings'
const PRODUCTS_CACHE_KEY = 'gopalshop-products-cache'
const SETTINGS_CACHE_KEY = 'gopalshop-settings-cache'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Default settings (used when Google Sheet is not configured)
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
  heroSubtitle: 'Quality products at the best prices. Order now and get it delivered fresh to your home. Your trusted neighborhood store, now online!',
  heroImage: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop',
  landmark1: '5 mins walk from Main Bus Stand',
  landmark2: 'Near City Market Junction',
  landmark3: 'Landmark: Next to State Bank',
  currency: '₹',
}

function getPublicCSVUrl(sheetId, sheetName) {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`
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

function parseCSV(csvText) {
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

  const settings = {}
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length >= 2 && values[0]) {
      // key is column A, value is column B
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

  if (SHEET_ID === 'YOUR_GOOGLE_SHEET_ID') {
    const localProducts = await import('../data/products.json')
    return localProducts.default
  }

  try {
    const url = getPublicCSVUrl(SHEET_ID, PRODUCTS_SHEET)
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const csvText = await response.text()
    const products = parseCSV(csvText)

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

  if (SHEET_ID === 'YOUR_GOOGLE_SHEET_ID') {
    return DEFAULT_SETTINGS
  }

  try {
    const url = getPublicCSVUrl(SHEET_ID, SETTINGS_SHEET)
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const csvText = await response.text()
    const sheetSettings = parseSettingsCSV(csvText)

    // Merge with defaults (sheet values override defaults)
    const merged = { ...DEFAULT_SETTINGS, ...sheetSettings }
    setCache(SETTINGS_CACHE_KEY, merged)
    return merged
  } catch (error) {
    console.warn('Failed to fetch settings from Google Sheets:', error.message)
    return DEFAULT_SETTINGS
  }
}

export function getDefaultSettings() {
  return DEFAULT_SETTINGS
}

export function isSheetConfigured() {
  return SHEET_ID !== 'YOUR_GOOGLE_SHEET_ID'
}
