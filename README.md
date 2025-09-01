Here’s a polished README template for your Simple Group Chat App:

# Simple Group Chat App

A real-time group chat application built with **Next.js (Frontend)**, **NestJS (Backend)**, **Socket.IO** for real-time messaging, and **PostgreSQL** as the database. Designed for learning and experimentation with web sockets, Docker, and full-stack development.

---

## Features

- Real-time messaging between multiple users
- Join different chat rooms
- Typing indicators
- Message history stored in PostgreSQL
- Dockerized setup for easy development and deployment

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS  
- **Backend:** NestJS, TypeScript, Socket.IO  
- **Database:** PostgreSQL  
- **Realtime:** WebSockets (Socket.IO)  
- **Dev Tools:** Docker, Docker Compose, Prisma ORM

---

## Project Structure

├─ client/        # Next.js frontend
├─ server/        # NestJS backend
├─ prisma/        # Prisma schema and migrations
├─ docker-compose.yml
└─ README.md

---

## Prerequisites

- Node.js v18+
- Docker & Docker Compose
- npm or yarn

---

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/simple-group-chat.git
cd simple-group-chat

	2.	Run with Docker Compose

docker compose up --build

This will start three services:
	•	PostgreSQL database
	•	NestJS backend at http://localhost:3001
	•	Next.js frontend at http://localhost:3000

	3.	Access the app

Open http://localhost:3000 in your browser and start chatting!

⸻

Environment Variables

Create a .env file in the server directory with:

DATABASE_URL=postgresql://postgres:password@postgres:5432/chatdb?schema=public
PORT=3001


⸻

Database
	•	Prisma is used for database modeling
	•	Migrate schema using:

npx prisma migrate dev --name init
npx prisma generate
