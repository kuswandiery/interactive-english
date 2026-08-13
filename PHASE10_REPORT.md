# PHASE 10 REPORT — Certificates, Profile, Settings & Student Progress

## Ringkasan

Phase 10 menambahkan empat halaman baru pada area siswa (Student): **Student Progress**, **Certificates**, **Profile**, dan **Settings**. Seluruh fitur dibangun dengan React + TypeScript + mock data, tanpa backend, tanpa REST API, dan tanpa database. Halaman Progress menggunakan chart frontend berbasis CSS (tanpa library eksternal dan tanpa mengambil data dari internet). Profile dan Settings menyimpan data ke `localStorage`. Navbar sidebar siswa yang sebelumnya berlabel "Soon" untuk Progress, Certificates, Profile, dan Settings kini sudah menjadi tautan aktif.

---

## Halaman

| Halaman | Deskripsi |
| --- | --- |
| Student Progress | Overall progress, course completion, completed lessons, active courses, study hours, weekly & monthly activity charts, learning streak, achievement cards |
| Certificates | Daftar sertifikat (completed / in-progress / locked), detail, preview, dan tombol View Certificate + Download PDF (simulasi) |
| Profile | Avatar, full name, email, biography, learning goal, preferred language, serta form update profile dengan validasi |
| Settings | Kategori Account, Appearance, Learning, dan Privacy; semua tersimpan di localStorage |

---

## Route

| Route | Halaman |
| --- | --- |
| `/student/progress` | StudentProgressPage |
| `/student/certificates` | StudentCertificatesPage |
| `/student/profile` | StudentProfilePage |
| `/student/settings` | StudentSettingsPage |

Semua route terdaftar di dalam `ProtectedRoute` (role `student`) dan layout `StudentLayout`. Verifikasi HTTP: semua route di atas mengembalikan **200**.

---

## Komponen Baru

**Progress (`src/components/progress/`)**
- `ProgressSummaryCard` — ringkasan overall progress + statistik
- `AchievementCard` — kartu pencapaian (unlocked/locked, progress bar)
- `WeeklyProgressChart` — chart bar mingguan (CSS murni)
- `MonthlyProgressChart` — chart bar bulanan (CSS murni)

**Certificate (`src/components/certificate/`)**
- `CertificateCard` — kartu status sertifikat + tombol aksi
- `CertificatePreview` — pratinjau sertifikat
- `CertificateBadge` — badge status

**Settings (`src/components/settings/`)**
- `Toggle` — switch aksesibel (`role="switch"`, `aria-checked`)
- `SettingSection`, `SettingRow`, `SettingToggleRow` — struktur pengaturan

---

## Mock Data

- `src/data/progress.ts` — summary progress, achievements, weekly & monthly activity
- `src/data/certificates.ts` — 6 sertifikat (1 completed, 2 in-progress, 3 locked)

---

## localStorage

- **Profile** — `key: english_academy_profile`
  - Field: `name`, `email`, `bio`, `goal`, `preferredLanguage`, `avatar`
- **Settings** — `key: english_academy_settings`
  - Field: `notifications`, `emailUpdates`, `courseReminders`, `theme`, `autoPlayLessons`, `videoQuality`, `learningReminders`, `publicProfile`, `shareAchievements`

Implementasi melalui service + context:
- `src/services/profileService.ts` → `ProfileContext`
- `src/services/settingsService.ts` → `SettingsContext`

---

## Chart

Chart dibangun **frontend-only** dengan div/bar CSS:

- `WeeklyProgressChart` — bar per hari (Senin–Minggu), menandai hari ini.
- `MonthlyProgressChart` — bar per bulan (Jan–Des), menampilkan total & puncak.

Tidak ada pemanggilan API dan tidak ada pengambilan data dari internet.

---

## Certificates

- Status: **Completed**, **In Progress**, **Locked**.
- Sertifikat completed → tombol **View Certificate** (membuka modal preview) dan **Download PDF**.
- Download PDF **hanya simulasi** — mengklik tombol menampilkan toast "simulated PDF download", tanpa backend.
- Empty state muncul jika tidak ada sertifikat atau tidak ada hasil filter.

