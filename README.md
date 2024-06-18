# ShopHub E-Commerce website
Sure, here's a README.md template for your eCommerce website using the MERN stack with Nodemailer for sending emails. You can customize it as per your specific project details.

---

# eCommerce Website

## Introduction

This is a full-stack eCommerce website built using the MERN (MongoDB, Express, React, Node.js) stack. The application includes features for user authentication, product management, shopping cart functionality, and order processing. Additionally, it uses Nodemailer for sending confirmation and notification emails.

## Features

- User Authentication (Register, Login, Logout)
- Product Management (CRUD operations)
- Shopping Cart
- Order Processing
- Email Notifications using Nodemailer

## Tech Stack

- **Frontend:** React, Redux, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Email:** Nodemailer

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies for both client and server:**
   ```sh
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the `server` directory and add the following:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_HOST=your_smtp_host
   EMAIL_PORT=your_smtp_port
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_password
   ```

4. **Run the development servers:**

   In the `server` directory:
   ```sh
   npm run dev
   ```

   In the `client` directory:
   ```sh
   npm start
   ```

5. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## File Structure

```sh
ecommerce-website/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── ...
├── .gitignore
├── README.md
└── package.json
```

## Nodemailer Configuration

Nodemailer is used to send emails from the application. Configuration for Nodemailer is set up in the `utils/email.js` file.

Example configuration:

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (options) => {
    const mailOptions = {
        from: 'Your Name <your.email@example.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
```

Usage in a controller:

```javascript
const sendEmail = require('../utils/email');

const sendOrderConfirmation = async (req, res) => {
    const { userEmail, orderDetails } = req.body;

    const message = `Order confirmation details: ${orderDetails}`;

    try {
        await sendEmail({
            email: userEmail,
            subject: 'Order Confirmation',
            message,
        });
        res.status(200).json({ success: true, message: 'Email sent' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Email not sent', error });
    }
};
```

## License

This project is licensed under the MIT License.

---

You can adjust the paths, descriptions, and commands according to your project's specific setup.
