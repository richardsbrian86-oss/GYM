# IronPulse — Gym Management Dashboard

IronPulse is a gym management dashboard built for businesses that want one clear place to run operations, track performance, and stay organized. It helps gym owners and staff manage members, payments, class schedules, and marketing without bouncing between disconnected tools.

This product was built for gyms that need a better way to work. Instead of relying on spreadsheets, manual follow-ups, and multiple software systems, IronPulse brings the most important day-to-day tasks into a single dashboard. The result is faster decision-making, less administrative work, and a clearer view of how the business is performing.

## Features

- **Overview** — See the most important numbers at a glance, including revenue, attendance, and trends
- **Admin** — Manage members, staff, and internal tasks in one place
- **Payments** — Review transactions, billing activity, and revenue breakdowns
- **Schedule** — Organize classes, track capacity, and assign rooms
- **Marketing** — Monitor campaigns and see what is driving engagement

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
