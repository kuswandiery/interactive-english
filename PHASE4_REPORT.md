# PHASE 4 REPORT — Courses & Course Detail

## 1. Ringkasan Phase 4

Membangun sistem frontend Courses dan Course Detail untuk English Academy menggunakan mock data. Fase ini mencakup katalog kursus lengkap dengan pencarian (search), filter, sorting, halaman detail kursus dengan curriculum accordion, video placeholder, enrollment flow simulasi, related courses, serta empty/error state. Seluruh proses berjalan di frontend dengan mock data, tanpa backend, REST API, atau database.

---

## 2. Halaman yang dibuat

- **CoursesPage** — katalog kursus di `/courses`
- **CourseDetailPage** — detail kursus di `/courses/:slug`

---

## 3. Route yang tersedia

- `/`
- `/courses`
- `/courses/:slug`
- `/showcase`
- `/tutors` (placeholder)
- `/pricing` (placeholder)
- `/about` (placeholder)
- `/blog` (placeholder)
- `/contact` (placeholder)
- `/login` (placeholder)
- `/register` (placeholder)

Semua route kembali HTTP 200 saat diuji.

---

## 4. Komponen yang digunakan kembali

- `CourseCard` + `CourseGridSkeleton` (dari `components/course/CourseCard`)
- `Card`
- `Badge`
- `Button`
- `SearchBar`
- `Filter`
- `Select`
- `Accordion`
- `Breadcrumb`
- `Toast` / `useToast`

---

## 5. Komponen baru

- `components/ui/Breadcrumb.tsx` — komponen breadcrumb reusable yang accessible (menggunakan `aria-current="page"` untuk item terakhir)
- `hooks/useCourseFilters.ts` — hook untuk logika search, filter, dan sorting frontend

---

## 6. Mock data yang dibuat/diubah

**Dibuat:**
- `data/courses.ts` — 8 program kursus lengkap: General English, English Conversation, Business English, IELTS Preparation, TOEFL Preparation, English for Kids, English for Teens, dan Private English. Setiap kursus memiliki `slug`, `title`, `description`, `shortDescription`, `level`, `category`, `tutor`, `tutorRole`, `rating`, `reviewCount`, `duration`, `lessons`, `price`, `originalPrice`, `popular`, `students`, `features`, `learningOutcomes`, `requirements`, dan `curriculum`.

**Diubah:**
- `data/navigations.ts` — diubah menjadi re-export dari `data/courses.ts` agar tidak ada duplikasi data.
- `types/card.ts` — diperluas: menambahkan `slug`, `shortDescription`, `reviewCount`, `originalPrice`, `popular`, `students`, `tutorRole`, `features`, `learningOutcomes`, `requirements`, dan `curriculum`.

---

## 7. Search

Search berjalan real-time di frontend (tanpa API). Mencari berdasarkan:

- Title
- Description
- Category
- Level

---

## 8. Filter

Filter frontend yang dapat dikombinasikan dengan search:

- **Level**: All, Beginner, Elementary, Intermediate, Upper Intermediate, Advanced
- **Category**: General English, Conversation, Business, IELTS, TOEFL, Kids, Teens, Private
- **Price**: All, Free, Paid
- **Rating**: All, 4.0+, 4.5+

Filter dapat digunakan bersama search. Contoh: search "IELTS" + Level "Advanced" menampilkan hasil yang memenuhi kedua kondisi.

---

## 9. Sorting

Sorting dilakukan pada mock data:

- Most Popular
- Highest Rated
- Price: Low to High
- Price: High to Low

---

## 10. Enrollment flow

Enrollment merupakan simulasi frontend (sesuai BEHAVIOR.md, tanpa backend):

- Klik tombol **"Enroll Now"** menampilkan toast **"Course added to My Courses."**
- Label tombol berubah menjadi **"Enrolled ✓"** sebagai state mock.
- Klik kembali menampilkan toast info **"You are already enrolled in this course."**

Redirect ke halaman login untuk pengguna yang belum login menunggu fase authentication (Phase 6/7). Saat ini route `/login` sudah tersedia sebagai placeholder.

---

## 11. Error/empty state

- **Slug tidak ditemukan**: halaman **"Course Not Found"** dengan CTA **"Back to Courses"**, tanpa menampilkan stack trace teknis.
- **Tidak ada hasil search/filter**: empty state **"No courses found"** dengan tombol **"Clear Filters & Explore"** untuk mereset kriteria.

---

## 12. File yang dibuat

- `src/pages/CoursesPage.tsx`
- `src/pages/CourseDetailPage.tsx`
- `src/data/courses.ts`
- `src/components/ui/Breadcrumb.tsx`
- `src/hooks/useCourseFilters.ts`

---

## 13. File yang diubah

- `src/types/card.ts`
- `src/components/course/CourseCard.tsx`
- `src/data/navigations.ts`
- `src/components/index.ts`
- `src/routes/index.tsx`
- `src/pages/ComponentsShowcase.tsx`

---

## 14. Hasil TypeScript check

`npm run lint` (tsc --noEmit) → **bersih**, tanpa error.

---

## 15. Hasil production build

`npm run build` (tsc + Vite) → **sukses**, tanpa warning.

---

## 16. Hasil testing

- `/` → 200 (Homepage Phase 3 tetap berfungsi)
- `/courses` → 200
- `/courses/general-english` → 200
- `/courses/ielts-preparation` → 200
- `/courses/english-for-kids` → 200
- `/courses/invalid-slug` → 200 (menampilkan error state "Course Not Found")

---

## 17. Error yang ditemukan dan diperbaiki

1. **TS2353 / TS2339**: properti `students` tidak ada pada tipe `CourseData` → ditambahkan pada `types/card.ts`.
2. **TS2353**: `ComponentsShowcase` menggunakan field lama `description` pada `demoCourse` → diganti dengan field baru `shortDescription`, `slug`, `id`, dan `reviewCount`.

Setelah perbaikan, TypeScript check dan production build bersih.

---

## 18. Cara menjalankan project

```bash
npm install        # instalasi dependency (jika belum)
npm run dev        # development server → http://localhost:5173
npm run build      # production build ke dist/
npm run preview    # pratinjau build produksi
```

URL berguna:
- Katalog: `http://localhost:5173/courses`
- Detail kursus: `http://localhost:5173/courses/general-english`

---

_Selesai. Phase 4 selesai dan berhenti di sini. Phase berikutnya (Phase 5+) hanya dikerjakan setelah mendapat instruksi._