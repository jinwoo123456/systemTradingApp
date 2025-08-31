# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Backend (Axum + SeaORM + Postgres)

- Rust backend server runs inside Tauri on http://127.0.0.1:1421
- Env: set `DATABASE_URL=postgres://USER:PASS@HOST:PORT/DBNAME` (defaults to `postgres://postgres:postgres@localhost:5432/app`)
- On first run, it auto-creates table `users`.

## System Tray

- Enabled with `tauri` feature `tray-icon`. Tray menu: Show / Quit.

## Frontend

- React TS calls backend REST: GET/POST `/api/users`.

## Dev

- Start dev: `npm run dev` and `npm run tauri dev` (or use single `tauri dev` that runs Vite via config)
