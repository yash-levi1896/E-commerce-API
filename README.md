# E-commerce-API

This is the backend API for an E-commerce application. It provides various endpoints for managing products, categories, user authentication, carts, orders, and more.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Functionality](#functionality)
- [API Documentation](#api-documentation)
  - [User Routes](#user-routes)
  - [Category Routes](#category-routes)
  - [Product Routes](#product-routes)
  - [Cart Routes](#cart-routes)
  - [Order Routes](#order-routes)

## Getting Started

### Prerequisites

Before setting up the project, ensure you have the following dependencies installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yash-levi1896/E-commerce-API.git


2. Navigate to the project directory:

   ```bash
   cd E-COMMERCE-API


3. Install dependencies:

   ```bash
   npm install


4. Create a .env file in the project root and configure your environment variables:

   ```bash
   PORT = any port number
   MongoURL=your-mongodb-connection-uri
   Secret_key=your-secret-key


5. Start the server:

   ```bash
   npm run server




## Functionality

This backend API provides the following functionality:

- User registration, login and logout with JWT authentication.
- Category management (create and list categories).
- Product management (create, list by category, and retrieve product details).
- Cart management (add products, view cart, update quantities, and remove items).
- Order placement (place an order with products from the cart).
- Order history (fetch order history for authenticated users).
- Order details (retrieve detailed information about a specific order by ID).


## API Documentation

### User Routes

- **POST /user/register**: Register a new user.
- **POST /user/login**: Authenticate and log in a user.
- **GET  /user/logout**:Logout the user 

### Category Routes

- **GET /category/getcategory**: Retrieve a list of all categories.
- **POST /category/addcategory**: Create a new category.

### Product Routes

- **GET /product/getproduct/:Id**: Retrieve products by category.
- **GET /product/getproductbyid/:productId**: Retrieve product details by ID.
- **GET /product/getproduct**: Retrive all the product present.
- **POST /product/addproduct**: Create a new product.

### Cart Routes

- **POST /cart/addtocart/:productId**: Add a product to the cart.
- **GET /cart/getcartitem**: Retrieve all products in the user's cart.
- **PATCH /cart/increasequantity/:itemid** : Increase item quantity by one.
- **PATCH /cart/decreasequantity/:itemid** : Decrease item quantity by one.
- **DELETE /cart/removeitem/:itemid**: Delete the item from the user's cart.

###  Order Routes

- **POST /order/placeorder**:  Place order on the basis of the cart items.
- **GET /order/orderhistory**: Get the order history for the particular user.
- **GET /order/orderdetail/:orderid**: Get the specific order by orderid.