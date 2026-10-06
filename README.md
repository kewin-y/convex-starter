# Welcome to your Convex + Next.js + Convex Auth app

This is a [Convex](https://convex.dev/) project created with [`npm create convex`](https://www.npmjs.com/package/create-convex).

After the initial setup (<2 minutes) you'll have a working full-stack app using:

- Convex as your backend (database, server logic)
- [React](https://react.dev/) as your frontend (web page interactivity)
- [Next.js](https://nextjs.org/) for optimized web hosting and page routing
- [Tailwind](https://tailwindcss.com/) for building great looking accessible UI
- [Convex Auth](https://labs.convex.dev/auth) for authentication

## Get started

If you just cloned this codebase and didn't use `npm create convex`, run:

```
npm install
npm run dev
```

If you're reading this README on GitHub and want to use this template, run:

```
npm create convex@latest -- -t nextjs-convexauth
```

## App UI

- `features/app-shell` owns the application frame, sidebar navigation, and
  responsive shell controls. The dashboard route layout composes `AppShell`;
  `features/dashboard` owns the workspace content rendered inside it.
- `app/globals.css` contains shadcn-managed imports, theme tokens, and base styles.
  Application focus and reduced-motion rules live in `app/application.css`;
  the shell's document background rules live in `features/app-shell/styles.css`.
  The root layout imports both application stylesheets after `globals.css`.
- Theme management uses [`@wrksz/themes`](https://themes.wrksz.dev): the Next.js
  provider in the root layout sets the light/dark class before hydration, and
  `ThemeToggle` uses its client hook. Preferences persist under the existing
  `acme-theme` local-storage key and sync across tabs. With no saved preference,
  the theme follows system color-scheme changes.
- `lib/branding.ts` defines the shared application name for metadata, auth copy,
  and the footer. `components/brand.tsx` owns the logo and wordmark, reused in
  the sidebar, landing header, workspace preview, auth headers, and footer.
  `Brand` renders a static `div` by default. It uses Base UI's `useRender`:
  pass `render={<Link href="/" />}` for a home link or
  `render={<button type="button" />}` for an action. The render API merges
  styles, event handlers, and refs with the supplied element.
- `/` is the public landing page, with a responsive split hero, an anchored
  workspace preview, feature cards, and a closing account action. The preview's
  metrics use a two-column layout so labels remain readable on mobile.
  Signed-in users see **Open dashboard**; signed-out users see signup and login
  actions. The page uses the existing shadcn Base UI components and theme tokens
  in both light and dark modes.
- `/login` and `/signup` provide email/password authentication.
- `/dashboard` contains the sample workspace. Projects use cards when their
  container is narrow and a table when there is enough room for every column.
  Both layouts include status, updated date, and the copy-name action.
- Chart axis labels retain their text size independently of the responsive plot.
- Sidebar selection follows the dashboard section hash, including direct links
  and browser back/forward navigation.
- The sidebar follows shadcn's inset hierarchy: branding in `SidebarHeader`,
  primary and bottom-aligned secondary navigation in `SidebarContent` groups,
  and the account menu in `SidebarFooter`. These share aligned control edges.
  Padding comes from the stock sidebar primitives, not caller overrides.
  Navigation and Settings use the default menu size; branding and account rows
  use `size="lg"`. Collapsed controls are 32×32px, with the logo and account
  avatar retaining their 32×32px size.
  `SidebarSeparator` keeps symmetric insets using `data-horizontal:w-auto`,
  matching the specificity of the Base UI separator's horizontal width rule.
- Collapsed navigation has label tooltips. The header trigger and Ctrl/Cmd+B
  toggle the desktop rail; on mobile, the trigger opens a drawer that closes
  after selecting a section. The header account button keeps its own layout.
- On app-shell pages, `html`, `body`, and the shell wrapper use `--sidebar`,
  matching the sidebar in both themes so overscroll reveals the same color.
- The inset content panel clips its children to its rounded corners. The header
  scrolls with the page rather than sticking to the viewport.

Workspace metrics, activity, and projects are illustrative sample data. The
legacy `/server` Convex demo is no longer an application route.

## Learn more

To learn more about developing your project with Convex, check out:

- The [Tour of Convex](https://docs.convex.dev/get-started) for a thorough introduction to Convex principles.
- The rest of [Convex docs](https://docs.convex.dev/) to learn about all Convex features.
- [Stack](https://stack.convex.dev/) for in-depth articles on advanced topics.
- [Convex Auth docs](https://labs.convex.dev/auth) for documentation on the Convex Auth library.

## Configuring other authentication methods

To configure different authentication methods, see [Configuration](https://labs.convex.dev/auth/config) in the Convex Auth docs.

## Join the community

Join thousands of developers building full-stack apps with Convex:

- Join the [Convex Discord community](https://convex.dev/community) to get help in real-time.
- Follow [Convex on GitHub](https://github.com/get-convex/), star and contribute to the open-source implementation of Convex.
