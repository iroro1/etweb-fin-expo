## ET Marketplace Expo Rewrite Plan

### Goals
- Rebuild the existing `etweb-fin` Next.js marketplace as a React Native application using Expo.
- Maintain all user-facing flows: auth, discovery, cart, checkout, seller dashboard, service booking, notifications.
- Share business logic (Supabase integration, data models) with minimal rewrites while adapting presentation to native UI paradigms.

### Tooling & Project Structure
- Expo SDK 51 with TypeScript, using the `expo-router` file-system router for parity with Next routes.
- Core directories under `src/`:
  - `src/app` – expo-router screens mirroring web routes (`index`, `products`, `product/[id]`, etc.).
  - `src/components` – reusable native UI widgets (Cards, Carousels, Modals, Dashboard components).
  - `src/contexts` – React Contexts migrated from web (Auth, Cart, Compare, Theme, Wishlist).
  - `src/hooks` – shared hooks (`useSupabaseAuthReady`, Paystack hook substitutes, responsive helpers).
  - `src/lib` – `supabase` client, config, utility helpers.
  - `src/data` – static JSON/data seeds reused from web version.
  - `src/services` – API layer translated from `http/Api.ts` for Supabase + REST interactions.
  - `src/navigation` – centralised router options, shared Stack/Tab definitions.
  - `src/styles` – theme constants, tailwind token translations to React Native StyleSheet helpers.

### Navigation Mapping (expo-router)
- Root `_layout.tsx` provides global providers (SafeArea, QueryClient, Theme, Auth).
- Tabs for primary customer flows:
  - `/(tabs)/home` → Home feed.
  - `/(tabs)/products` → Product catalogue search.
  - `/(tabs)/services` → Services marketplace.
  - `/(tabs)/cart` → Cart & checkout entry.
  - `/(tabs)/profile` → Customer profile, orders, addresses.
- Nested stacks for detail screens:
  - `/product/[id]`, `/services/[id]`, `/orders/[id]`, `/messages/[id]`, etc.
- Seller flows grouped under `/seller/*` with their own layout containing Drawer + Stack if needed.

### Styling Strategy
- Replace Tailwind classes with typed StyleSheet objects and utility helpers translating the design tokens (colors, spacing, typography).
- Create a design system file `styles/tokens.ts` capturing palette from Tailwind `theme.ts`.
- Compose complex layouts with `react-native-reanimated` and `expo-image` for hero animations/carousels.

### State & Data
- Supabase client from `@supabase/supabase-js` (Expo-compatible) configured via `app.config.ts` + `expo-constants` to load `SUPABASE_URL`, `SUPABASE_ANON_KEY`.
- React Query for data fetching/mutation identical to web version.
- AsyncStorage-backed persistence for auth session, cart, wishlist caches.
- Paystack integration via `@paystack/checkout` webview fallback; implement native `usePaystackPayment` hook replicating `PaystackModal` behaviour.

### Feature Porting Checklist
1. **Auth & Onboarding** – Sign in/up, Google OAuth (via WebBrowser), verification prompts, password reset.
2. **Home Experience** – Hero, featured products/services carousels, category grid, CTA buttons.
3. **Product Catalogue** – Filters, search, sort, infinite scroll, product detail with gallery, reviews, related items.
4. **Services Marketplace** – Listing, detail view, booking modal, provider info, reviews.
5. **Cart & Checkout** – Cart management, address selection, shipping summary, Paystack payment flow, order confirmation.
6. **Wishlist & Compare** – Manage lists, share capability (using native Share API), compare view.
7. **Profile Area** – Account settings, addresses, orders/timeline, notifications, support, privacy pages.
8. **Seller Dashboard** – Analytics, product/service CRUD, order management, modals, preview flows.
9. **Messaging & Notifications** – In-app messaging pages, push notification scaffolding (Expo Notifications).
10. **Blog & Content Pages** – Render markdown/HTML content via native components.

### Native-Specific Considerations
- Use `expo-notifications` for push support; stubbed integration until server config available.
- Replace Next `Image` with `expo-image` for caching; integrate placeholders.
- Substitute `framer-motion` with `moti`/`react-native-reanimated` animations using similar variants abstraction.
- Replace iconography (`lucide-react`) with `lucide-react-native`.
- Implement secure storage for sensitive tokens if required (`expo-secure-store`).

### Delivery Phases
1. **Foundation** – Scaffold project, navigation, global providers, theme tokens.
2. **Customer Flows** – Home, products/services, cart/checkout, account basics.
3. **Advanced Features** – Wishlist, compare, messaging, content pages.
4. **Seller Suite** – Dashboard analytics, product/service management.
5. **Integration Polish** – Paystack, notifications, deep links, offline support.

### Testing & QA
- Unit tests with Jest + React Native Testing Library.
- E2E flows staged with Detox (roadmap).
- Supabase interactions validated against staging project.

### Migration Risks & Mitigations
- **UI Parity** – Differences due to native layout; mitigate with shared tokens & design QA.
- **Supabase Auth** – Manage persistent session via AsyncStorage and `supabase.auth.onAuthStateChange`.
- **Payment Flow** – Ensure Paystack webview fallback works offline/online, guard race conditions.
- **Performance** – Use FlatList/FlashList for large collections, lazy load heavy screens.


