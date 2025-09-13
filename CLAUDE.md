# Claude Configuration for Next.js Supabase Integration

This file contains configuration and commands for Claude to efficiently work with this project.

## Project Overview

Next.js application with Supabase integration featuring authentication, user management, and admin dashboard.

## Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Database**: Supabase (local development)
- **Styling**: Tailwind CSS 4
- **TypeScript**: TypeScript 5
- **Authentication**: Supabase Auth
- **Deployment**: Ready for production

## Development Commands

### Start Development
```bash
npm run dev
```
*Starts Next.js development server with Turbopack*

### Build Project
```bash
npm run build
```
*Builds the project for production with Turbopack*

### Start Production
```bash
npm run start
```
*Starts the production server*

### Seed Demo Data
```bash
npm run seed:users
```
*Seeds demo users for testing*

## Supabase Commands

### Start Local Supabase
```bash
npx supabase start
```

### Stop Local Supabase
```bash
npx supabase stop
```

### Reset Local Database
```bash
npx supabase db reset
```

### Generate Migration
```bash
npx supabase db diff --file <migration_name>
```

### Apply Migrations
```bash
npx supabase db push
```

## Testing & Quality

### TypeScript Check
```bash
npx tsc --noEmit
```

### Lint (if available)
*No linting configured - check if ESLint should be added*

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard
│   │   ├── dashboard/     # Dashboard page
│   │   ├── users/         # User management
│   │   └── layout.tsx     # Admin layout
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── users/         # User endpoints
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   └── components/        # Shared components
├── lib/                   # Business logic
│   └── modules/user/      # User module
└── utils/supabase/        # Supabase clients
```

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<local_key>`

## Demo Credentials

- **User 1**: demo1@example.com / demopassword123
- **User 2**: demo2@example.com / demopassword123

## Database Schema

### Users Table
- `id`: UUID (primary key)
- `email`: varchar (unique)
- `password`: varchar (hashed)
- `name`: varchar
- `created_at`: timestamp
- `updated_at`: timestamp

## Common Tasks

### Adding New Migration
1. Make schema changes in Supabase Studio or SQL
2. Generate migration: `npx supabase db diff --file <name>`
3. Review generated migration file
4. Apply: `npx supabase db push`

### Adding New API Route
1. Create file in `src/app/api/`
2. Export handler functions (GET, POST, etc.)
3. Use Supabase client from `src/utils/supabase/`

### Adding New Page
1. Create file in `src/app/`
2. Follow App Router conventions
3. Use layout.tsx for shared UI

## Known Issues

- No ESLint configuration
- No testing framework setup
- Middleware may need updates for new routes

## Files to Check When Troubleshooting

- `src/middleware.ts` - Route protection
- `src/utils/supabase/` - Database connection
- `supabase/migrations/` - Database schema
- `.env.local` - Environment configuration