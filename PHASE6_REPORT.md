# PHASE 6 REPORT — Frontend Authentication

## 1. Ringkasan

Phase 6 menambahkan **frontend authentication** penuh pada English Academy.
Seluruh sistem berjalan di sisi browser tanpa server, database, atau keamanan
production. Built dengan React, TypeScript, dan React Router, menggunakan
mock users dan localStorage untuk menyimpan status login prototipe.

## 2. Authentication architecture

- `AuthProvider` (Context) membungkus aplikasi di `src/App.tsx`.
- Hook `useAuth()` menyediakan state autentikasi global.
- Service `src/services/auth.ts` mengisolasi logika mock (login, register,
  localStorage) sehingga nantinya dapat diganti dengan API pada Phase 12.
- Protected routes dibungkus `ProtectedRoute` yang mendukung pembatasan role.
- Status auth dipulihkan dari localStorage saat aplikasi pertama kali dibuka.

## 3. Login

- Route `/login` (`src/pages/LoginPage.tsx`).
- Form: email, password (with show/hide), remember me, button **Sign In**.
- Menampilkan info demo account (student & admin).
- Setelah login sukses redirect ke intended destination atau dashboard sesuai
  role: student → `/student`, admin → `/admin`.
- Daftar demo account ditampilkan langsung di halaman.

## 4. Register

- Route `/register` (`src/pages/RegisterPage.tsx`).
- Form: Full Name, Email, Password, Confirm Password, Terms checkbox.
- CTA **Create Account**.
- Setelah sukses, user student mock dibuat, toast `Account created
  successfully.`, lalu redirect ke `/student`.

## 5. Logout

- `logout()` menghapus state auth dan localStorage
  (`clearStoredAuth()`).
- `Navbar` menampilkan toast `You have been signed out.` lalu redirect ke `/`.

## 6. Mock users

- `src/data/users.ts` — hanya untuk development/demo, dengan komentar bahwa ini
  mock dan tidak aman untuk production.
  - Student: `student@example.com` / `student123`
  - Admin: `admin@example.com` / `admin123`
- Password plain-text hanya untuk simulasi frontend, tidak pernah disimpan ke
  localStorage.

## 7. Auth state

- `AuthUser | null`, `isAuthenticated`, `role`, `loading`, `error`,
  `clearError()`.
- Di-provide melalui `useAuth()` dari `src/context/AuthContext.tsx`.
- Types strict di `src/types/auth.ts` (`User`, `AuthUser`, `UserRole`,
  `AuthState`, `RegisterData`).

## 8. LocalStorage

- Key: `english_academy_auth`.
- Hanya menyimpan `{ id, name, email, role }` (TIDAK menyimpan password).
- Helper: `getStoredAuth()`, `setStoredAuth()`, `clearStoredAuth()` di
  `src/services/auth.ts`.

## 9. Protected routes

- `ProtectedRoute` (`src/components/auth/ProtectedRoute.tsx`).
- `/student` hanya untuk role `student`; `/admin` hanya untuk role `admin`.
- Belum login → redirect ke `/login` dengan `state.from` (intended destination)
  sehingga setelah login user dikembalikan ke halaman tujuan.
- Saat menunggu restore dari localStorage, tampilkan `Checking
  authentication...` (auth loading) sebelum redirect.

## 10. Role protection

- Admin mencoba `/student` dan student mencoba `/admin` → redirect ke
  `/access-denied`.
- `/access-denied` menampilkan CTA "Go to Dashboard" (ke dashboard sesuai
  role-nya) dan "Back to Home".

## 11. Access denied

- Route `/access-denied` (`src/pages/AccessDeniedPage.tsx`).
- Pesan: "Access Denied" dan "You don't have permission to access this page."

## 12. Forgot password

- Dibuat (`/forgot-password`, `src/pages/ForgotPasswordPage.tsx`) karena
  login page menampilkan link "Forgot password?" dan PRD menyebutkan
  form autentikasi yang lengkap (user-friendly UX).
- Form email + CTA **Send Reset Link**, mock only.
- Setelah submit menampilkan: "We've simulated sending a password reset link"
  (sesuai spesifikasi Phase 6 section 23).
- Tidak mengirim email sungguhan; tidak ada backend.

## 13. Navbar authentication state

- `src/components/ui/Navbar.tsx` diperbarui (tidak membuat Navbar baru).
- Belum login: **Sign In** + **Get Started**.
- Sudah login: avatar initial, nama user, **Dashboard**, **Sign Out**.
- Dashboard mengarah ke `/student` (role student) atau `/admin` (role admin).
- Mobile drawer juga auth-aware dan menutup setelah logout/login klik.

## 14. Enrollment authentication behavior

- `src/pages/CourseDetailPage.tsx` diperbarui.
- Klik **Enroll Now** saat belum login → toast info dan redirect ke `/login`
  dengan intended destination (kembali ke course setelah login).
- Saat sudah login → simulasi enrollment + toast `Course added to My Courses.`

## 15. Form validation

- Login: email wajib + format valid; password wajib.
- Register: full name wajib (min 2 karakter), email valid, password min 8
  karakter, confirm password harus sama, terms harus dicentang.
