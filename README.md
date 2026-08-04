# Gopal Shop - Online Retail Store

A modern, responsive e-commerce website for Gopal Shop with WhatsApp-based ordering and Google Sheets product management.

**Live Site:** [https://kndnkmr.github.io/retail-website/](https://kndnkmr.github.io/retail-website/)

## Features

- Product catalog with categories, search, and sorting
- Shopping cart with quantity controls (persists in browser)
- WhatsApp checkout — order details sent directly to shop owner
- Floating WhatsApp button for quick contact
- Google Sheets integration — owner manages products from a spreadsheet
- Fully responsive (mobile, tablet, desktop)
- Auto-deploys via GitHub Actions on every push

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| State | React Context + useReducer |
| Icons | Lucide React |
| Data Source | Google Sheets (CSV) with local JSON fallback |
| Hosting | GitHub Pages (free) |
| CI/CD | GitHub Actions |

## Project Structure

```
src/
├── components/       # Reusable UI (Navbar, Footer, ProductCard, etc.)
├── context/          # CartContext, ProductsContext
├── data/             # Fallback products.json & categories.json
├── pages/            # Home, Products, ProductDetail, Cart, Checkout, About, Contact
└── utils/            # Google Sheets fetcher
```

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Product Management (Google Sheets)

The shop owner manages all products AND shop settings from a Google Sheet — no coding needed. **Zero developer involvement after initial setup.**

### Setup

1. Create a Google Sheet with two tabs: **Products** and **Settings**
2. Add products in the Products tab, settings in the Settings tab
3. Publish the sheet: File → Share → Publish to web → Entire Document → CSV
4. Copy the Sheet ID from the URL and update `src/utils/googleSheets.js`

### Column Reference

| Column | Description | Example |
|--------|------------|---------|
| id | Unique number | 1 |
| name | Product name | Basmati Rice |
| category | Category group | Groceries |
| price | Selling price | 450 |
| originalPrice | MRP (for discount) | 550 |
| quantity | Pack size | 5 kg |
| image | Image URL | https://i.ibb.co/xxx/img.jpg |
| description | Short description | Premium long grain rice |
| inStock | Available? | TRUE / FALSE |
| rating | Star rating | 4.5 |
| reviews | Review count | 128 |

### How to Update Products

| Action | What to do |
|--------|-----------|
| Add product | Add a new row |
| Change price | Edit the price cell |
| Remove product | Delete row or set inStock = FALSE |
| Change image | Upload to [imgbb.com](https://imgbb.com), paste link |
| New category | Type new category name — auto-appears on site |

Changes reflect on the website within 5 minutes.

### Settings Tab (Owner controls everything)

The **Settings** tab has two columns: `key` and `value`. The owner can change any of these:

| Key | What it controls | Default Value |
|-----|-----------------|---------------|
| shopName | Store name everywhere | Gopal Shop |
| tagline | Subtitle under logo | Your Trusted Neighborhood Store |
| whatsappNumber | Order receiving number | 919742306716 |
| phone | Display phone | +91 9742306716 |
| email | Contact email | gopalshop@gmail.com |
| address | Store address | 123 Market Street... |
| workingHours | Working hours | Mon-Sun: 8:00 AM - 10:00 PM |
| deliveryHours | Delivery time | 9:00 AM - 9:00 PM |
| deliveryFee | Delivery charge | 40 |
| freeDeliveryAbove | Free delivery min order | 500 |
| heroTitle | Homepage headline | Fresh Groceries at Your Doorstep |
| heroSubtitle | Homepage description | Quality products at... |
| heroImage | Homepage banner image URL | (Unsplash URL) |
| landmark1 | Direction hint 1 | 5 mins walk from Bus Stand |
| landmark2 | Direction hint 2 | Near City Market |
| landmark3 | Direction hint 3 | Next to State Bank |
| currency | Currency symbol | ₹ |

**The owner never needs to touch any code. Everything is controlled from the spreadsheet.**

## WhatsApp Integration

Orders are sent to the shop owner's WhatsApp number (`+91 9742306716`) with full details:
- Customer name, phone, address
- All items with quantities and prices
- Order total with delivery charges

No paid API required — uses the free `wa.me` link format.

## Deployment

The site auto-deploys to GitHub Pages on every push to `main` via the workflow at `.github/workflows/deploy.yml`.

To deploy manually: push any change to the `main` branch.

## License

This project is for Gopal Shop's personal commercial use.
