# E-commerce Store

This is an e-commerce store application built with Node.js and React. It provides the functionality for users to browse and purchase products. The application also allows an admin user to manage products and categories. It integrates with Braintree for payment processing and uses MongoDB for data storage. The application utilizes Express as the server framework and Bootstrap for styling the user interface.

## Features

- User can view a list of products
- User can view details of a product
- User can add a product to the shopping cart
- User can update the quantity of a product in the shopping cart
- User can remove a product from the shopping cart
- User can view the shopping cart and proceed to checkout
- User can make a payment using Braintree

Admin-only features:

- Admin can create a new product
- Admin can update an existing product
- Admin can delete a product
- Admin can create a new category
- Admin can update an existing category
- Admin can delete a category

## Technologies Used

- Node.js
- React
- Braintree Payment Integration
- MongoDB
- Express
- Bootstrap

## Installation

1. Clone the repository: https://github.com/AbdelazizSleem01/Bell-ecommer-app.git

2. Install the dependencies for the server:

cd ecommerce-store/server
npm install

Copy

3. Install the dependencies for the client:

cd ../client
npm install

Copy

4. Start the server:

cd ../server
npm start

Copy

5. Start the client:

cd ../client
npm start

Copy

6. Access the application in your browser at `http://localhost:3000`.

## NPM Package

- [braintree](https://www.npmjs.com/package/braintree) - A library for integrating with the Braintree payment gateway.

npm install braintree


