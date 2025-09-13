# Next.js Supabase Integration - Development Notes

## Overview
This document contains development notes and important information about the Next.js Supabase integration project.

## Features Implemented

### 1. Authentication
- Login page with form validation
- Register page with form validation
- Middleware protection for routes
- Logout functionality in sidebar

### 2. Demo Users
- Created two demo users for testing:
  - demo1@example.com / demopassword123
  - demo2@example.com / demopassword123
- Added demo credentials display on login page

### 3. Database
- Created users table in Supabase with proper structure
- Table includes: id, created_at, updated_at, full_name, avatar_url, email
- Foreign key relationship with auth.users table
- Automatic synchronization between auth.users and public.users tables

### 4. UI Components
- Admin dashboard with sidebar navigation
- Responsive layout with dark mode support
- Logout button in sidebar

### 5. User Management (CRUD)
- Full CRUD operations for users
- User listing with data table
- Search and filtering capabilities
- Pagination support
- User creation form (modal)
- User details view
- User editing capabilities (modal)
- User deletion functionality

### 6. API Routes
- RESTful API endpoints for users, login, and registration
- Server-side validation and error handling

### 7. Testing
- Postman collection for API testing

## Scripts

### Seeding Users
To seed demo users, run:
```bash
npm run seed:users
```

This command executes the script at `scripts/seedUsers.ts` which creates two demo users in the database.

To seed a specific number of random users:
```bash
npm run seed:users 50
```

## File Structure
```
src/
  app/                 # Next.js app router pages
    admin/             # Admin dashboard pages
      dashboard/
        page.tsx          # Admin dashboard page
      users/            # Users management pages
        page.tsx          # Users list page
        [id]/
          page.tsx        # User details page
    api/               # API routes
      auth/            # Authentication routes
        login/
          route.ts        # Login API endpoint
        register/
          route.ts        # Registration API endpoint
      users/
        route.ts          # Users API endpoint
    login/
      page.tsx              # Login page with demo credentials
    register/
      page.tsx              # Registration page
  lib/                 # Business logic layer
    modules/           # Feature modules
      user/            # User module
        index.ts           # Module exports
        user.types.ts      # User type definitions
        user.service.ts    # User service (database operations)
        user.controller.ts # User controller (business logic)
  utils/               # Utility functions
    supabase/          # Supabase client configurations
scripts/               # Utility scripts
supabase/              # Supabase configuration and migrations
```

## Environment Variables
The project uses the following environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key (for admin operations)

## Supabase Local Development
The project uses Supabase local development. The local instance includes:
- Authentication
- Database with users table
- Realtime functionality

## Routes
- `/login` - Login page with demo credentials
- `/register` - User registration page
- `/admin/dashboard` - Admin dashboard (protected route)
- `/admin/users` - Users management (protected route)
- `/admin/users/[id]` - User details page (protected route)
- `/api/auth/login` - Login API endpoint
- `/api/auth/register` - Registration API endpoint
- `/api/users` - Users API endpoint

## Middleware Protection
The middleware protects all routes except:
- `/login`
- `/register`
- `/auth/*`
- `/error`
- `/api/*`

Unauthenticated users are redirected to `/login`.

## Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Seed demo users
npm run seed:users

# Seed specific number of random users
npm run seed:users 50
```

## User Management Features

### User CRUD Operations
1. **Create**: Add new users through the admin interface
2. **Read**: View user lists and individual user details
3. **Update**: Edit user information
4. **Delete**: Remove users from the system

### User Service Methods
- `getAllUsers(page, limit, search)` - Fetch all users with pagination and search
- `getUserById(id)` - Fetch a specific user by ID
- `createUser(userData)` - Create a new user
- `updateUser(id, userData)` - Update an existing user
- `deleteUser(id)` - Delete a user

### User Controller Methods
- `getAllUsers(page, limit, search)` - Get all users with error handling
- `getUserById(id)` - Get a specific user with validation
- `createUser(userData)` - Create a user with validation
- `updateUser(id, userData)` - Update a user with validation
- `deleteUser(id)` - Delete a user with validation

### API Endpoints

#### GET /api/users
Fetch users with pagination and search capabilities.

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Number of users per page
- `search` (optional) - Search term to filter users by name or email

**Response:**
```json
{
  "users": [...],
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}
```

#### POST /api/auth/login
Authenticate a user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": { ... }
}
```

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "User Name"
}
```

**Response:**
```json
{
  "user": { ... }
}
```

## Postman Collection

A Postman collection is included in the project (`postman-collection.json`) for testing the API endpoints. The collection includes:

1. **Authentication**
   - Login endpoint with demo credentials
   - Registration endpoint

2. **Users**
   - Get all users with pagination and search parameters

To use the collection:
1. Open Postman
2. Import the `postman-collection.json` file
3. Set the `base_url` variable to your application URL (default: http://localhost:3000)
4. Test the endpoints with the provided examples or your own data

## Database Synchronization

A database trigger has been implemented to automatically synchronize user data between the `auth.users` table (managed by Supabase Auth) and the `public.users` table (used by the application). When a user is created or updated in `auth.users`, the corresponding record in `public.users` is automatically created or updated.

This ensures that:
1. All authenticated users have a corresponding record in the public users table
2. User data such as full name and email are synchronized
3. The application can query user data directly from the public schema
4. Referential integrity is maintained between the auth and public schemas