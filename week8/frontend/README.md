# Week 8 — Frontend Debugging (Broken on Purpose)

A React + Tailwind CSS "Book Store" page. **It is broken on purpose.**
There are **5 intentional bugs** hidden in this project. As a class, find each one,
explain *why* it happens, fix it, and re-test — one bug at a time.

> Instructor answer key: see `../SOLUTIONS.md` (don't peek yet!).

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Your tools

Open Chrome DevTools with **F12** and use:

- **Console** — read errors and React warnings, run `console.log(...)`.
- **Elements** — inspect the rendered HTML.
- **Network** — inspect requests, status codes, and responses.
- **Sources** — set breakpoints and step through code.

## Rules for the session

- ✔ Read browser errors. ✔ Read React warnings.
- ✔ Use `console.log()`. ✔ Inspect the data before changing code.
- ✔ Fix one problem at a time. ✔ Test after every change.
