# Soludesk

Learning platform with three personas — **Learner**, **Trainer** and **Sponsor** — plus a
**Business** landing page (the only place the "LearnHub" brand appears). Built frame-by-frame
from the Figma file `2OQKkq8bwn4JxmYwYORDgQ`.

## Run it

```bash
npm install
npm run dev        # API on :4000 + web on :5173 (proxied under /api)
npm run build      # server + client production build
npm run typecheck  # both workspaces
```

Sign in with any email; the OTP is `1234` (`MOCK_OTP` in `client/src/lib/auth.tsx`).

## Layout

```
client/            React 19 · Vite 6 · Tailwind v4 · react-router · @tanstack/react-query
  src/pages/       one file per route; pages/trainer/* and pages/sponsor/* are the portals
  src/components/  ui/ (Button, Drawer, Pagination…) · auth/ · portal/ (shared trainer+sponsor shell)
  src/lib/         auth.tsx (roles + onboarding) · *Data.ts (mock data) · toast.tsx
  src/styles/      tokens.css (Figma variables) · app.css (@theme, utilities)
server/            Express API for catalog/business content (client/src/lib/api.ts)
design-tokens/     Figma token export → `npm run tokens` regenerates tokens.css
```

Routes are code-split with `React.lazy` in `client/src/App.tsx`; only the two landing pages
ship in the main bundle. Vendor chunks (react / query / icons) are pinned in `vite.config.ts`.

## Auth & roles

Everything is client-side and persisted in `localStorage` under `soludesk.auth.v1`
(`client/src/lib/auth.tsx`). One email can hold all three roles:

- `unlockedRoles` — roles the user has completed onboarding for; `activeRole` — last one used.
- `becomeRole('trainer' | 'sponsor')` starts the confirm → onboarding drawer flow
  (`components/portal/BecomeRoleConfirm`, `RoleProfileDrawer`). Finishing it also unlocks
  `learner`, since it collects the same base profile.
- Plain "Log In" lands on `dashboardPathForRole[activeRole]`; users switch roles from the
  bottom of each persona's hamburger menu.
- `logout()` clears only the session, so a returning user is restored to their last role.

## Design system rules

- **Spacing** (`app.css`): `--page-gutter` is the single horizontal gutter. Use `.shell`
  (gutter + 1440px max) on marketing/learner pages, `gutter` beside the portal sidebar and
  `page-y` for the 20px / 32px top rhythm. Never hand-type `px-*` page gutters.
- **Drawers** all use `components/ui/Drawer.tsx`; the body fills edge-to-edge inside the
  drawer's own padding, actions go in the `footer` prop.
- **Buttons**: primary/outline CTAs are `h-[38px] sm:h-[43px]`; inputs use the shared
  `inputClass` (`lib/inputStyle.ts`). Selected pills/chips use the outline style.
- **Notifications** are per persona — `notificationsFor(role)` in `lib/notificationsData.ts`.
- **Icons**: `iconsax-react` only (tree-shaken). Images live in `client/public/assets`;
  photos as JPEG, anything with transparency as WebP — keep new assets under ~200KB.
