# Next.js Auth + Dashboard (TS + SCSS Modules)

## Quick Start

```bash
pnpm i   # or: npm i / yarn
pnpm dev # http://localhost:3000
```

### What it does
- `/auth`: Validates Iranian phone (must match `^09\d{9}$`), fetches a mock user, stores it in `localStorage`, then redirects to `/dashboard`.
- `/dashboard`: If no user found, redirects to `/auth`. Otherwise, greets the user. Includes a logout button.

### Notes
- Reusable `Input` and `Button` with `forwardRef` and SCSS Modules.
- Validation decoupled via Zod (`lib/validation/auth.ts`).
- Typed auth context and RandomUser API types.
- Clean nesting in SCSS Modules.