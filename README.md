# Job Board Website

A full-stack job board built with Next.js App Router, Prisma, PostgreSQL, and NextAuth v5.

Users can:
- Sign in with GitHub
- Browse and search jobs
- View individual job details
- Post new jobs (authenticated)
- Apply to jobs (authenticated)
- Track posted jobs and applications in a dashboard

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Prisma ORM + Prisma PostgreSQL adapter
- PostgreSQL
- NextAuth v5 + Prisma Adapter
- Tailwind CSS 4
- date-fns

## Features

- Authentication
- GitHub OAuth login using NextAuth
- Session-aware navigation and protected actions

- Job Discovery
- Home page with latest 3 jobs
- Jobs page with filters:
   - keyword (`q`)
   - job type (`type`)
   - location (`location`)

- Job Posting
- Authenticated users can create jobs from `/jobs/post`
- Server API persists jobs with the logged-in user as poster

- Job Applications
- Authenticated users can apply to a job from the job details page
- Duplicate applications are blocked by API + DB unique constraint

- Dashboard
- Shows jobs posted by current user
- Shows applications submitted by current user
- Includes application status badge (`pending`, `accepted`, `rejected`)

## Routes

### Pages

- `/` - Home with recent jobs
- `/jobs` - Job listing with search/filter
- `/jobs/[id]` - Job details + apply button
- `/jobs/post` - Post job form (requires login to complete action)
- `/dashboard` - User dashboard (redirects to sign-in if unauthenticated)
- `/auth/signin` - GitHub sign-in page

### API

- `GET /api/jobs`
   - Returns all jobs (latest first)

- `POST /api/jobs`
   - Creates a new job for authenticated user
   - Returns `201` with created job payload

- `POST /api/jobs/[jobId]/apply`
   - Creates application for authenticated user
   - Returns:
      - `201` on success
      - `400` if already applied
      - `404` if job does not exist

- `GET|POST /api/auth/[...nextauth]`
   - NextAuth handlers

## Database Schema (Prisma)

Core models:
- `User`
- `Account`
- `Session`
- `VerificationToken`
- `Job`
- `Application`

Important relationships:
- One `User` can post many `Job` records
- One `User` can submit many `Application` records
- One `Job` can have many `Application` records

Important constraints:
- `Application` has `@@unique([jobId, userId])` to prevent duplicate applications

Prisma schema path:
- `prisma/schema.prisma`

## Project Structure

```text
app/
   api/
      auth/[...nextauth]/route.ts
      jobs/route.ts
      jobs/[jobId]/apply/route.ts
   auth/signin/page.tsx
   dashboard/page.tsx
   jobs/page.tsx
   jobs/post/page.tsx
   jobs/[id]/page.tsx
   page.tsx

auth.ts
auth.config.ts
middleware.ts
lib/
   auth.ts
   prisma.ts
prisma/
   schema.prisma
   migrations/
```

## Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL database
- GitHub OAuth app credentials

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME

AUTH_SECRET=your_random_long_secret
AUTH_GITHUB_ID=your_github_oauth_client_id
AUTH_GITHUB_SECRET=your_github_oauth_client_secret
```

Notes:
- `DATABASE_URL` is used by Prisma and runtime DB access.
- For GitHub OAuth callback, set your app callback URL to:
   - `http://localhost:3000/api/auth/callback/github` (local)

## Local Development

1. Install dependencies

```bash
pnpm install
```

2. Generate Prisma client

```bash
npx prisma generate
```

3. Apply migrations

```bash
npx prisma migrate dev
```

4. Start development server

```bash
pnpm dev
```

5. Open app

```text
http://localhost:3000
```

## Available Scripts

- `pnpm dev` - Start Next.js dev server (Turbopack)
- `pnpm build` - Build for production
- `pnpm start` - Run production server
- `pnpm lint` - Run ESLint checks

## Auth and Session Notes

- Auth config is in `auth.config.ts`.
- NextAuth initialization is in `auth.ts`.
- JWT/session callbacks attach user id and name to the session.
- Navbar renders session-aware links and sign-out action.

## Deployment Checklist

- Set all environment variables in hosting platform
- Use a production PostgreSQL database
- Run migrations in production before first traffic
- Configure GitHub OAuth callback URL for production domain
- Build command: `pnpm build`
- Start command: `pnpm start`

## Known Improvements (Optional)

- Add explicit request validation (Zod) for API payloads
- Improve API error handling for non-2xx responses in UI forms
- Add tests (unit + integration) for auth and apply flows
- Add Terms and Privacy pages linked from sign-in screen

## License

No license file is included yet.