---

## Profile

Form update profile dengan field: Name, Email, Bio, Learning Goal, Preferred Language.

Validasi:
- Name wajib.
- Email wajib.
- Email harus valid (regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`).

Simpan ke `localStorage`. Awalan avatar otomatis dihitung dari nama.

---

## Settings

Kategori:

- **Account** — Notifications, Email updates, Course reminders
- **Appearance** — Theme (Light / Dark / System)
- **Learning** — Auto-play lessons, Video quality, Learning reminders
- **Privacy** — Public profile, Share achievements

Semua perubahan langsung terseimpan ke `localStorage` dan memicu toast "Settings saved".

---

## Responsive Testing

- **Desktop (1440px):** grid multi-kolom (mis. `sm:grid-cols-2 lg:grid-cols-3`) untuk kartu sertifikat & achievement; chart dua kolom pada `lg`.
- **Tablet (768px):** grid menyesuaikan (`sm:` breakpoint).
- **Mobile (375px):** kartu & form menjadi satu kolom; flex-wrap pada header dan tombol filter; tidak ada horizontal overflow (`min-w-0`, `truncate`, `flex-wrap` digunakan).

Verifikasi awal di browser tanpa horizontal overflow. Konfirmasi visual penuh dilakukan via `npm run dev`.

---

## Accessibility

- Semantic HTML (`section`, `nav`, `ol/li`, `header`, `form`, `label`).
- `aria-label` pada select tanpa label, overlay chart, dan kontrol.
- `aria-pressed` pada tombol filter sertifikat; `aria-selected` pada tab.
- `role="switch"` + `aria-checked` pada Toggle.
- `role="tablist"`, `role="dialog"`, `aria-modal` sesuai komponen.
- Keyboard navigation & focus state (`focus:outline-none focus:ring-2`).
- Modal dapat ditutup dengan Escape (dari komponen `Modal` yang sudah ada).

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
... ✓ built in 3.60s
```
Berhasil tanpa error.

---

## Error yang ditemukan

- `TS6133` unused imports di beberapa file baru — telah diperbaiki.
- `TS6196` / `TS2554` terkait argumen fungsi handler — telah diperbaiki.
- Server preview di shell gagal saat pertama kali; diselesaikan dengan menjalankan di latar belakang untuk verifikasi HTTP 200.

---

## File yang dibuat

```
src/types/progress.ts
src/types/certificate.ts
src/types/profile.ts
src/types/settings.ts

src/data/progress.ts
src/data/certificates.ts

src/services/profileService.ts
src/services/settingsService.ts

src/context/ProfileContext.tsx
src/context/SettingsContext.tsx

src/components/progress/ProgressSummaryCard.tsx
src/components/progress/AchievementCard.tsx
src/components/progress/WeeklyProgressChart.tsx
src/components/progress/MonthlyProgressChart.tsx
src/components/progress/index.ts

src/components/certificate/CertificateCard.tsx
src/components/certificate/CertificatePreview.tsx
src/components/certificate/CertificateBadge.tsx
src/components/certificate/index.ts

src/components/settings/Toggle.tsx
src/components/settings/SettingSection.tsx
src/components/settings/index.ts

src/pages/StudentProgressPage.tsx
src/pages/StudentCertificatesPage.tsx
src/pages/StudentProfilePage.tsx
src/pages/StudentSettingsPage.tsx

PHASE10_REPORT.md
```

---

## File yang diubah

```
src/App.tsx                      (tambah ProfileProvider & SettingsProvider)
src/routes/index.tsx             (tambah 4 route progress/certificates/profile/settings)
src/layouts/StudentLayout.tsx    (aktifkan nav Progress, Certificates, Profile, Settings)
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

Login sebagai student (akun mock `alex@example.com`) lalu akses menu di sidebar:
Progress, Certificates, Profile, Settings.

---

## Konfirmasi backend

**Backend BELUM dibuat.** Tidak ada REST API, tidak ada PostgreSQL, tidak ada JWT, tidak ada Express. Seluruh fitur Phase 10 berjalan dengan React + TypeScript + mock data + localStorage. Backend direncanakan pada Phase 12.