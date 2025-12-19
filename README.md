# Khadoom Dashboard (Assignment)

A modern, RTL-first dashboard page built with Next.js, Tailwind v4, shadcn/ui, Zustand, TanStack Table, Framer Motion, and Recharts.

## Tech Stack

- **Next.js (App Router)** + TypeScript
- **Tailwind CSS v4** + **shadcn/ui**
- **Zustand** (view-state)
- **Framer Motion** (micro-interactions & transitions)
- **Recharts** (data visualization)
- **TanStack Table** (data grid foundation)

## Project Structure

- `src/app/dashboard/*`  
  Route + layout for the dashboard shell (sidebar/header/page container).
- `src/features/dashboard/*`  
  Feature-first organization (store, components, data, types).
- `src/components/ui/*`  
  shadcn/ui primitives (Card, Tabs, Skeleton, etc.).
- `src/components/common/*`  
  Reusable UI patterns (StatCard, badges, etc.).
- `src/lib/*`  
  Small utilities (formatters, cn, etc.).

## Theming & Branding

- Brand colors are implemented as **CSS variables** in `globals.css`.
- Tailwind v4 theme tokens are mapped via `@theme inline` (e.g. `--color-primary: hsl(var(--primary))`),
  enabling consistent use of `bg-primary`, `text-muted-foreground`, etc. across the UI.
- Typography supports Arabic-first UI with separate utility classes for English headings/body.

## State Management (Zustand)

Zustand is used for **UI/view-state**:

- selected wallet (KPI → details panel)
- chart tab + filters (week/last, branch/all)
- initial loading state (skeletons)

This keeps components focused on rendering and makes future expansion (more pages, API integration) straightforward.

## Motion Principles

Framer Motion is used to enhance clarity:

- staggered entrance for KPI scanability
- subtle hover lift for clickable affordance
- smooth tab/content transitions without excessive animation

## Charts

Recharts is used with theme-aware colors (chart tokens) and styled tooltips to match the UI system.

## Running Locally

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
