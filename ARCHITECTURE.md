# ARCHITECTURE — English Academy

## Overview

English Academy dirancang sebagai web application yang modular dan scalable.

Architecture harus memungkinkan project berkembang dari website sederhana menjadi platform pembelajaran online.

---

# Development Order

Untuk membangun dengan aman dan bertahap, **frontend dikerjakan lebih dulu dengan mock data**, lalu backend diintegrasikan setelah frontend selesai.

Urutan implementasi teknis mengikuti **AGENT.md** (referensi utama).

## Frontend-First with Mock Data

- Fase 1–11 adalah **frontend** (React + Vite + TypeScript + Tailwind).
- Data contoh disimpan di `src/data` (courses, tutors, quiz, testimonial, certificate).
- Belum ada pemanggilan ke server saat frontend berdiri sendiri.
- Frontend memuat data dari mock hingga backend siap.

## Backend After Frontend

- Backend (Node.js + Express REST API), **authentication server-side**, dan PostgreSQL dikerjakan pada **Fase 12**, setelah frontend selesai.
- Mock data kemudian diganti dengan data dari database.
- JWT & role-based access diterapkan di lapisan ini.

## Video Learning Placeholder

- Pada tahap awal, video learning menggunakan **placeholder/mock video**.
- Video asli/streaming diintegrasikan pada Fase 12 atau fase Advanced Features.

---

# Planned Technology Stack

## Frontend

Rencana:

- React
- Vite
- TypeScript
- Tailwind CSS
- Component-based UI
- Lucide Icons

---

## Backend

Rencana:

- Node.js
- Express.js
- REST API

---

## Database

Rencana:

PostgreSQL

---

## Authentication

Rencana:

- JWT
- Secure password hashing
- Protected routes
- Role-based access

---

# Planned Project Structure

```text
src/
├── components/
├── pages/
├── layouts/
├── hooks/
├── services/
├── types/
├── utils/
├── assets/
├── data/
└── routes/