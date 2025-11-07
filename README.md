# ET Marketplace (Expo)

This project is a full React Native rewrite of the `etweb-fin` marketplace, built with Expo + expo-router. It mirrors the web app feature-for-feature while delivering a native experience on iOS, Android, and web.

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn, pnpm, or npm (examples below use `yarn`)
- Expo CLI (`npm install -g expo-cli`) if you want global commands

### Installation

```bash
yarn install
cp env.example .env.local # fill in Supabase + EAS config
```

### Local Development

```bash
yarn start       # start Expo dev server
yarn android     # run on Android emulator/device
yarn ios         # run on iOS simulator/device
yarn web         # run web build via Expo Router
```

### Testing & Linting

```bash
yarn lint
yarn test
```

## Project Structure

- `src/app` – expo-router screens that mirror the former Next.js routes
- `src/components` – reusable UI elements (cards, modals, carousels, etc.)
- `src/contexts` – global state providers (Auth, Cart, Compare, Theme, Wishlist)
- `src/data` – shared seed data ported from the web project
- `src/services` – Supabase + REST API modules
- `src/navigation` – shared navigation options & providers
- `src/styles` – design tokens and utility helpers inspired by the Tailwind theme

Refer to `ARCHITECTURE_PLAN.md` for a detailed migration strategy and parity checklist.

