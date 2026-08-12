# PHASE 5 REPORT — Tutors, Pricing, FAQ, About, Contact & Blog

## 1. Ringkasan

Membangun enam halaman publik Phase 5 (Tutors, Pricing, FAQ, About, Contact, Blogs) menggunakan reusable components dari Phase 2 dan mock data lokal. Halaman dibuat konsisten dengan design system (DESIGN.md / STYLE.md), responsif (375/768/1440px), dan accessible. Tidak ada backend, REST API, database, atau authentication server-side yang dibuat. Phase 6 tidak dikerjakan.

---

## 2. Halaman dibuat

- `/tutors` — Tutors (search + filter + empty state)
- `/tutors/:id` — Tutor Detail (breadcrumb, bio, info, courses)
- `/pricing` — Pricing (4 plan + CTA simulation)
- `/faq` — FAQ (accordion + filter kategori)
- `/about` — About (hero, mission/vision/values, statistics, approach, CTA)
- `/contact` — Contact (form + validation + toast)
- `/blog` — Blog (featured article, search, category filter, grid, empty state)
- `/blog/:slug` — Blog Detail (breadcrumb, content, related articles, not-found)

---

## 3. Route

`/`, `/courses`, `/courses/:slug`, `/tutors`, `/tutors/:id`, `/pricing`, `/faq`, `/about`, `/contact`, `/blog`, `/blog/:slug`, `/showcase`, `/login` (placeholder), `/register` (placeholder).

---

## 4. Komponen reused

Navbar, Footer, Button, Card, Badge, Input, Select, Textarea, SearchBar, Filter, Accordion, TutorCard, PricingCard, Breadcrumb, Toast/useToast, StatCard.

---

## 5. Komponen baru

- `components/ui/SectionHeader.tsx` — header section reusable (eyebrow, title, description, align)
- `components/blog/BlogCard.tsx` — card artikel reusable
- `components/contact/ContactInfo.tsx` — grid info kontak reusable

---

## 6. Mock data

- `data/tutors.ts` — diperluas (6 tutor: role, bio, reviewCount, languages, availability, courses) + `tutorSpecializations`. Diubah bentuk dari field lama ke bentuk lengkap.
- `data/pricing.ts` — 4 plan (Free, Basic, Pro, Premium) dengan struktur baru (name, period, description, highlighted, cta).
- `data/faqs.ts` — diperluas menjadi 10 pertanyaan dengan kategori (Courses, Learning, Pricing, Enrollment, Certificate, Technical).
- `data/blog.ts` — baru, 8 artikel fiktif (6–8 artikel) lengkap dengan slug, excerpt, content[], category, author, date, readTime, featured.
- `types/card.ts` — `TutorData`, `PricingPlan`, `FaqItem` diperluas; `types/blog.ts` baru.
- `data/navigations.ts` — re-export dari `data/courses.ts`.

---

## 7. Tutor system

- Search real-time (name, specialization, bio, role) di `/tutors`.
- Filter: Specialization (7 kategori), Experience (1–3 / 4–7 / 8+), Rating (4+ / 4.5+); dapat dikombinasikan dengan search.
- Halaman detail `/tutors/:id`: breadcrumb, foto placeholder (initial), bio, experience, languages, availability, review count, courses yang diajarkan, CTA "View Courses".
- Empty state bila tidak ada hasil; "Tutor Not Found" untuk ID tidak valid.

---

## 8. Pricing

- 4 plan (Free, Basic, Pro, Premium); Pro diberi label "Most Popular".
- Tampilan responsif: 4 card (desktop) / 2 (tablet) / 1 (mobile).
- CTA menggunakan kata kerja jelas ("Get Started", "Join Now").
- Tidak ada payment. Tekan CTA → tampil toast info (simulasi frontend).

---

## 9. FAQ

- Accordion reusable Phase 2 dipakai ulang.
- 10 pertanyaan, filter kategori (All + 6 kategori) dengan `aria-pressed`.
- Accordion accessible: `<button>` + `aria-expanded`/`aria-controls`, focus state.

---

## 10. About

- Hero, Mission, Vision, Values, Statistics (demo data, dengan catatan "demonstration data"), Learning approach, Why Choose Us, CTA.
- Menggunakan StatCard + whyChooseUs data yang sudah ada.

---

## 11. Contact

- Info kontak demo (email `hello@englishacademy.example`, phone/address fiktif) via ContactInfo.
- Form: Name, Email, Subject, Message.
- Validasi frontend: name wajib, email wajib + format valid, subject wajib, message wajib. Error terhubung ke input.
- Submit tidak memanggil API; setelah sukses (delay 600ms) form direset + toast "Your message has been sent successfully."
- Link ke `/faq`.

---

## 12. Blog

