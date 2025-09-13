# Next.js Supabase Integration

A Next.js application with Supabase integration featuring authentication, user management, and admin dashboard.

## Features

- User authentication (login/register)
- Admin dashboard with sidebar navigation
- User management with full CRUD operations
- Responsive design with dark mode support
- Demo users for testing
- RESTful API endpoints

## Getting Started

### Prerequisites

- Node.js 18+
- Docker (for Supabase local development)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start Supabase local development:
```bash
npx supabase start
```

3. Run the development server:
```bash
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed:users` - Seed demo users

### Demo Users

The application comes with two demo users for testing:

1. demo1@example.com / demopassword123
2. demo2@example.com / demopassword123

These credentials are displayed on the login page for easy access.

## Project Structure

```
src/
  app/                 # Next.js app router pages
    admin/             # Admin dashboard pages
      dashboard/       # Dashboard page
      users/           # Users management pages
    api/               # API routes
      auth/            # Authentication routes
        login/         # Login endpoint
        register/      # Registration endpoint
      users/           # Users endpoint
    login/             # Login page
    register/          # Registration page
  lib/                 # Business logic
    modules/           # Feature modules
      user/            # User module
  utils/               # Utility functions
    supabase/          # Supabase client configurations
scripts/               # Utility scripts
supabase/              # Supabase configuration and migrations
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Authenticate a user
- `POST /api/auth/register` - Register a new user

### Users
- `GET /api/users` - Get all users with pagination and search

For detailed API documentation, see the [Qwen.md](Qwen.md) file.

## Postman Collection

This project includes a Postman collection for testing the API endpoints:

1. Open Postman
2. Import the `postman-collection.json` file
3. Set the `base_url` variable to your application URL (default: http://localhost:3000)

The collection includes requests for:
- User login
- User registration
- Get all users with pagination and search

## Supabase Setup

This project uses Supabase local development. The local instance includes:

- Authentication
- Database with users table
- Realtime functionality

## Environment Variables

The project uses the following environment variables (configured for local development):

- `NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0`

For more details, see the [Qwen.md](Qwen.md) file.