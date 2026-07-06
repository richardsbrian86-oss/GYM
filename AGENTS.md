<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

IronPulse is a single Next.js 16 (App Router, Turbopack, React 19, Tailwind 4) frontend app. There is no backend, database, auth, or environment variables — all data is mock data in `src/lib/mock-data.ts`, so no `.env` setup is needed.

Standard commands live in `package.json` and `README.md`: `npm run dev` (port 3000), `npm run lint`, `npm run build`. The update script already runs `npm install`, so just start the dev server to work on the app.

Notes:
- The dev server (`npm run dev`) is the development entrypoint; do not use `npm run build`/`npm start` for iterating.
- `npm run lint` invokes ESLint directly (flat config in `eslint.config.mjs`); pass paths/flags after `--`.
