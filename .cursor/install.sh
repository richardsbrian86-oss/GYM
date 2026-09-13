#!/usr/bin/env bash
# Idempotent Cloud Agent install script for IronPulse.
# Prepares local dev config (.env), installs dependencies, and sets up the
# SQLite database (generate client, push schema, seed data).
set -euo pipefail

cd "$(dirname "$0")/.."

# Create a local .env for development if one does not already exist. The app
# needs DATABASE_URL for Prisma and AUTH_SECRET for NextAuth. This file is
# gitignored; the secret is generated fresh and only used for local dev.
if [ ! -f .env ]; then
  cp .env.example .env
  SECRET="$(openssl rand -base64 32)"
  # Populate AUTH_SECRET without printing the value.
  tmp="$(mktemp)"
  AUTH_SECRET="$SECRET" awk '
    /^AUTH_SECRET=/ { print "AUTH_SECRET=\"" ENVIRON["AUTH_SECRET"] "\""; next }
    { print }
  ' .env > "$tmp"
  mv "$tmp" .env
  echo "Created .env from .env.example with a generated AUTH_SECRET."
else
  echo ".env already exists; leaving it untouched."
fi

# Install dependencies (postinstall runs `prisma generate`).
npm install

# Generate the Prisma client, push the schema to SQLite, and seed demo data.
# Seeding clears and recreates rows, so this is safe to run repeatedly.
npm run db:setup

echo "IronPulse install complete. Start the app with: npm run dev"
