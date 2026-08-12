# BEHAVIOR — English Academy

## General Behavior

Website harus terasa:

- Cepat
- Responsif
- Mudah digunakan
- Konsisten

Setiap interaksi user harus memberikan feedback.

---

# Navigation

Menu utama:

- Home
- Courses
- Tutors
- Pricing
- About

Menu aktif harus memiliki visual state.

---

# Course

Ketika user memilih:

"View Course"

Buka halaman Course Detail.

Course Detail menampilkan:

- Title
- Description
- Instructor
- Curriculum
- Lessons
- Duration
- Level
- Rating
- Price
- Enroll button

---

# Enrollment

Ketika user memilih:

"Enroll Now"

Jika belum login:

Arahkan ke Login/Register.

Jika sudah login:

Tampilkan enrollment confirmation.

Course kemudian muncul pada:

"My Courses"

---

# Learning

Ketika user memilih:

"Continue Learning"

Buka lesson terakhir yang belum selesai.

---

# Lesson

Lesson dapat memiliki:

- Video
- Text
- Audio
- Vocabulary
- Notes
- Previous lesson
- Next lesson

Ketika lesson selesai:

Progress diperbarui.

---

# Progress

Progress berdasarkan jumlah lesson yang selesai.

Contoh:

10 lesson.

5 selesai.

Progress:

50%.

---

# Quiz

User dapat memulai quiz.

Setiap soal memiliki:

- Question
- Answer options

Setelah selesai:

Tampilkan:

- Score
- Correct answers
- Wrong answers
- Status
- Explanation

---

# Quiz Passing

Passing score:

70%.

Jika score >= 70:

Passed.

Jika score < 70:

Not Passed.

User dapat melakukan retry.

---

# Certificate

Certificate tersedia setelah user memenuhi persyaratan course.

Certificate dapat dibuka melalui:

Certificates.

---

# Search

Search dapat berdasarkan:

- Course name
- Category
- Level
- Tutor

---

# Filter

Filter course berdasarkan:

- Beginner
- Elementary
- Intermediate
- Upper Intermediate
- Advanced

---

# Login

Login membutuhkan:

- Email
- Password

Jika berhasil:

Dashboard.

Jika gagal:

Tampilkan pesan error yang mudah dipahami.

---

# Register

Register membutuhkan:

- Full name
- Email
- Password
- Confirm password

Validasi:

- Email valid
- Password minimal 8 karakter
- Password harus sama dengan confirmation

---

# Logout

Logout harus menghapus session/token.

Setelah logout:

Redirect ke homepage atau login.

---

# Responsive

Mobile:

- Hamburger navigation
- Drawer sidebar
- Single column cards
- Horizontal scrolling table jika diperlukan

Tablet:

- Responsive grid

Desktop:

- Maximum content width 1200px

---

# Loading

Saat data sedang diproses:

Tampilkan:

- Skeleton
- Spinner
- Loading indicator

Jangan menampilkan halaman kosong.

---

# Empty State

Jika data kosong:

Tampilkan pesan yang informatif.

Contoh:

"No courses available."

---

# Error Handling

Jika terjadi error:

Tampilkan:

"Something went wrong. Please try again."

Jangan menampilkan stack trace kepada user.

---

# Delete

Sebelum menghapus data:

Tampilkan confirmation dialog.

Contoh:

"Are you sure you want to delete this course?"

Actions:

Cancel

Delete

---

# Notifications

Gunakan toast.

Success:

"Course enrolled successfully."

Error:

"Unable to complete this action."

---

# Accessibility

Pastikan:

- Keyboard navigation
- Focus state
- Semantic HTML
- Accessible labels
- Modal dapat ditutup dengan Escape