- Error ditampilkan per field dengan pesan ramah dan accessible.

## 16. Error states

- Login invalid: "Invalid email or password." (bukan menampilkan detail teknis).
- Register email sudah dipakai: "An account with this email already exists."
- Protected route tanpa login: redirect ke login.
- Role mismatch: redirect ke access denied.
- Tidak ada stack trace yang ditampilkan ke user.

## 17. Loading states

- Login: button disabled, label "Signing in...".
- Register: button disabled, label "Creating account...".
- Forgot password: "Sending reset link...".
- Auth restoration: "Checking authentication..." + Spinner.
- Button disabled saat loading untuk mencegah double submit (via prop
  `loading` dari `Button`).

## 18. Accessibility

- Semantic HTML (`form`, `label`, `button`, `input`).
- Setiap input memiliki `<label>`.
- `input type` yang tepat (email, password, text, checkbox).
- `autocomplete` attributes (email, current-password, new-password, name).
- Password toggle memiliki `aria-label` + `aria-pressed` dan dapat diakses
  keyboard (button default).
- Field invalid menggunakan `aria-invalid` dan error dirujuk dengan
  `aria-describedby` (disediakan oleh komponen `Input` existing).
- Checkbox accessible (label + error dari `Checkbox` existing).
- Bagian loading menggunakan `role="status"` + `sr-only` text.
- Navbar mobile memiliki `aria-label` dan `aria-expanded`.

## 19. Responsive testing

- Form auth dibatasi `max-w-md` di dalam container dan tidak keluar layar pada
  375px / 768px / 1440px.
- Button full-width pada layar kecil untuk kenyamanan sentuh.
- Navbar responsive: menu mobile drawer pada `< md`, nav baris penuh pada
  `>= md`.
- Tidak ada horizontal overflow pada halaman auth (dibatasi oleh
  `container-page` + `max-w-md`).

Catatan kejujuran: konfirmasi responsivitas sepenuhnya di browser (klik & ukur
lebar aktual) belum dieksekusi secara otomatis dalam sesi ini; verifikasi
dilakukan melalui code-review dan struktur Tailwind. Rute diverifikasi
mengembalikan 200 melalui server dev, dan build production berhasil.

## 20. Routes tested

Rute berikut diverifikasi mengembalikan HTTP 200 saat server dev aktif:

- `/`
- `/login`
- `/register`
- `/forgot-password`
- `/student`
- `/admin`
- `/access-denied`
- `/courses`
- `/courses/general-english`
- `/tutors`
- `/tutors/t1`
- `/pricing`
- `/faq`
- `/about`
- `/contact`
- `/blog`
- `/blog/some-post`
- `/showcase`

## 21. TypeScript/lint result

- `npm run lint` (tsc --noEmit): **berhasil, tanpa error**.

## 22. Production build result

- `npm run build` (tsc && vite build): **berhasil** (1878 modules
  transformed, build in ~4s).

## 23. Error yang ditemukan dan diperbaiki

- Awalnya redirect halaman sudah-login di `LoginPage` dilakukan dengan
  memanggil `navigate()` selama render. Diperbaiki menjadi komponen
  `<Navigate>` untuk menghindari side-effect saat render.

## 24. File dibuat

- `src/types/auth.ts`
- `src/data/users.ts`
- `src/services/auth.ts`
- `src/context/AuthContext.tsx`
- `src/components/auth/AuthLayout.tsx`
- `src/components/auth/PasswordInput.tsx`
- `src/components/auth/ProtectedRoute.tsx`
- `src/components/auth/index.ts`
- `src/pages/LoginPage.tsx`
- `src/pages/RegisterPage.tsx`
- `src/pages/ForgotPasswordPage.tsx`
- `src/pages/StudentDashboard.tsx` (placeholder Phase 7)
- `src/pages/AdminDashboard.tsx` (placeholder Phase 11)
- `src/pages/AccessDeniedPage.tsx`
- `PHASE6_REPORT.md`

## 25. File diubah

- `src/App.tsx` (bungkus `AuthProvider`)
- `src/routes/index.tsx` (tambah route auth + protected)
- `src/components/ui/Navbar.tsx` (auth-aware)
- `src/pages/CourseDetailPage.tsx` (auth-aware enrollment)
- `src/components/index.ts` (export komponen auth)

## 26. Cara menjalankan

```
npm run dev
```

## 27. Security limitation

- Ini **MOCK AUTHENTICATION** frontend.
- Credentials adalah mock (`student@example.com`/`student123`,
  `admin@example.com`/`admin123`).
- localStorage hanya untuk prototipe; password TIDAK disimpan.
- Tidak ada password hashing, JWT, session, atau mekanisme keamanan real.
- Authentication production akan dipindahkan ke backend pada **Phase 12**.

## 28. Konfirmasi backend belum dibuat

TIDAK ada backend yang dibuat pada Phase 6:

- Tidak ada Express, REST API, PostgreSQL, JWT server-side, password hashing,
  database user, session database, email verification, atau real password
  reset.
- Backend & database dijadwalkan pada **Phase 12**.

STOP — Phase 7 (Student Dashboard) dan seterusnya belum dikerjakan.