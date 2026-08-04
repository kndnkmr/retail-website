/**
 * Google Sheets Integration for Gopal Shop
 * 
 * HOW IT WORKS:
 * 1. The shop owner manages products in a Google Sheet
 * 2. The sheet is published to the web (File > Share > Publish to web > CSV)
 * 3. This utility fetches the CSV data and converts it to JSON for the website
 * 
 * SHEET COLUMNS (must be in this exact order):
 * id | name | category | price | originalPrice | quantity | image | description | inStock | rating | reviews
 */

// Replace this with your Google Sheet ID after creating it
// The Sheet ID is the long string in the URL: https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'
const SHEET_NAME = 'Products'
const CACHE_KEY = 'gopalshop-products-cache'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

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
    if (values.length < 3) continue // skip empty rows

    const product = {}
    headers.forEach((header, index) => {
      product[header] = values[index] || ''
    })

    // Convert to proper types
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

    // Only include products with a name
    if (parsed.name) {
      products.push(parsed)
    }
  }

  return products
}

function getCachedProducts() {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data
    }
  } catch {
    // ignore cache errors
  }
  return null
}

function setCachedProducts(products) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: products,
      timestamp: Date.now()
    }))
  } catch {
    // ignore storage errors
  }
}

export async function fetchProducts() {
  // Check cache first
  const cached = getCachedProducts()
  if (cached) return cached

  // If no sheet ID configured, fall back to local JSON
  if (SHEET_ID === 'YOUR_GOOGLE_SHEET_ID') {
    const localProducts = await import('../data/products.json')
    return localProducts.default
  }

  try {
    const url = getPublicCSVUrl(SHEET_ID, SHEET_NAME)
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.status}`)
    }

    const csvText = await response.text()
    const products = parseCSV(csvText)

    if (products.length > 0) {
      setCachedProducts(products)
      return products
    }

    // If sheet is empty, fall back to local
    throw new Error('No products found in sheet')
  } catch (error) {
    console.warn('Failed to fetch from Google Sheets, using local data:', error.message)
    // Fall back to local JSON
    const localProducts = await import('../data/products.json')
    return localProducts.default
  }
}

export function getSheetId() {
  return SHEET_ID
}

export function isSheetConfigured() {
  return SHEET_ID !== 'YOUR_GOOGLE_SHEET_ID'
}
