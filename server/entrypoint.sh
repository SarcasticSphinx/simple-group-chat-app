#!/bin/sh
set -e

echo "🚀 Starting application setup..."

# Function to wait for postgres
wait_for_postgres() {
    echo "⏳ Waiting for PostgreSQL to be ready..."
    until nc -z postgres 5432; do
        echo "Waiting for postgres..."
        sleep 2
    done
    echo "✅ PostgreSQL is ready!"
}

# Install netcat for connection checking
apk add --no-cache netcat-openbsd

# Wait for database
wait_for_postgres

# Sleep a bit more to ensure postgres is fully ready
sleep 5

echo "📊 Running database migrations..."
npx prisma migrate deploy

echo "🌱 Seeding database..."
npx prisma db seed

echo "🎉 Starting the application..."
exec npm run start:prod
