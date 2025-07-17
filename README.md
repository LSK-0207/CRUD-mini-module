# 🧱 CRUD Module Starter – Next.js + Prisma + PostgreSQL

A minimal full-stack boilerplate built with the modern **Next.js App Router**, **Prisma**, and **PostgreSQL**

> Built from scratch — focused on mastering local setup, Prisma ORM, server actions, and clean CRUD logic with database integration.

---

## 🚀 Stack Overview

- **Frontend:** [Next.js 14+ App Router](https://nextjs.org/docs/app)
- **Backend:** API Routes + Server Actions
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL (via Docker in dev)
- **Styling:** Tailwind CSS
- **DevOps:** Docker Compose (Postgres), Vercel (planned deployment)

---

## 🧩 Folder Structure

```
├── /app
│   └── /users
│       ├── page.tsx               # Listing all users
│       ├── new/page.tsx           # Create user page (form)
│       └── [id]/page.tsx          # Update user form
│   └── page.tsx
├── /lib
│   ├── prisma.ts                  # Singleton Prisma client
│   └── actions/
│       ├── actions.ts             # Server actions for CRUD
│   └── validations/
│       └── validSchema.ts         # Zod schema for form
├── /components/
│   ├── UserUpdateClient.tsx       # Reusable form component
├── /prisma
│   └── schema.prisma              # DB Schema
├── docker-compose.yml
├── .env                           # environment variables
├── .env.example
├── README.md
```

---

## 🛠️ Local Development Setup (with Docker)

### 1. Clone the Repo

```bash
git clone https://github.com/LSK-0207/CRUD-mini-module
cd CRUD-mini-module
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start PostgreSQL via Docker

```bash
docker-compose up -d
```

This spins up a local Postgres container on `localhost:5432`

### 4. Configure `.env`

Copy `.env.example`:

```bash
cp .env.example .env
```

Set:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
```

### 5. Push Prisma Schema

```bash
npx prisma db push
```

### 6. Start Dev Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🧪 What’s Implemented in this Module

- ✅ Local DB setup using Docker
- ✅ Prisma ORM integration
- ✅ Full CRUD via server actions
- ✅ UI with Tailwind
- ✅ Modular folder structure
- ✅ Tested and working locally

---

## 🧠 Why This Exists

I'm building full-stack modules in public — learning via experimentation and documenting it.  
This is **Module 1** in the series: focusing on database + CRUD foundations.

---

## 🪪 License

[MIT](LICENSE)

---

## 🙌 Feedback Welcome

If you have feedback, ideas, or want to collaborate — feel free to open an issue.
