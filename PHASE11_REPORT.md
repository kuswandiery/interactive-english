# PHASE 11 REPORT — Admin Dashboard & Administration System

## Ringkasan

Phase 11 membangun **Admin Dashboard & Administration System** lengkap untuk area admin. Semua fitur dibangun dengan React + TypeScript + mock data, tanpa backend, REST API, Express, PostgreSQL, JWT, atau autentikasi server-side. Terdapat layout admin baru dengan sidebar responsif, serta 7 halaman admin: Dashboard, Student Management, Tutor Management, Course Management, Certificate Management, Reports, dan Settings. Data dikelola seluruhnya dari file di folder `src/data`; semua operasi CRUD (tambah/edit/hapus/terbit/revoke) hanyalah **simulasi frontend**. Pengaturan admin disimpan ke `localStorage`.

---

## Halaman

| Halaman | Deskripsi |
| --- | --- |
| Admin Dashboard | Statistik (students, tutors, courses, enrollments, certificates, revenue), recent activities, enrollment overview, course popularity, quick actions |
| Student Management | Daftar siswa, search, filter status, kolom lengkap, dan aksi View / Edit / Delete (simulasi) |
| Tutor Management | Daftar tutor, search, filter spesialisasi, Add / Edit / Delete dengan Modal + validasi + toast |
| Course Management | Daftar kursus, search, filter level, Add / Edit / Delete dengan form reusable + Modal + toast |
| Certificate Management | Daftar sertifikat, search, filter status, Issue & Revoke certificate (simulasi) |
| Reports | Enrollment report, Revenue report, Student growth report, Course popularity report dengan chart frontend |
| Settings | Kategori General, Notifications, Courses, Certificates — disimpan ke localStorage |

---

## Route

| Route | Halaman |
| --- | --- |
| `/admin` | AdminDashboard |
| `/admin/students` | AdminStudentsPage |
| `/admin/tutors` | AdminTutorsPage |
| `/admin/courses` | AdminCoursesPage |
| `/admin/certificates` | AdminCertificatesPage |
| `/admin/reports` | AdminReportsPage |
| `/admin/settings` | AdminSettingsPage |

Semua route dibungkus `ProtectedRoute` (role `admin`) dan layout `AdminLayout`. Verifikasi HTTP: semua route di atas mengembalikan **200**.

---

## Komponen Baru

**Layout (`src/layouts/AdminLayout.tsx`)**
- Sidebar (Dashboard, Students, Tutors, Courses, Certificates, Reports, Settings)
- Active menu state (`NavLink` + `isActive`)
- Responsive: sidebar tetap di `lg`, drawer di mobile
- Mobile drawer + overlay + Escape-to-close

**Shared (`src/components/admin/`)**
- `AdminTable` — tabel generik dengan EmptyState
- `AdminStatCard` — kartu statistik dengan trend
- `ConfirmDialog` — dialog konfirmasi hapus (gunakan `Modal`)
- `AdminPageToolbar` — baris search + filter + action
- `AdminBarChart` — chart bar CSS (frontend)
- `PopularityList` — daftar popularitas dengan bar

---

## Layout

`AdminLayout` mengikuti pola `StudentLayout`: sidebar tetap di desktop, drawer di mobile, overlay, dan Escape-to-close. Menu aktif diberi gaya `bg-primary`. Logout tersedia di bagian bawah sidebar.

---

## Mock Data

Semua file ditandai komentar: `"This is mock data and will be replaced in Phase 12."`

- `src/data/adminStudents.ts` — 8 siswa
- `src/data/adminTutors.ts` — 6 tutor + opsi spesialisasi
- `src/data/adminCourses.ts` — 6 kursus + kategori + level
- `src/data/adminCertificates.ts` — 6 sertifikat + opsi status
- `src/data/adminReports.ts` — statistik dashboard, aktivitas, dan 4 laporan

---

## Student management

- List + Search + Filter status + Empty state.
- Kolom: Name, Email, Course, Progress, Enrollment Date, Status.
- Aksi: **View** (modal detail), **Edit** (modal form), **Delete** (konfirmasi).
- Semua operasi simulasi frontend (state lokal).

---

## Tutor management

- List + Search + Filter spesialisasi.
- **Add tutor**, **Edit tutor**, **Delete tutor** menggunakan modal.
- Validasi: Name wajib, Email wajib & valid, Specialization wajib.
- Toast notification untuk tiap aksi.

---

## Course management

- List + Search + Filter level.
- **Add course**, **Edit course**, **Delete course**.
- Form reusable (`CourseFormModal`) + Modal + Toast.
- Validasi: Title wajib, Category wajib, Level wajib.

