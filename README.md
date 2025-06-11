# 🔗 URL Shortener API

A simple and efficient URL shortener built with **Fastify**, **Prisma**, **SQLite**, and tested using **Jest**.

---

## ✨ Features

- 🔗 Shorten long URLs
- ↪️ Redirect short codes to original URLs
- 🧠 Prevent duplicate short links
- 📦 Store and retrieve all shortened URLs
- 🧪 Full unit test coverage with Jest
- ♻️ Modular architecture (Controller → Service → DB)

---

## 📁 Project Structure

```
src/
├── controllers/       # Route handlers
├── interfaces/        # Interfaces (contracts)
├── routes/            # Route definitions
├── services/          # Business logic
├── utils/             # Helpers (e.g. nanoid generator)
├── prisma/            # DB schema and migrations
└── index.ts           # Fastify app entry
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/misaelmamangun/url-shortener.git
cd url-shortener
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Run the server

```bash
npm run dev
```

---

## 🧰 Scripts

| Script                  | Description                            |
| ----------------------- | -------------------------------------- |
| `npm run dev`           | Run development server (ts-node)       |
| `npm run build`         | Build app to `dist/`                   |
| `npm run start`         | Run built app (`node dist/index.js`)   |
| `npm run test`          | Run unit tests                         |
| `npm run test:watch`    | Run Jest watch mode                    |
| `npm run test:coverage` | Run tests and generate coverage report |
| `npm run coverage`      | Open coverage report                   |
| `npx prisma studio`     | Launch Prisma web GUI                  |

---

## 🧪 Testing

### Run all tests

```bash
npm run test
```

### Run with coverage

```bash
npm run test:coverage
```

---

## 🔗 Example Endpoints

### `POST /shorten`

Shortens a long URL.

**Request:**

```json
{
  "url": "https://example.com"
}
```

**Response:**

```json
{
  "data": {
    "url": "https://example.com",
    "code": "abc123"
  },
  "message": "Success"
}
```

---

### `GET /:code`

Redirects to the original URL.

```http
GET /abc123
302 Found
Location: https://example.com
```

---

### `GET /`

Returns all shortened URLs.

```json
{
  "data": [
    {
      "id": 1,
      "url": "https://example.com",
      "code": "abc123"
    }
  ]
}
```

---

## 📦 Tech Stack

- ⚡ **Fastify** — Web framework
- 🔷 **TypeScript** — Type safety
- 🧬 **Prisma** — ORM for SQLite/PostgreSQL
- 📁 **SQLite** — Lightweight database
- 🧪 **Jest** — Testing framework
- 🔑 **Nanoid** — Unique ID generator

---
