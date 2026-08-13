# PHASE 8 REPORT — Lessons & Learning System

## Ringkasan

Phase 8 menyempurnakan **Learning System** yang sudah dibuat pada Phase 7
dengan menambahkan **Learning Player** halaman penuh, **Course Curriculum
Sidebar**, **Lesson Navigation**, **Mark as Completed**, **Recommended Next
Lesson**, dan **Learning Statistics**. Seluruhnya memakai **mock data** dan
state frontend bersama (shared context) — tanpa server, REST API, database,
PostgreSQL, atau JWT. Phase 1–7 tetap berfungsi.

## Halaman yang dibuat

1. `LearningPlayerPage` — `/student/learn/:courseSlug/:lessonId`.

### Learning Player memuat

- Video player placeholder (`VideoPlayer`).
- Lesson title & description.
- Course progress bar (persen, completed, remaining).
- Estimated duration badge.
- Previous / Next lesson buttons.
- Mark as completed / in-progress toggle.
- Course Curriculum Sidebar (desktop aside + mobile drawer).
- Recommended next lesson card.
- Learning statistics.
- Empty states: course not found, lesson not found, no recommended lessons.
- Loading skeleton.

## Route

Dalam `StudentLayout` + `ProtectedRoute allowedRoles={['student']}`:

- `/student` → `StudentDashboard`
- `/student/courses` → `StudentCoursesPage`
- `/student/lessons` → `StudentLessonsPage` (dipakai ulang, tidak dibuat ulang)
- `/student/learn/:courseSlug/:lessonId` → `LearningPlayerPage`

## Komponen baru

`src/components/learning/`:

- `VideoPlayer.tsx` — placeholder video; ikon play / lock, badge completed.
- `LessonSidebar.tsx` — daftar curriculum per module dengan status
  (Completed / In Progress / Locked); aktif ditandai; pada mobile menjadi
  drawer dengan overlay, tutup via Escape/pilih lesson.
- `LessonNavigation.tsx` — tombol Previous/Next dengan state disabled di
  batas pertama/terakhir.
- `RecommendedLessonCard.tsx` — kartu "Recommended next lesson".
- `LessonNavigation`, `RecommendedLessonCard`, `LearningStats.tsx` —
  statistik learning hours, lesson completions, streak, active courses.
- `src/components/learning/index.ts` + export di `components/index.ts`.

## Mock data

Semua ditandai: *"This is mock data and will be replaced in Phase 12."*

- `src/data/studentLessons.ts` (diperbarui) — daftar lesson lengkap untuk 3
  course (General English, English Conversation, Business English) dengan
  `description`, `duration`, `status`, dan `order`.
- `src/data/studentCourses.ts` (diperbarui) — `completedLessons`/`totalLessons`
  disinkronkan dengan daftar lesson agar progress konsisten.
- `src/data/courseCurriculum.ts` (baru) — struktur module (section) per course
  yang dipakai sidebar curriculum.
- `src/types/student.ts` (diubah) — `StudentLesson` ditambah `description`.

## Learning system

- **State bersama**: `src/context/LearningContext.tsx` (`LearningProvider` +
  `useLearning()`) menjadi sumber tunggal status lesson. Status & progress
  konsisten antar halaman.
- **Continue Learning**: tombol di Dashboard dan My Courses kini mengarah ke
  `getContinueLesson(slug)` (lesson terakhir yang belum selesai), menautkan
  langsung ke `/student/learn/:courseSlug/:lessonId`. `CurrentCourseCard`
  menerima prop baru `continueTo`.
- **Lessons list page** di-refactor memakai `useLearning` agar toggling
  completion-nya ikut memperbarui progress global.

## Progress tracking

`progress = completedLessons / totalLessons × 100`

- `getCourseProgress(slug)` menghitung `{ completed, total, progress,
  remaining }` dari status lesson.
- Setelah "Mark as completed", status diperbarui di context, lesson berikutnya
  yang terkunci otomatis di-unlock menjadi in-progress, dan progress pada
  player/dashboard/my-courses diperbarui otomatis (karena semua membaca
  context yang sama).
