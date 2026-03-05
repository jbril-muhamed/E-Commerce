# HMS Store — MERN Ecommerce App

A full-stack MERN (MongoDB · Express · React · Node.js) ecommerce application inspired by [adrianhajdin/ecommerce_sanity_stripe](https://github.com/adrianhajdin/ecommerce_sanity_stripe), rebuilt with a modern MERN architecture.

## ✨ Features

- 🛍️ **Product catalogue** with search & category filtering
- 🖼️ **Hero & footer banners** stored in MongoDB
- 🛒 **Shopping cart** with quantity management (persisted in localStorage)
- 💳 **Stripe Checkout** integration (hosted payment page)
- 🔐 **JWT authentication** (register / login / protected routes)
- 👑 **Admin role** — create, update, delete products & banners
- 📦 **Order tracking** — orders stored after successful payment via webhook
- 🌱 **Seed script** — pre-populated products, banners, and an admin user

## 🗂️ Project Structure

```
H_M_S/
├── client/          # React 18 + Vite + Tailwind CSS
│   ├── src/
│   │   ├── api/         – Axios API helpers
│   │   ├── components/  – Navbar, Cart, Product, HeroBanner, FooterBanner, Footer
│   │   ├── context/     – StateContext (cart + auth state)
│   │   └── pages/       – Home, ProductDetail, Login, Register, Success, Cancel
│   └── ...
├── server/          # Node.js + Express + MongoDB
│   ├── config/      – MongoDB connection
│   ├── middleware/  – JWT auth + admin guard
│   ├── models/      – User, Product, Banner, Order
│   ├── routes/      – auth, products, banners, orders, stripe
│   ├── seeds/       – Seed script + sample JSON data
│   └── server.js
└── package.json     # Root – runs client & server concurrently
```

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 18
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- [Stripe account](https://stripe.com) for payments

### 1. Clone & install

```bash
git clone https://github.com/jbril-muhamed/H_M_S.git
cd H_M_S
npm run install:all
```

### 2. Configure environment variables

```bash
# Server
cp server/.env.example server/.env
# Edit server/.env and fill in MONGO_URI, JWT_SECRET, STRIPE_SECRET_KEY, etc.

# Client
cp client/.env.example client/.env
# Edit client/.env and fill in VITE_STRIPE_PUBLISHABLE_KEY if needed
```

### 3. Seed the database

```bash
npm run seed
```

This creates sample products, banners, and a default admin user (`admin@hms.com` / `Admin1234!`).

### 4. Run the app

```bash
npm run dev
```

- Frontend → http://localhost:5173  
- Backend API → http://localhost:5000/api

## 🔑 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login & receive JWT |
| GET | `/api/auth/me` | User | Get current user |
| GET | `/api/products` | Public | List / search products |
| GET | `/api/products/featured` | Public | Featured products |
| GET | `/api/products/:slug` | Public | Product by slug |
| POST | `/api/products` | Admin | Create product |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |
| GET | `/api/banners` | Public | All banners |
| GET | `/api/banners/hero` | Public | Hero banners |
| GET | `/api/banners/footer` | Public | Footer banners |
| POST | `/api/banners` | Admin | Create banner |
| PUT | `/api/banners/:id` | Admin | Update banner |
| DELETE | `/api/banners/:id` | Admin | Delete banner |
| GET | `/api/orders/my` | User | My orders |
| GET | `/api/orders` | Admin | All orders |
| GET | `/api/orders/:id` | User | Order by ID |
| PUT | `/api/orders/:id/deliver` | Admin | Mark delivered |
| POST | `/api/stripe/checkout` | Public | Create Stripe session |
| POST | `/api/stripe/webhook` | Stripe | Payment webhook |
| GET | `/api/stripe/session/:id` | Public | Retrieve session |

## 🌱 Stripe Webhook (local dev)

Use [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward webhooks locally:

```bash
stripe listen --forward-to localhost:5000/api/stripe/webhook
```

Copy the `whsec_...` secret into `server/.env` as `STRIPE_WEBHOOK_SECRET`.

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start client + server concurrently |
| `npm run server` | Start Express server only |
| `npm run client` | Start Vite dev server only |
| `npm run seed` | Seed database with sample data |
| `npm run build` | Build React app for production |
| `npm run install:all` | Install root + client + server deps |

## 🔒 Security Notes

- Passwords are hashed with **bcryptjs** (12 salt rounds)
- JWTs are signed with `JWT_SECRET` — use a long random string in production
- Stripe webhook signature is verified using `STRIPE_WEBHOOK_SECRET`
- The server uses **Helmet** for HTTP security headers
- CORS is restricted to `CLIENT_URL`
- Never commit real `.env` files (they are in `.gitignore`)

## 📄 License

MIT