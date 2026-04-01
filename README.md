# Billing & Invoice Backend API

This is the backend API for managing Customers, Products, and Invoices. 

## Prequisites

You will need to have Node.js and PostgreSQL installed.

1. **Install Node.js:** Download it from [https://nodejs.org/](https://nodejs.org/)
2. **Install PostgreSQL:** Download it from [https://www.postgresql.org/](https://www.postgresql.org/)

## Setup Instructions

Once Node.js is installed, open your command prompt or terminal in this project folder and run:

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Rename `.env.example` to `.env` and update your PostgreSQL connection URL:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/invoice_db?schema=public"
PORT=3000
```

### 3. Initialize Database
Create the database tables using Prisma's migration tools:
```bash
npx prisma generate
npx prisma db push
```

### 4. Run the Server
For development (with auto-reload):
```bash
npm run dev
```

The Server should start on `http://localhost:3000`.

## API Endpoints

### Customers
- `GET /api/customers`: List all customers
- `POST /api/customers`: Create a new customer
- `GET /api/customers/:id`: Get customer details (including invoices)

### Products
- `GET /api/products`: List all products
- `POST /api/products`: Create a new product instance

### Invoices
- `GET /api/invoices`: List all invoices
- `POST /api/invoices`: Create a new invoice and automatically calculate totals
- `GET /api/invoices/:id`: Get invoice by ID containing items
- `PUT /api/invoices/:id/status`: Update status flag (DRAFT, SENT, PAID, CANCELLED)
