Magazine Subscription API

Overview

This is a Magazine Subscription API built using Node.js, Express, and MongoDB. It allows users to subscribe to magazines, retrieve their subscriptions, modify them, and cancel them. The project follows RESTful API principles and uses JWT authentication for security.

Features

User Authentication (Signup/Login with JWT authentication)

Subscribe to a magazine

Retrieve user subscriptions

Modify subscriptions (Change subscription plan)

Cancel subscriptions

Email notifications for subscription updates

Tech Stack

Backend: Node.js, Express.js

Database: MongoDB with Mongoose ORM

Authentication: JWT (JSON Web Tokens)

Email Service: Nodemailer (for sending emails)

Run the server:
npm start

Security Considerations:

Environment variables should never be shared publicly.

Use HTTPS in production for secure API communication.

JWT token should be stored securely on the client-side.
