# Hospital Management System (HMS) with NestJS + GraphQL

## Features
- Doctors, Patients, Appointments, and Medical Records
- GraphQL-based queries and mutations
- TypeORM + PostgreSQL
- JWT-based authentication and role-based authorization
- Real-time notifications for new appointments (via Subscriptions / WebSockets)
- Docker Compose for easy setup

## add .env file
DB_HOST=postgres 
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=123456
DB_NAME=postgres

## Installation

1. Clone this repository.
2. Run `npm install`.
3. Copy or rename `.env.example` to `.env` (if provided) or set environment variables.
(Note: If want to run with doctor compose Add DB_HOST = postgres)
4. Run `docker-compose up --build`.
5. Access GraphQL Playground at `http://localhost:3000/graphql`.

## Useful Commands
- `npm run start:dev`: Start in watch mode.
- `npm run test`: Run tests.