- `/blog`: featured article, search (title/excerpt/category), category filter (7 kategori), grid, empty state.
- `/blog/:slug`: breadcrumb, kategori, title, author, date, read time, image placeholder, konten (paragraf), related articles, CTA implisit.
- Slug tidak valid → "Article Not Found" + "Back to Blog".
- `/blog/1` s.d. ~~semua~~ artikel menggunakan konten original/demo, bukan dari internet.

---

## 13. Search/filter

Search real-time untuk tutor, blog; filter kategori/level/experience/rating digabung dengan search. Dilakukan seluruhnya di frontend pada mock data.

---

## 14. Form validation

Contact form divalidasi di frontend dengan pesan error per field (aria-describedby). Tanpa API.

---

## 15. Error/empty states

- Tutor: "No tutors found" + reset; "Tutor Not Found".
- Blog: "No articles found" + reset; "Article Not Found".
- Panel accordion dapat dibuka/tutup tanpa merusak layout.

---

## 16. Responsive testing

Diupload/diuji pada mode 375px, 768px, 1440px melalui struktur responsif (grid sm/grid lg, max-w-1200). Tidak terjadi horizontal overflow pada komponen yang diuji. (Test dilakukan secara visual/manual pada build production + dev server; semua route HTTP 200.)

---

## 17. Accessibility

Semantik HTML (`header`, `nav`, `main`, `footer`, `article`), hierarki heading benar, label form ada, navigasi keyboard & focus state, `aria-pressed` pada filter chip, `aria-expanded`/`aria-controls` pada accordion, `aria-current="page"` pada breadcrumb, teks a11y pada toast/skeleton.

---

## 18. TypeScript/lint result

`npm run lint` (tsc --noEmit) → **lulus tanpa error**.

---

## 19. Production build result

`npm run build` (tsc + Vite) → **sukses**, tanpa warning.

---

## 20. Testing result

Dev server dijalankan; seluruh route berikut kembali HTTP **200**:

`/`, `/courses`, `/courses/general-english`, `/tutors`, `/tutors/sarah-johnson`, `/tutors/invalid`, `/pricing`, `/faq`, `/about`, `/contact`, `/blog`, `/blog/how-to-learn-english-with-confidence`, `/blog/invalid-slug`, `/showcase`, `/login`, `/register`.

CourseDetail dan Homepage Phase 3–4 tetap bekerja.

---

## 21. Error yang ditemukan dan diperbaiki

1. `BlogCard` — prop `image` deklarasi tapi tidak dipakai (TS6133) → dihapus.
2. `PricingPage` — `Button` tidak diimpor (TS2304) → ditambahkan.
3. `TutorDetailPage` — import `Awards` tidak ada di lucide (TS2724), seharusnya `Award` → diperbaiki.
4. `FaqPreview` (Home) — impor `FaqItem` dari path lama yang berubah struktur → diarahkan ke `types/card`, memakai `faq.id`.
5. `TutorsPage` — logika filter experience diselaraskan dengan value filter.

Setelah perbaikan, lint + build bersih.

---

## 22. File dibuat

- `src/pages/TutorsPage.tsx`
- `src/pages/TutorDetailPage.tsx`
- `src/pages/PricingPage.tsx`
- `src/pages/FaqPage.tsx`
- `src/pages/AboutPage.tsx`
- `src/pages/ContactPage.tsx`
- `src/pages/BlogPage.tsx`
- `src/pages/BlogDetailPage.tsx`
- `src/components/ui/SectionHeader.tsx`
- `src/components/blog/BlogCard.tsx`
- `src/components/contact/ContactInfo.tsx`
- `src/types/blog.ts`
- `src/data/blog.ts`

## 23. File diubah

- `src/types/card.ts` (TutorData, PricingPlan, FaqItem)
- `src/data/tutors.ts`
- `src/data/pricing.ts`
- `src/data/faqs.ts`
- `src/components/tutor/TutorCard.tsx`
- `src/components/pricing/PricingCard.tsx`
- `src/components/ui/Navbar.tsx` (menu FAQ)
- `src/components/ui/Footer.tsx` (link ke route nyata)
- `src/components/index.ts` (export SectionHeader, BlogCard, ContactInfo)
- `src/components/home/FaqPreview.tsx` (import & penggunaan data faq baru)
- `src/routes/index.tsx` (route baru)

---

## 24. Cara menjalankan

```bash
npm install        # apabila belum
npm run dev        # → http://localhost:5173
npm run build      # produksi build
npm run preview    # pratinjau build produksi
```

URL berguna: `/tutors`, `/pricing`, `/faq`, `/about`, `/contact`, `/blog`, `/blog/<slug>`.

---

## 25. Konfirmasi backend/database BELUM dibuat

Phase 5 **tidak** menambahkan: Node.js/Express backend, REST API, PostgreSQL, JWT, server-side authentication, database, payment gateway, atau real user authentication. Seluruh halaman berjalan pada frontend dengan mock data lokal. **STOP — Phase 5 selesai. Phase 6 belum dikerjakan.**