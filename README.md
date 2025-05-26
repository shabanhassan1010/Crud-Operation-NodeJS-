# Features

# User Management

Register new users with secure password hashing (bcrypt).

Login with email and password to receive a JWT Bearer token.

Protected profile routes: users can update or delete their own account.

# Product Management

Full CRUD operations for products.

Public endpoints for listing and searching products.

# Authentication & Authorization

Passwords hashed using bcrypt with salt rounds.

Stateless JWT Bearer tokens with configurable expiration.

Middleware to validate tokens and enforce role-based access (user).

# Database Support

MongoDB (via Mongoose)

Modular DBContext setup for easy swapping.

# Modular Structure:

Organized into modules (Auth, User, Product).

Clean separation of routers, controllers, and middleware.



