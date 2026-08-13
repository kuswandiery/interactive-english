# PHASE 7 REPORT — Student Dashboard

## Ringkasan

Phase 7 membangun **Student Dashboard** yang profesional dan lengkap untuk
English Academy, semuanya dengan **mock data frontend** (tanpa server,
database, REST API, atau backend). Dashboard, My Courses, dan Lessons dibangun
dengan layout sidebar yang responsive, komponen kartu yang reusable, progress
tracking, serta empty/loading state. Phase 1–6 tetap berfungsi.

## Halaman yang dibuat

1. `StudentDashboard` — halaman utama dashboard (`/student`).
2. `StudentCoursesPage` — My Courses (`/student/courses`).
3. `StudentLessonsPage` — Lessons (`/student/lessons`).

### Dashboard memuat

- Welcome section (sapaan + nama user dari `useAuth`).
- Learning statistics (`StatCard`: jumlah course, lesson selesai, jam belajar,
  sertifikat).
- Quick actions (`QuickActionCard`).
- Current courses (`CurrentCourseCard`).
- Progress overview (`ProgressOverview` dengan progress keseluruhan).
- Upcoming lessons (`UpcomingLessonCard`).
- Recent activity (`ActivityCard`).
- Recommended courses (menggunakan `CourseCard` publik, mengecualikan course
  yang sudah di-enroll).

### My Courses memuat

- `SearchBar` untuk search.
- `Filter` (Level + Category).
- `CurrentCourseCard` yang menampilkan progress + tombol Continue Learning.
- `EmptyState` ("No courses found" / "not enrolled yet").

### Lessons memuat

- Daftar lesson dengan status (`completed` / `in-progress` / `locked`).
- Video placeholder.
- Previous / Next lesson navigation.
- Tombol "Mark as Completed" (toggle) + toast feedback.
- Filter berdasarkan course lewat query param `?course=slug`.

## Route

Semua route dibungkus `ProtectedRoute allowedRoles={['student']}` dan
`StudentLayout`:

- `/student` → `StudentDashboard`
- `/student/courses` → `StudentCoursesPage`
- `/student/lessons` → `StudentLessonsPage`

Route menempel di luar `PublicLayout` karena dashboard memakai layout sendiri
(sidebar + top bar), sementara Phase 1–6 route tetap di dalam `PublicLayout`.

## Komponen baru

`src/components/dashboard/`:

- `CurrentCourseCard.tsx`
- `UpcomingLessonCard.tsx`
- `ActivityCard.tsx`
- `ProgressOverview.tsx`
- `QuickActionCard.tsx`
- `EmptyState.tsx`

`src/layouts/StudentLayout.tsx`:
- Sidebar student (Dashboard, My Courses, Lessons, Quiz, Progress,
  Certificates, Profile, Settings) dengan active state.
- Sidebar menjadi drawer pada layar mobile (`< lg`), dapat ditutup dengan
  overlay, Escape, atau tombol close.
- Menu yang belum ada halamannya (Quiz, Progress, Certificates, Profile,
  Settings) menampilkan toast "coming in a later phase".
- User box + Sign Out di bagian bawah.

## Mock data

- `src/data/studentCourses.ts` — 3 course ter-enroll dengan
  `completedLessons` / `totalLessons`, tutor, level, last/next lesson.
- `src/data/studentLessons.ts` — daftar lesson dengan status per lesson.
- `src/data/studentActivities.ts` — feed activity terbaru.

Semua diberi komentar bahwa ini mock dan akan diganti backend pada Phase 12.

## Progress tracking

`progress = completedLessons / totalLessons × 100`

- `CurrentCourseCard` menghitung `%` per course dan menampilkan bar, percentage,
  completed, dan remaining.
- `ProgressOverview` menghitung overall progress (rata-rata) + bar per course.
- Tampilan: progress bar, percentage, completed lessons, remaining lessons.

## Responsive testing

- Sidebar: `hidden` pada mobile (`< lg`), tampil sebagai drawer; grid statistik
  `sm:grid-cols-2 lg:grid-cols-4`; kartu course `sm:grid-cols-2`.
- Lessons: `lg:grid-cols-[300px_1fr]`, menumpuk pada mobile.
- Form/search `md:w-80`, filter wrap.
- Tidak ada horizontal overflow yang terlihat (menggunakan `container-page` +
  grid responsive).

Catatan jujur: verifikasi dilakukan melalui lint, build produksi, dan HTTP
route check (semua 200). Pengukuran lebar layar 375 / 768 / 1440 px secara
langsung di browser belum dieksekusi otomatis dalam sesi ini.

## Accessibility

- Semantic HTML (`section`, `nav`, `header`, `main`, `ul/li`, `button`).
- Keyboard navigation: drawer dapat dibuka via button dan ditutup dengan
  `Escape`; menu sidebar adalah NavLink/button native.
- Visible focus state (`focus-visible` global + outline pada QuickActionCard).
- `aria-label` pada tombol menu/Sign Out; `aria-expanded` pada tombol drawer;
  NavLink otomatis memberi `aria-current="page"`.
- Field berpengaruh (`Input`/`SearchBar`) sudah memiliki label/aria-label
  existing.

## Hasil lint

`npm run lint` (tsc --noEmit): **berhasil, tanpa error**.

## Hasil build

`npm run build` (tsc && vite build): **berhasil** (vite built in ~2s, semua
chunk termasuk StudentDashboard, StudentCoursesPage, StudentLessonsPage
dibuat).

## Error yang ditemukan

- `aria-current` pada NavLink diberi fungsi (tidak valid) → dihapus, NavLink
  otomatis menyediakannya.
- `Filters` type tidak punya index signature `[kind: string]` (tidak cocok
  dengan `FilterValue`) → diubah ke `{ [kind: string]: string }`.
- Import `Link` dan `type StudentLesson` yang salah sumber → dibersihkan /
  diarahkan ke `@/types/student`.
- Import `Filters`, `Download` yang tidak terpakai → dihapus (noUnusedLocals).

## File yang dibuat

- `src/types/student.ts`
- `src/data/studentCourses.ts`
- `src/data/studentLessons.ts`
- `src/data/studentActivities.ts`
- `src/layouts/StudentLayout.tsx`
- `src/components/dashboard/CurrentCourseCard.tsx`
- `src/components/dashboard/UpcomingLessonCard.tsx`
- `src/components/dashboard/ActivityCard.tsx`
- `src/components/dashboard/ProgressOverview.tsx`
- `src/components/dashboard/QuickActionCard.tsx`
- `src/components/dashboard/EmptyState.tsx`
- `src/pages/StudentDashboard.tsx` (ditulis ulang dari placeholder)
- `src/pages/StudentCoursesPage.tsx`
- `src/pages/StudentLessonsPage.tsx`
- `PHASE7_REPORT.md`

## File yang diubah

- `src/routes/index.tsx` — route student menjadi nested di bawah
  `StudentLayout` + `ProtectedRoute`.
- `src/components/index.ts` — export komponen dashboard baru.

## Cara menjalankan

```
npm run dev
```

Login demo student (`student@example.com` / `student123`) lalu buka
`/student`, `/student/courses`, dan `/student/lessons`.

## Konfirmasi backend belum dibuat

TIDAK ada backend yang dibuat pada Phase 7:

- Tidak ada REST API, PostgreSQL, JWT, server-side auth, atau database.
- Seluruh data di `src/data` adalah mock.
- Video adalah placeholder (video asli dijadwalkan Phase 12).
- Backend & database tetap pada **Phase 12**.

STOP — Phase 8 (Lessons & Learning System) dan seterusnya belum dikerjakan.