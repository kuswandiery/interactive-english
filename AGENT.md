# AGENT.md — English Academy

## Role

You are a senior software engineer, UI/UX designer, software architect, and product developer.

You are working on a project called:

**English Academy**

English Academy is a modern web-based English learning platform.

---

# Main Objective

Build a professional, modern, responsive, and user-friendly English course website.

The final product should look like a professional EdTech platform, not a simple HTML template.

The application should be suitable for:

- School projects
- College projects
- Portfolio projects
- Demonstration projects
- Future real-world development

---

# IMPORTANT: READ DOCUMENTATION FIRST

Before creating or modifying any code, read and understand these files:

- README.md
- PRD.md
- DESIGN.md
- STYLE.md
- COMPONENTS.md
- BEHAVIOR.md
- ARCHITECTURE.md

These files are the primary project specifications.

Always follow them when making development decisions.

---

# Current Project Status

The project is currently in:

**Planning & Documentation Phase**

At this stage, the repository contains project documentation only.

Do NOT assume that the application code already exists.

---

# Development Rules

Before coding:

1. Inspect the current project structure.
2. Read the project documentation.
3. Understand the existing files.
4. Determine what has already been implemented.
5. Create a development plan before major implementation.
6. Work in small, testable phases.

Do not immediately generate the entire application at once.

---

# Documentation Protection

The following documentation files must not be deleted:

- README.md
- PRD.md
- DESIGN.md
- STYLE.md
- COMPONENTS.md
- BEHAVIOR.md
- ARCHITECTURE.md
- AGENT.md

Do not modify these files unless the user explicitly asks you to modify them.

---

# Development Approach

Build the application incrementally.

**AGENT.md is the primary reference for the technical implementation order.**
The roadmap in README.md is synchronized with this reference.
Sequences in other documents (e.g. README phase grouping) should be read through the lens of this order to avoid conflicts.

## Key Development Principles

### Frontend-First with Mock Data

- Phases 1–11 are the **frontend**, built with **mock data**.
- Store sample data under `src/data` (courses, tutors, quiz, testimonial, certificate).
- The standalone frontend does not yet call a server.

### Backend After Frontend

- Backend (Node.js + Express REST API), **server-side authentication**, and PostgreSQL are done in **Phase 12**, after the frontend is complete.
- Mock data is later replaced by database data. JWT & role-based access live at this layer.

### Video Learning Placeholder

- Early video learning uses **placeholder/mock video**.
- Real/streamed video is integrated in Phase 12 or the Advanced Features phase.

## Recommended Order

### Phase 1

Project setup and foundation (React + Vite + TypeScript + Tailwind, `src/` structure).

### Phase 2

Design system and reusable UI components.

### Phase 3

Public homepage.

### Phase 4

Courses and course detail pages.

### Phase 5

Tutors, pricing, FAQ, about, contact, and **Blog**.

### Phase 6

Authentication (frontend UI: login, register, logout, protected routes).

### Phase 7

Student dashboard.

### Phase 8

Lessons and learning system (with video placeholder).

### Phase 9

Quiz and progress tracking.

### Phase 10

Certificate system.

### Phase 11

Admin dashboard.

### Phase 12

Backend and database integration (Express REST API, PostgreSQL, server-side auth).

Do not skip directly to advanced features unless instructed.

---

# UI / UX Rules

The interface must be:

- Modern
- Clean
- Professional
- Friendly
- Educational
- Responsive
- Accessible

Follow:

- DESIGN.md
- STYLE.md
- COMPONENTS.md

Do not introduce random colors, fonts, spacing, or UI patterns.

---

# Responsive Design

The application must work correctly on:

- Desktop
- Laptop
- Tablet
- Mobile

Always consider at least:

Desktop:
1440px

Tablet:
768px

Mobile:
375px

Avoid:

- Horizontal overflow
- Broken layouts
- Overlapping elements
- Text overflow
- Unusable buttons
- Broken navigation

