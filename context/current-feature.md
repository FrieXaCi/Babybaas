# Huidige feature

Dashboard Phase 2 (Zijbalk & Navigatie)

## Status

<!-- Niet gestart | In uitvoering | Voltooid -->

In uitvoering

## Doelen

Specificatie: `context/features/dashboard-phase-2.md`. Deze fase voegt de navigatiestructuur toe aan het dashboard: een zijbalk op desktop die op mobiel een drawer (hamburger-menu) wordt, in de soft-play retro-stijl van `welkom.png`.

- **Layout:** een `DashboardLayout`-component met de `Sidebar` links en de content (uit phase 1) rechts. Onder `768px` (`md`) is de zijbalk verborgen.
- **Zijbalk (desktop):**
  - warm wit (`#FFFBF2` / `paper`), afgeronde hoeken (≥ `1.5rem`) en een outline of schaduw;
  - **Navigatie:** Challenges, Logboek en Album, elk met icoon en tekst;
  - **Collecties:** de lijsten "Favorieten" (met iconen) en "Recent bekeken";
  - **Gebruikersprofiel onderaan:** een avatar (placeholder), de naam van de gebruiker en voorbereide acties voor Instellingen en Uitloggen.
- **Mobiele drawer:** een hamburger-icoon in de top bar opent een slide-over menu met dezelfde navigatie, met een soepele overgang en een backdrop.
- **Data en types:** de navigatie-items en collecties komen uit mock-data, met de interfaces `NavigationItem` en `CollectionItem`.
- **Klaar wanneer:**
  - de zijbalk werkt op desktop en het hamburger-menu op mobiel;
  - de navigatie-items klikbaar zijn (naar placeholders);
  - de stijl past bij de rest van de app, zonder dark mode;
  - de code voldoet aan `coding-standards.md`.

## Todo

- [x] Types `NavigationItem` en `CollectionItem` toevoegen in `src/types/dashboard.ts`
- [x] Mock-data voor navigatie, favorieten, recent bekeken en gebruiker in `src/lib/mock-data.ts`
- [x] Placeholder-routes voor Challenges, Logboek en Album, zodat navigatie-items klikbaar zijn
- [x] Gedeelde navigatie-inhoud (navigatie, collecties, profiel) als herbruikbaar component
- [x] Desktop-zijbalk opnieuw bouwen met deze inhoud en de soft-play stijl
- [x] Actieve route markeren in de navigatie
- [x] Hamburger-knop in de top bar (alleen mobiel)
- [x] Mobiele drawer met overgang en backdrop (shadcn Sheet of Base UI Dialog)
- [x] `DashboardLayout`-component dat zijbalk, content en bottom navigation omhult
- [x] Bottom navigation laten linken naar dezelfde routes
- [x] Controleren op mobiel en desktop; lint, typecheck en build draaien

## Notities

- **Mock-data:** de spec noemt een bestaand `mock-data.ts`, maar dat bestand bestaat nog niet. Het wordt in deze fase aangemaakt in `src/lib/mock-data.ts`. De gebruiker in de mock-data sluit aan bij de seed (Demo Gebruiker).
- **Echte data:** er is nog geen authenticatie, dus profiel, favorieten en "recent bekeken" zijn mock-data. Instellingen en Uitloggen zijn alleen voorbereid en doen nog niets.
- **Placeholder-routes:** de mobiele bottom navigation uit phase 1 blijft bestaan naast de drawer. Met placeholder-routes leiden de navigatie-items niet naar een 404.
- **Stijlreferentie:** `public/images/welkom.png`.
- **Merge:** volgens de spec eerst om toestemming vragen voor de finale merge.
- **Implementatie:**
  - `SidebarContent` (client component, gebruikt `usePathname`) bevat de navigatie, collecties en het profiel en wordt gedeeld door `Sidebar` (desktop) en `MobileNav` (drawer).
  - Het profiel staat vast onderaan; de lijsten erboven scrollen.
  - De drawer is de shadcn `sheet` (Base UI Dialog). Hij schuift volledig in vanaf links, heeft een `ink`-backdrop en sluit na een klik op een link.
  - Shadcn-componenten `sheet` en `avatar` toegevoegd. In `sheet.tsx` zijn de backdrop-kleur en het sr-only label ("Sluiten") aangepast.
  - Actieve route: `isActiveRoute` in `src/lib/navigation.ts`, gemarkeerd met een gele pil en `aria-current="page"`.
  - Het logo in de top bar linkt naar `/dashboard`.

## Geschiedenis

<!-- Houd dit onderdeel bijgewerkt. Oudste eerst -->

- **2026-11-19 — Database Setup (Prisma 7 + Neon PostgreSQL)**: Prisma CLI en client op 7.10.1 met `@prisma/adapter-neon`. `prisma.config.ts` leest `DATABASE_URL` (Neon ontwikkel-branch). Schema bevat het MVP-datamodel (User, Family, FamilyMember, Challenge, ChallengeEntry, SleepEntry, GrowthEntry, AlbumItem) plus de NextAuth-modellen, met indexes en cascade-regels. Eerste migratie `init_database_schema` toegepast; gedeelde client in `src/lib/prisma.ts`.
- **2026-11-22 — Seed mock-data**: `prisma/seed.ts` vult de database met demo-data volgens `context/features/seed-data-spec.md` (herschreven voor het BabyBaas-model). Het maakt twee demo-gebruikers (`demo@babybaas.nl` / `12345678`, bcryptjs 12 rondes), de gezinsruimte "Familie Demo", de zes MVP-challenges, 4 challenge-inzendingen met albumitems, 7 slaap- en 4 groei-invoeren en 4 losse albumitems. Het script is idempotent en draait met `npm run db:seed` via `tsx`. Foto's zijn placeholders van placehold.co.
- **2026-11-22 — Dashboard UI Phase 1 (Layout & Thema)**: ShadCN UI (preset `base-nova`, Base UI) is opgezet voor Tailwind v4, met `button` en `input`. Het "soft-play" thema staat in `src/app/globals.css`: palet-tokens (`ink`, `cream`, `paper`, `orange` #f17829, `teal`, `teal-deep`, `yellow`), retro-schaduwen (`shadow-retro-*`) en stippen-utilities (`bg-dots`, `bg-dots-light`). Dark mode is uitgeschakeld. Fonts: Lilita One voor koppen en Nunito voor tekst, via `next/font`. De route `/dashboard` heeft een "app-in-app"-frame met top bar (logo, zoek-placeholder, "Nieuw item"), een sidebar-placeholder voor desktop, een content-placeholder en een bottom navigation voor mobiel (componenten in `src/components/dashboard/`). Zoeken, "Nieuw item" en de tabs zijn nog niet functioneel.