---

## Certificate management

- List + Search + Filter.
- Status: **Completed**, **Pending**, **Revoked**.
- Aksi: **Issue certificate** (mengubah pending → completed + ID + tanggal) dan **Revoke certificate**.
- Semua simulasi frontend dengan toast.

---

## Reports

- **Enrollment report**, **Revenue report**, **Student growth report**, **Course popularity report**.
- Menggunakan chart frontend (`AdminBarChart` & `PopularityList`) berbasis CSS — tanpa API, tanpa data dari internet.

---

## Settings

Kategori:
- **General** — Site name, Support email, Maintenance mode
- **Notifications** — Enrollment, new tutor, new reviews
- **Courses** — Auto-approve, default level, enrollment cap
- **Certificates** — Auto-issue, certificate expiry days

Disimpan ke `localStorage` (key: `english_academy_admin_settings`) melalui `src/services/adminSettingsService.ts`.

---

## localStorage

- `english_academy_admin_settings` — seluruh pengaturan admin (dibaca via `getStoredAdminSettings`, ditulis via `saveAdminSettings`).

---

## Responsive Testing

- **Desktop (1440px):** sidebar tetap, tabel & chart multi-kolom.
- **Tablet (768px):** kartu statistik `sm:grid-cols-2`, toolbar menyesuaikan (`sm:`).
- **Mobile (375px):** sidebar menjadi drawer, tabel `overflow-x-auto` dengan `min-w` untuk menghindari layout pecah, form modal satu kolom.
- Tidak ada horizontal overflow (menggunakan `min-w-0`, `truncate`, `flex-wrap`, `overflow-x-auto`).

---

## Accessibility

- Semantic HTML: `section`, `nav`, `table`/`th`/`td` dengan `scope="col"`, `header`, `form`.
- `aria-label` pada search bar, toolbar, dan select tanpa label terlihat.
- `aria-current` (dari `NavLink`) untuk menu aktif.
- `aria-expanded` pada tombol hamburger drawer.
- Keyboard navigation & focus state (`focus-visible:outline`, `focus:ring-2`).
- Modal dapat ditutup dengan Escape (komponen `Modal` yang sudah ada).
- Badge/status diberi label teks yang jelas, bukan hanya warna.

---

## Hasil lint

```
> english-academy@0.1.0 lint
> tsc --noEmit

```
Berhasil tanpa error.

---

## Hasil build

```
> english-academy@0.1.0 build
> tsc && vite build
... ✓ built in 3.03s
```
Berhasil tanpa error.

---

## Error yang ditemukan

- `TS6133` unused imports (`TrendingDown`, `Button`, `Card`) — diperbaiki.
- `TS2322` tipe aktivitas `'enrollment'` tidak ada di union tipe `AdminActivity` — data diubah ke `'student'`.
- Setelah perbaikan, lint & build bersih.

---

## File yang dibuat

```
src/types/admin.ts

src/data/adminStudents.ts
src/data/adminTutors.ts
src/data/adminCourses.ts
src/data/adminCertificates.ts
src/data/adminReports.ts

src/services/adminSettingsService.ts

src/layouts/AdminLayout.tsx

src/components/admin/AdminTable.tsx
src/components/admin/AdminStatCard.tsx
src/components/admin/ConfirmDialog.tsx
src/components/admin/AdminPageToolbar.tsx
src/components/admin/AdminBarChart.tsx
src/components/admin/PopularityList.tsx
src/components/admin/index.ts

src/pages/AdminDashboard.tsx
src/pages/AdminStudentsPage.tsx
src/pages/AdminTutorsPage.tsx
src/pages/AdminCoursesPage.tsx
src/pages/AdminCertificatesPage.tsx
src/pages/AdminReportsPage.tsx
src/pages/AdminSettingsPage.tsx

PHASE11_REPORT.md
```

---

## File yang diubah

```
src/routes/index.tsx     (AdminLayout + 7 route admin)
Files lama Phase 1–10      (tidak ada yang diubah fungsinya)
```

---

## Cara menjalankan

```
npm install
npm run dev        # development server
npm run lint       # type check (tsc --noEmit)
npm run build      # production build
npm run preview    # serve hasil build produksi
```

Login sebagai admin (akun mock `admin@example.com` / `admin123`) lalu akses menu di sidebar admin.

---

## Konfirmasi backend

**Backend BELUM dibuat.** Tidak ada REST API, Express, PostgreSQL, JWT, atau autentikasi server-side. Seluruh fitur Phase 11 berjalan dengan React + TypeScript + mock data + localStorage, dengan semua operasi CRUD sebagai simulasi frontend. Backend direncanakan pada Phase 12.