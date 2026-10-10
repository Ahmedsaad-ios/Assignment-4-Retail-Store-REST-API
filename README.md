# Assignment 4 – Retail Store REST API

A RESTful API for managing products, suppliers, and sales using Node.js, Express.js, and MySQL.

## Technologies

- Node.js
- Express.js
- MySQL 8
- mysql2/promise
- dotenv
- nodemon
- Postman

## Project Features

- Automatic database and table initialization
- Products CRUD operations
- Suppliers CRUD operations
- Sales recording and retrieval
- Database schema modification endpoints
- Database seed endpoint
- Product and sales reports
- Dedicated endpoints to update Bread price and delete Eggs
- MySQL user permissions using GRANT and REVOKE
- SQL bonus solution

## Installation

1. Clone the repository:

   `git clone https://github.com/Ahmedsaad-ios/Assignment-4-Retail-Store-REST-API.git`

2. Open the project directory:

   `cd assignment4-mysql`

3. Install dependencies:

   `npm install`

4. Create a `.env` file based on `.env.example`.

5. Ensure MySQL Server is running and the database credentials are correct.

6. Start the server:

   `npm run dev`

The application initializes the database and tables automatically.

Base URL: `http://localhost:3000`

## API Endpoints

### Products

| Method | Endpoint | Description |
|---|---|---|
| POST | /products | Create product |
| GET | /products | Get all products |
| GET | /products/:id | Get product by ID |
| PUT | /products/:id | Update product |
| DELETE | /products/:id | Delete product |
| PATCH | /products/bread/price | Update Bread price to 25 |
| DELETE | /products/:id | Delete Eggs (if implemented) |

### Suppliers

| Method | Endpoint | Description |
|---|---|---|
| POST | /suppliers | Create supplier |
| GET | /suppliers | Get all suppliers |
| PUT | /suppliers/:id | Update supplier |
| DELETE | /suppliers/:id | Delete supplier |

### Sales

| Method | Endpoint | Description |
|---|---|---|
| POST | /sales | Record sale |
| GET | /sales | Get all sales |
| GET | /sales/product/:productId | Get sales by product |

### Database Schema

| Method | Endpoint | Description |
|---|---|---|
| POST | /database/products/category | Add Category |
| DELETE | /database/products/category | Remove Category |
| PUT | /database/suppliers/contact-number | Change ContactNumber type |
| PUT | /database/products/name-required | Make ProductName required |

### Reports

| Method | Endpoint |
|---|---|
| GET | /reports/total-sold |
| GET | /reports/highest-stock |
| GET | /reports/suppliers-start-f |
| GET | /reports/never-sold |
| GET | /reports/sales-details |

### Database Seeding

`POST /seed`

Creates the required sample supplier, products, and sale when missing.

## Database Permissions

Run `src/database/permissions.sql` as a MySQL administrator after replacing the sample password with a secure local password.

The script creates `store_manager`, grants SELECT and INSERT on the database, revokes UPDATE, and grants DELETE only on Sales.

## Bonus

The solution to the SQL problem *Customer Who Visited but Did Not Make Any Transactions* is available in `bonus.txt`.

## Notes

- Use Postman to test the API endpoints.
- Database schema modification endpoints are intended for local assignment testing.
- Database credentials must not be committed to GitHub.
- Deleting products referenced by sales may be blocked by foreign key constraints.