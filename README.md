# Gopal Shop - Online Retail Store

A modern, responsive e-commerce website for Gopal Shop with WhatsApp-based ordering and Google Sheets product management.

**Live Site:** [https://kndnkmr.github.io/retail-website/](https://kndnkmr.github.io/retail-website/)

**Google Sheet (Product Management):** [Open Sheet](https://docs.google.com/spreadsheets/d/1xhW_FEdi-KjIHbWP6XyJx82LzQznE_tHRm2SlRo0Yp8/edit)

---

## Features

- Product catalog with categories, search, and sorting
- Shopping cart with quantity controls (persists in browser)
- WhatsApp checkout — order details sent directly to shop owner
- Floating WhatsApp button for quick contact
- Google Sheets integration — owner manages products & settings from a spreadsheet
- Fully responsive (mobile, tablet, desktop)
- Auto-deploys via GitHub Actions on every push
- No backend, no database, no paid services — 100% free

---

## Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Frontend | React 18 + Vite | Free |
| Styling | Tailwind CSS | Free |
| Routing | React Router v6 | Free |
| State | React Context + useReducer | Free |
| Icons | Lucide React | Free |
| Data Source | Google Sheets (CSV) with local JSON fallback | Free |
| Images | Unsplash / ImgBB | Free |
| Hosting | GitHub Pages | Free |
| CI/CD | GitHub Actions | Free |
| Order System | WhatsApp link API (wa.me) | Free |

---

## Complete Setup Guide (Step by Step)

### Step 1: Prerequisites

- A GitHub account ([github.com](https://github.com))
- A Google account (for Google Sheets)
- Node.js installed on your computer ([download](https://nodejs.org))
- Git installed ([download](https://git-scm.com))

### Step 2: Clone the Repository

```bash
git clone https://github.com/kndnkmr/retail-website.git
cd retail-website
npm install
```

### Step 3: Run Locally (for testing)

```bash
npm run dev
```
This opens the site at `http://localhost:5173/retail-website/`

### Step 4: Build for Production

```bash
npm run build
```
This creates a `dist/` folder with optimized files ready for hosting.

---

## Google Sheet Setup (One-Time, 5 Minutes)

This is how the shop owner manages everything without touching code.

### Step 1: Create Google Sheet

1. Go to [sheets.new](https://sheets.new) to create a new spreadsheet
2. Name it: **"Gopal Shop Products"**

### Step 2: Create the "Products" Tab

1. Rename the first tab (bottom of screen) to: **Products**
2. Add these headers in Row 1:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| id | name | category | price | originalPrice | quantity | image | description | inStock | rating | reviews |

3. Add products from Row 2 onwards:

| id | name | category | price | originalPrice | quantity | image | description | inStock | rating | reviews |
|----|------|----------|-------|---------------|----------|-------|-------------|---------|--------|---------|
| 1 | Basmati Rice | Groceries | 450 | 550 | 5 kg | (image url) | Long grain premium rice | TRUE | 4.5 | 128 |
| 2 | Fresh Apples | Fruits & Vegetables | 180 | 220 | 1 kg | (image url) | Organic apples | TRUE | 4.7 | 89 |

### Step 3: Create the "Settings" Tab

1. Click the **+** button at the bottom-left to add a new tab
2. Rename it to: **Settings**
3. Add `key` in cell A1 and `value` in cell B1
4. Add these rows (starting from A2):

| key | value |
|-----|-------|
| shopName | Gopal Shop |
| tagline | Your Trusted Neighborhood Store |
| whatsappNumber | 919742306716 |
| phone | +91 9742306716 |
| email | gopalshop@gmail.com |
| address | 123 Market Street, Main Road, Bangalore - 560001 |
| workingHours | Mon-Sun: 8:00 AM - 10:00 PM |
| deliveryHours | 9:00 AM - 9:00 PM |
| deliveryFee | 40 |
| freeDeliveryAbove | 500 |
| heroTitle | Fresh Groceries at Your Doorstep |
| heroSubtitle | Quality products at the best prices. Order now! |
| heroImage | https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop |
| landmark1 | 5 mins walk from Main Bus Stand |
| landmark2 | Near City Market Junction |
| landmark3 | Landmark: Next to State Bank |
| currency | ₹ |

### Step 4: Publish the Sheet to the Web

1. Open the Google Sheet
2. Go to **File → Share → Publish to web**
3. Choose **"Entire Document"** from the first dropdown
4. Choose **"Comma-separated values (.csv)"** from the second dropdown
5. Click **Publish** → click **OK**
6. Copy the published URL (you'll need this for the code)

### Step 5: Get the Sheet GIDs

1. Click on the **Products** tab → check URL for `gid=0` (first tab is always 0)
2. Click on the **Settings** tab → check URL for `gid=XXXXXXX` (e.g., `gid=745929028`)

### Step 6: Update the Code

Open `src/utils/googleSheets.js` and update these values:

```javascript
// Replace with your published URL base (everything before ?output=csv)
const PUBLISHED_BASE_URL = 'https://docs.google.com/spreadsheets/d/e/YOUR_PUBLISHED_KEY/pub'

// In getSettingsCSVUrl(), update the GID:
return `${PUBLISHED_BASE_URL}?gid=YOUR_SETTINGS_GID&single=true&output=csv`
```

### Step 7: Push Changes

```bash
git add .
git commit -m "Update Google Sheet connection"
git push origin main
```

The site auto-deploys within 30 seconds.

---

## How to Upload Product Images (Free)

The owner needs image URLs for each product. Here's how:

1. Take a photo of the product on your phone
2. Go to [imgbb.com](https://imgbb.com) (works on phone, no signup needed)
3. Click "Start uploading" → select the photo
4. After upload, click "Get share links"
5. Copy the **"Direct link"** (ends in .jpg or .png)
6. Paste it in the `image` column of the Google Sheet

**Other free image hosting options:**
- [PostImages](https://postimages.org)
- [Imgur](https://imgur.com)
- [Unsplash](https://unsplash.com) (for stock photos)

---

## Owner's Daily Usage Guide

### Managing Products

| I want to... | What to do |
|-------------|-----------|
| Add a new product | Add a new row in the Products tab |
| Change a price | Edit the `price` cell for that product |
| Put something on sale | Set `originalPrice` higher than `price` (shows discount badge) |
| Remove a product | Delete the row OR set `inStock` to `FALSE` |
| Change product photo | Upload new photo to imgbb.com, paste link in `image` column |
| Add a new category | Just type a new category name — it auto-appears on the website |
| Reorder products | Change the `id` numbers (lower IDs show first) |

### Managing Shop Settings

| I want to... | What to do |
|-------------|-----------|
| Change shop name | Edit `shopName` value in Settings tab |
| Change WhatsApp number | Edit `whatsappNumber` value (with country code, no +) |
| Change address | Edit `address` value |
| Change delivery fee | Edit `deliveryFee` value |
| Change free delivery threshold | Edit `freeDeliveryAbove` value |
| Change homepage text | Edit `heroTitle` and `heroSubtitle` values |
| Change contact email | Edit `email` value |
| Change working hours | Edit `workingHours` value |

**Important:** Changes appear on the website within 5 minutes (data is cached for performance).

---

## How WhatsApp Ordering Works

1. Customer visits the website
2. Adds products to cart
3. Clicks "Proceed to Checkout"
4. Fills in name, phone, address
5. Clicks "Place Order via WhatsApp"
6. WhatsApp opens with a pre-filled message containing:
   - Customer details
   - All ordered items with quantities
   - Subtotal, delivery fee, and grand total
7. Customer sends the message → Shop owner receives it on WhatsApp
8. Shop owner confirms and delivers

**No paid API needed** — uses the free `https://wa.me/` link format.

---

## GitHub Pages Hosting

### How it works
- Code lives on GitHub (free for public repos)
- GitHub Actions automatically builds and deploys on every push
- Site is served at: `https://kndnkmr.github.io/retail-website/`
- Free HTTPS included
- No expiration — stays live as long as the repo exists

### Deployment workflow
Located at `.github/workflows/deploy.yml`. Triggers on:
- Every push to `main` branch
- Manual trigger from Actions tab

### Custom Domain (Optional, paid)
To use your own domain (e.g., `gopalshop.com`):
1. Buy a domain (~₹500-800/year from GoDaddy, Namecheap, etc.)
2. Go to repo Settings → Pages → Custom domain
3. Add your domain and configure DNS as instructed

---

## Project Structure

```
retail-website/
├── .github/workflows/deploy.yml  # Auto-deploy to GitHub Pages
├── public/                        # Static assets
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── Footer.jsx            # Footer with contact info
│   │   ├── ProductCard.jsx       # Product card component
│   │   ├── WhatsAppButton.jsx    # Floating WhatsApp button
│   │   └── LoadingSpinner.jsx    # Loading indicator
│   ├── context/                  # State management
│   │   ├── CartContext.jsx       # Shopping cart logic
│   │   ├── ProductsContext.jsx   # Products data from Google Sheets
│   │   └── SettingsContext.jsx   # Shop settings from Google Sheets
│   ├── data/                     # Fallback data (used if Sheet fails)
│   │   ├── products.json         # Sample products
│   │   └── categories.json       # Product categories
│   ├── pages/                    # Website pages
│   │   ├── Home.jsx              # Homepage with hero, categories, featured
│   │   ├── Products.jsx          # All products with search & filters
│   │   ├── ProductDetail.jsx     # Single product page
│   │   ├── Cart.jsx              # Shopping cart
│   │   ├── Checkout.jsx          # Checkout form → WhatsApp
│   │   ├── OrderSuccess.jsx      # Order confirmation page
│   │   ├── About.jsx             # About the shop
│   │   └── Contact.jsx           # Contact information
│   ├── utils/
│   │   └── googleSheets.js       # Fetches data from Google Sheets
│   ├── App.jsx                   # Main app with routing
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Tailwind + custom styles
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── vite.config.js                # Vite build config
├── tailwind.config.js            # Tailwind CSS config
└── postcss.config.js             # PostCSS config
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Products not showing | Check if Google Sheet is published (File → Share → Publish to web) |
| Old data showing | Clear browser cache or wait 5 minutes for cache to expire |
| Images not loading | Make sure image URLs are direct links (ending in .jpg/.png) |
| WhatsApp not opening | Check `whatsappNumber` in Settings tab — should be country code + number, no + sign (e.g., 919742306716) |
| Site shows 404 | Go to repo Settings → Pages → Source should be "GitHub Actions" |
| Build failing | Check Actions tab for error logs. Usually a typo in code. |

---

## Learning Resources

If you want to understand how this was built:

| Topic | Resource |
|-------|----------|
| React | [react.dev](https://react.dev) |
| Tailwind CSS | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| Vite | [vitejs.dev](https://vitejs.dev) |
| React Router | [reactrouter.com](https://reactrouter.com) |
| GitHub Pages | [pages.github.com](https://pages.github.com) |
| GitHub Actions | [docs.github.com/actions](https://docs.github.com/en/actions) |

---

## License

This project is for Gopal Shop's personal commercial use.
