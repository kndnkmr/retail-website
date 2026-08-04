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

The shop owner manages all products from a Google Sheet — no coding needed.

### Setup

1. Create a Google Sheet with a tab named **Products**
2. Add headers in Row 1: `id | name | category | price | originalPrice | quantity | image | description | inStock | rating | reviews`
3. Add products in rows below
4. Publish the sheet: File → Share → Publish to web → CSV
5. Copy the Sheet ID from the URL and update `src/utils/googleSheets.js`

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
