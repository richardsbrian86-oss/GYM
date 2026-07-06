A one-stop shop dashboard for gyms to handle admin tasks, payments, class schedules, and marketing.

## Features

- **Overview** — Key metrics, revenue trends, attendance, and quick-glance widgets
- **Admin** — Member management, staff roster, and operational task tracking
- **Payments** — Transaction history, revenue breakdown, and billing overview
- **Schedule** — Weekly class calendar with capacity tracking, enrollment, and waitlists
- **Marketing** — Campaign management with email/SMS sending and analytics

## Tech Stack

- [Next.js 16](https://nextjs.org/) with App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/) + SQLite (dev) / PostgreSQL (production)
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Stripe](https://stripe.com/) for payments
- [SendGrid](https://sendgrid.com/) + [Twilio](https://www.twilio.com/) for marketing

## Getting Started

```bash
npm install
cp .env.example .env
npm run db:setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in with:

- **Email:** `admin@ironpulse.com`
- **Password:** `admin123`

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | SQLite file path or PostgreSQL connection string |
| `AUTH_SECRET` | Session encryption key (`openssl rand -base64 32`) |
| `AUTH_URL` | App URL (e.g. `http://localhost:3000`) |
| `STRIPE_SECRET_KEY` | Stripe payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook verification |
| `SENDGRID_API_KEY` | Email campaigns |
| `TWILIO_*` | SMS campaigns |

Marketing and Stripe run in **demo mode** when keys are not set.

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/     # Protected dashboard routes
│   ├── api/             # REST API (auth, enroll, stripe, marketing)
│   └── login/           # Sign-in page
├── components/
├── lib/
│   ├── queries.ts       # Database queries
│   ├── auth.ts          # NextAuth config
│   ├── stripe.ts        # Stripe client
│   └── marketing/       # Email & SMS services
prisma/
├── schema.prisma
└── seed.ts
```

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run db:setup     # Generate client, push schema, seed data
npm run db:seed      # Re-seed database
```
