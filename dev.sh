#!/bin/bash

# Start MongoDB in Docker, then run backend and frontend with hot reload.
#
# Override ports when another instance of this stack (or another project
# with the same NestJS/Mongo/Next.js layout) is already running on the
# defaults:
#
#   MONGO_PORT=27018 BACKEND_PORT=3011 FRONTEND_PORT=3010 ./dev.sh

trap 'kill 0' EXIT

MONGO_PORT="${MONGO_PORT:-27017}"
BACKEND_PORT="${BACKEND_PORT:-3001}"
FRONTEND_PORT="${FRONTEND_PORT:-3000}"
export MONGO_PORT BACKEND_PORT FRONTEND_PORT

echo "Starting MongoDB on port $MONGO_PORT..."
docker compose up -d mongodb

echo "Waiting for MongoDB to be healthy..."
until docker compose exec mongodb mongosh --eval "db.adminCommand('ping')" --quiet > /dev/null 2>&1; do
  sleep 1
done
echo "MongoDB is ready."

echo "Starting backend (port $BACKEND_PORT)..."
cd backend && PORT="$BACKEND_PORT" \
  MONGODB_URI="mongodb://localhost:${MONGO_PORT}/bardic-inspiration" \
  FRONTEND_URL="http://localhost:${FRONTEND_PORT}" \
  npm run start:dev &
cd - > /dev/null

echo "Starting frontend (port $FRONTEND_PORT)..."
cd frontend && PORT="$FRONTEND_PORT" \
  NEXT_PUBLIC_API_URL="http://localhost:${BACKEND_PORT}/api" \
  npm run dev &
cd - > /dev/null

wait
