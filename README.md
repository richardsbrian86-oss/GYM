# IronPulse — Gym Management Dashboard

IronPulse is a gym management dashboard built to help gym owners and staff manage daily operations in one place. It brings together the core tools needed to run a gym efficiently, including member administration, payments, class scheduling, and marketing insights.

The dashboard was built to reduce the need to juggle multiple systems and spreadsheets. Its goal is to provide a central workspace where teams can quickly view performance, handle operational tasks, and make better business decisions using organized, easy-to-read data.

## Features

- **Overview** — Key metrics, revenue trends, attendance, and quick-glance widgets
- **Admin** — Member management, staff roster, and operational task tracking
- **Payments** — Transaction history, revenue breakdown, and billing overview
- **Schedule** — Weekly class calendar with capacity tracking and room assignments
- **Marketing** — Campaign management with open/click rate analytics

## Tech Stack

- [Next.js 16](https://nextjs.org/) with App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Project Structure

```
src/
├── app/
│   └── (dashboard)/     # Dashboard routes with shared layout
│       ├── page.tsx     # Overview
│       ├── admin/       # Admin module
│       ├── payments/    # Payments module
│       ├── schedule/    # Class schedule module
│       └── marketing/   # Marketing module
├── components/
│   ├── layout/          # Sidebar, header
│   ├── ui/              # Reusable UI components
│   └── charts/          # Data visualization
└── lib/
    ├── mock-data.ts     # Sample gym data
    └── utils.ts         # Helpers
```

## Next Steps

This MVP uses mock data. To go production-ready, consider:

- Authentication (NextAuth, Clerk, or similar)
- Database (PostgreSQL + Prisma)
- Payment processing (Stripe)
- Email/SMS marketing (SendGrid, Twilio)
- Real-time class booking and waitlists