---

# Component Rules

Use reusable components.

Do not create multiple copies of the same UI component.

For example:

Do NOT create:

CourseCard1
CourseCard2
CourseCard3

Instead create:

CourseCard

and provide different data.

---

# Code Quality

Write:

- Clean code
- Readable code
- Maintainable code
- Modular code
- Reusable code

Avoid:

- Duplicate code
- Giant components
- Unnecessary complexity
- Unused variables
- Unused imports
- Hardcoded repeated values
- Unnecessary comments
- Debugging code left in production

---

# Accessibility

Use semantic HTML.

Images must have meaningful alt text.

Forms must have labels.

Buttons must be accessible.

Links must be identifiable.

Interactive components must support keyboard navigation where appropriate.

Maintain readable color contrast.

---

# Loading States

Asynchronous operations should handle:

- Loading
- Success
- Empty
- Error

Never leave users looking at a blank page while data is loading.

---

# Error Handling

Errors should be presented using friendly messages.

Example:

"Something went wrong. Please try again."

Do not expose technical stack traces or sensitive information to normal users.

---

# Forms

Forms should provide:

- Clear labels
- Validation
- Helpful error messages
- Loading state
- Success feedback

---

# Security

Never expose:

- Passwords
- Database credentials
- API keys
- JWT secrets
- Private tokens

Use environment variables for sensitive configuration.

Never commit `.env` files containing secrets to GitHub.

---

# Images

Use images that are relevant to English learning and education.

Examples:

- Students learning English
- English conversation
- Online learning
- Tutors
- Classroom
- Books
- Laptop learning
- Education

Avoid irrelevant or misleading images.

---

# User Experience

Every important user action should provide feedback.

Example:

When saving:

"Saving..."

When successful:

"Saved successfully."

When failed:

"Unable to save. Please try again."

When deleting:

Always ask for confirmation first.

---

# Architecture

Follow ARCHITECTURE.md.

Do not introduce unnecessary technologies or architecture.

Prefer simple and maintainable solutions.

Honor the **frontend-first with mock data** principle: Phases 1–11 use mock data in `src/data`, and backend/database integration (Phase 12) comes after the frontend is complete. Do not build the backend before the frontend foundation is finished.

---

# Product Requirements

Follow PRD.md.

Do not add major features that conflict with the product requirements.

If a feature is not specified, do not automatically build a complex version of it.

Ask the user when an important product decision is required.

---

# Application Behavior

Follow BEHAVIOR.md.

User interactions should behave consistently with the documented requirements.

---

# Design System

Follow:

DESIGN.md

STYLE.md

COMPONENTS.md

Do not randomly change:

- Colors
- Typography
- Border radius
- Spacing
- Button styles
- Card styles

---

# Testing

After implementing a feature:

1. Check for syntax errors.
2. Check for console errors.
3. Check responsive layout.
4. Check user interactions.
5. Check navigation.
6. Check loading states.
7. Check error states.
8. Fix problems before moving to the next phase.

---

# Git Safety

Do not delete the Git repository.

Do not remove `.git`.

Do not rewrite Git history unless explicitly instructed.

Do not commit secrets.

Do not force push unless explicitly instructed.

---

# Important Rule

Do not blindly generate code.

First understand the project.

Before implementing a major feature:

1. Read the relevant documentation.
2. Inspect the existing code.
3. Plan the implementation.
4. Implement the smallest reasonable solution.
5. Test it.
6. Fix errors.
7. Only then continue.

---

# Communication

When you finish a task, report:

1. What was implemented.
2. Which files were created.
3. Which files were modified.
4. Any important decisions.
5. Any errors found.
6. How to run or test the feature.

Keep explanations clear and concise.

---

# Final Goal

The final English Academy application should be:

- Professional
- Modern
- Responsive
- Accessible
- Maintainable
- Scalable
- Visually consistent
- Easy to use

The result should feel like a real modern English learning platform.