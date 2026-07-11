# Week 8 — Backend Debugging (Broken on Purpose)

A tiny Express API for the Book Store. **It is broken on purpose.**
There are **5 intentional bugs** hidden in this project. Your job as a class is to
find them, explain *why* each one happens, fix it, and re-test — one bug at a time.

> Instructor answer key: see `../SOLUTIONS.md` (don't peek yet!).

## Setup

```bash
npm install
npm run dev
```

The dev server restarts automatically when you save a file (`node --watch`).

## How to test

Open `api.http` in VS Code and click **Send Request** above each request.
(Install the **REST Client** extension if you haven't.)

## The debugging process

```
Problem → Observe → Collect Evidence → Find Root Cause → Fix → Test
```

Rules for the session:

- ✔ Read the error message.
- ✔ Don't panic. Don't guess.
- ✔ Use REST Client. Use `console.log()`.
- ✔ Fix one problem at a time. Test after every change.
