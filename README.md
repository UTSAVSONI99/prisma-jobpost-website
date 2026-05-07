---

# Job Posting Website

A job board project built with Next.js, Prisma, PostgreSQL, and NextAuth.

This README reflects the current project state as of May 2026 and will be updated as more features are completed.

## Current Status

Work in progress.

Implemented so far:

- Next.js app initialized with App Router and TypeScript
- Prisma schema created with migrations
- PostgreSQL connection wired through Prisma
- NextAuth v5 setup with Prisma adapter
- GitHub sign-in flow added
- Sign-in page UI created
- Shared Navbar component created

Not completed yet:

- Job listing page
- Post job page
- Dashboard page
- Job details and application flows
- Terms and Privacy pages linked from sign-in page
- Home page content is still the default starter template

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL (pg)
- NextAuth v5 (GitHub provider)
- Tailwind CSS 4

## Database Models

Current Prisma models:

- User
- Account
- Session
- VerificationRequest
- Job
- Application

The schema includes relations for:

- A user posting many jobs
- A user applying to many jobs
- Unique application per user per job

## Project Structure

- app: routes and layout
- app/api/auth/[...nextauth]/route.ts: NextAuth route handlers
- app/auth/signin/page.tsx: sign-in page
- components/Navbar.tsx: top navigation
- lib/auth.ts: server actions for sign in/out
- lib/prisma.ts: Prisma client setup
- prisma/schema.prisma: database schema

## Local Setup

1. Install dependencies:

   pnpm install

2. Create a .env file with at least:

   DATABASE_URL=your_postgres_connection_string
   AUTH_SECRET=your_random_secret
   AUTH_GITHUB_ID=your_github_oauth_client_id
   AUTH_GITHUB_SECRET=your_github_oauth_client_secret

3. Generate Prisma client and run migrations:

   npx prisma generate
   npx prisma migrate dev

4. Start development server:

   pnpm dev

App runs at:
http://localhost:3000

## Scripts

- pnpm dev: run development server
- pnpm build: build for production
- pnpm start: start production server
- pnpm lint: run lint checks

## Next Milestones

- Replace default home page with real job board UI
- Build jobs browsing and filtering
- Build post-job form (protected)
- Build user dashboard
- Build apply flow and application management

## License

No license file added yet.
