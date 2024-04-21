# 🛒 E-Commerce Admin Dashboard 🛍️

This project is an admin dashboard for managing products in an e-commerce application. It includes features for adding new products, listing existing products, and removing products.

## Features

- **Add Product**: Allows the admin to add a new product to the database by providing product details and uploading an image.
- **List Product**: Displays a list of all products currently available in the database.
- **Remove Product**: Allows the admin to remove a product from the database.

## Technologies Used

- **Frontend**: React.js for building the user interface.
- **Backend**: Node.js with Express.js for building the server and handling API requests.
- **Database**: MongoDB for storing product data.
- **File Upload**: Multer middleware for handling file uploads.
- **Routing**: React Router for client-side routing.
- **Styling**: CSS for styling components.

## Getting Started

1. **Clone the repository**:
    ```
    git clone <repository-url>
    ```

2. **Install dependencies**:
    ```
    cd e-commerce-admin-dashboard
    npm install
    ```

3. **Start the development server**:
    ```
    npm start
    ```

4. **Open** [http://localhost:3000](http://localhost:4000) **to view the dashboard in your browser**.

## Server Setup

The backend server is implemented using Express.js. It provides endpoints for uploading images, adding products, removing products, and fetching all products.

### Setup Instructions

1. **Install dependencies**:
    ```
    cd server
    npm install
    ```

2. **Start the server**:
    ```
    npm start
    ```

## Database Setup

The application uses MongoDB as the database for storing product data. Update the MongoDB connection string in the server code to your own database URL.

## Folder Structure

- **client**: Contains the frontend React application.
  - **src**: Source code files.
    - **components**: Reusable components.
    - **pages**: Pages of the application.
    - **assets**: Static assets such as images and icons.
  - **public**: Public files (HTML, favicon, etc.).

- **server**: Contains the backend Node.js server code.
  - **upload**: Directory for storing uploaded images.
  - **models**: Database models (MongoDB schema).
  - **routes**: API routes.
  - **config**: Configuration files.

## Contributors

- [Your Name](https://github.com/your-username)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