- Toast: **"Lesson completed successfully."** saat lesson menjadi completed.

## Responsive testing

- Learning Player: `lg:grid-cols-[320px_1fr]`, menumpuk pada mobile.
- LessonSidebar: statis di `lg`, menjadi drawer (max-w 85vw) pada mobile.
- LearningStats: `grid-cols-2 lg:grid-cols-4`.
- LessonNavigation: `grid-cols-2`.
- Tidak ada horizontal overflow yang terlihat (menggunakan grid + max-width).

Catatan jujur: verifikasi dilakukan melalui lint, build produksi, dan HTTP
route check (semua 200). Pengukuran lebar layar 375 / 768 / 1440 px secara
langsung di browser belum dieksekusi otomatis dalam sesi ini.

## Accessibility

- Semantic HTML (`nav`, `section`, `aside`, `ul/li`, `button`, dialog).
- Keyboard navigation: `aria-expanded` pada tombol drawer/toggle; drawer dapat
  ditutup dengan `Escape`; lesson aktif diberi `aria-current`.
- `aria-label` pada tombol play, open-curriculum, close-curriculum.
- Visible focus state (global `focus-visible`).
- Ikon dengan `sr-only` teks untuk konten non-teks (video placeholder dsb).

## Hasil lint

`npm run lint` (tsc --noEmit): **berhasil, tanpa error**.

## Hasil build

`npm run build` (tsc && vite build): **berhasil** (build ~2.5s, termasuk
chunk LearningPlayerPage dan komponen learning).

## Error yang ditemukan

- Import `Download`, `Link`, `type StudentLesson` yang salah sumber/tdk terpakai
  di `StudentLessonsPage` → dibersihkan / diarahkan ke `@/types/student`.
- Tipe `description` belum ada pada `StudentLesson` → ditambahkan di
  `types/student.ts`.
- Duplikasi status lesson antar halaman (Phase 7 memakai `useState` lokal) →
  dipusatkan ke `LearningContext` agar progress sinkron.

## File yang dibuat

- `src/context/LearningContext.tsx`
- `src/components/learning/VideoPlayer.tsx`
- `src/components/learning/LessonSidebar.tsx`
- `src/components/learning/LessonNavigation.tsx`
- `src/components/learning/RecommendedLessonCard.tsx`
- `src/components/learning/LearningStats.tsx`
- `src/components/learning/index.ts`
- `src/pages/LearningPlayerPage.tsx`
- `src/data/courseCurriculum.ts`
- `PHASE8_REPORT.md`

## File yang diubah

- `src/types/student.ts` (tambah `description`)
- `src/data/studentLessons.ts` (expand + deskripsi)
- `src/data/studentCourses.ts` (sinkronkan progress)
- `src/components/dashboard/CurrentCourseCard.tsx` (tambah `continueTo`)
- `src/pages/StudentDashboard.tsx` (Continue Learning + progress dari context)
- `src/pages/StudentCoursesPage.tsx` (Continue Learning + progress dari context)
- `src/pages/StudentLessonsPage.tsx` (perpindahan ke `useLearning`)
- `src/routes/index.tsx` (route `learn/:courseSlug/:lessonId`)
- `src/App.tsx` (bungkus `LearningProvider`)
- `src/components/index.ts` (export komponen learning)

## Cara menjalankan

```
npm run dev
```

Login demo student (`student@example.com` / `student123`). Dari Dashboard atau
My Courses klik **Continue Learning**, atau buka langsung:
`/student/learn/general-english/ge-l2`.

## Konfirmasi backend belum dibuat

TIDAK ada backend yang dibuat pada Phase 8:

- Tidak ada REST API, PostgreSQL, JWT, server-side auth, atau database.
- Seluruh data di `src/data` adalah mock.
- Video adalah placeholder (video asli dijadwalkan Phase 12).
- Backend & database tetap pada **Phase 12**.

STOP — Phase 9 (Quiz & Progress), Certificates, Admin Dashboard, dan Backend
belum dikerjakan.