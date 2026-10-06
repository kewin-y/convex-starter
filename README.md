# Convex Starter

Next.js + Convex template with authentication, a landing page, and a dashboard with sample data.

## Tech stack

- Next.js 16, React 19, TypeScript
- Convex + Convex Auth (email/password)
- Tailwind CSS 4, shadcn/ui (Base UI), Hugeicons
- TanStack Form + Zod
- `@wrksz/themes` (light/dark/system themes)

## Usage

Requires Node.js and pnpm.

```bash
npm create convex@latest my-app -- -t kewin-y/convex-starter
cd my-app
pnpm install
pnpm dev
```
Alternatively, clone the repository and run `pnpm install` and `pnpm dev`.

Follow the setup prompts to create a new Convex project and configure authentication. Open [localhost:3000](http://localhost:3000).

Other commands:

- `pnpm lint` checks code
- `pnpm build` builds the Next.js app
