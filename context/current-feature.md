# Huidige feature

Dashboard Phase 3 (Filters, Zoeken & Acties)

## Status

<!-- Niet gestart | In uitvoering | Voltooid -->

In uitvoering

## Doelen

Specificatie: `context/features/dashboard-phase-3.md`. Deze fase maakt de interactie in het dashboard compleet: een werkende zoekbalk, interactieve filter-chips en actieknoppen op content-kaarten, met een levendige "juicy" BabyBaas-feel.

- **Zoeken:**
  - de zoekbalk in de header filtert de mock-data in realtime of na een korte debounce, op titel en tags;
  - bij geen resultaten verschijnt een empty state.
- **Filter-chips:**
  - interactieve chips onder de zoekbalk, actief (gekleurd) of inactief (omlijnd);
  - meerdere filters tegelijk mogelijk;
  - subtiele animatie bij het selecteren;
  - op mobiel horizontaal scrollbaar.
- **Content-kaarten:**
  - een favoriet-knop (hartje) met toggle, waarvan de status lokaal bewaard blijft;
  - een status-indicator ("Nieuw", "Bezig", "Voltooid");
  - een hover-effect (lichte schaduwvergroting);
  - een klik-actie als placeholder voor de detailpagina.
- **Animatie:** vloeiende transities van de grid-items bij het wisselen van filters, zonder verspringende layout.
- **Data:** `mock-data.ts` uitgebreid met categorieën, tags en favoriet-status, met genoeg testdata.
- **Klaar wanneer:**
  - zoeken en filters goed werken;
  - de kaarten reageren op hover en klik;
  - favorieten lokaal bewaard blijven;
  - er geen glitches zijn bij het herschikken;
  - de code voldoet aan `coding-standards.md`.

## Todo

- [x] Types voor content-items, categorieën en statussen in `src/types/dashboard.ts`
- [x] Mock-data uitbreiden met ±12–16 content-items (categorie, tags, status, favoriet)
- [x] Gedeelde state voor zoekterm en filters (React context binnen het dashboard)
- [x] Zoekbalk in de top bar koppelen, met debounce (custom hook `useDebounce`)
- [x] Filterlogica (zoekterm + meerdere categorieën) als pure functie
- [x] Filter-chips met actieve/inactieve stijl en animatie, horizontaal scrollbaar op mobiel
- [x] Content-kaart met favoriet-toggle, status-badge, hover-effect en klik-placeholder
- [x] Favorieten lokaal bewaren (`localStorage`, met try/catch)
- [x] Grid op het overzicht met geanimeerde items bij filterwissels (`motion`)
- [x] Empty state bij geen resultaten, met een knop om filters te wissen
- [x] Controleren op mobiel en desktop; lint, typecheck en build draaien

## Notities

- **Startpunt bestaat nog niet:** de spec gaat uit van bestaande filter-chips en content-kaarten, maar het overzicht (`/dashboard`) heeft nog alleen de kop "Overzicht". Chips, kaarten en grid worden in deze fase gebouwd.
- **Categorieën:** de spec noemt "Video" als voorbeeld, maar BabyBaas heeft geen video (zie `project-details.md`). De filters volgen de MVP-onderdelen: Challenges, Foto's, Notities, Mijlpalen, Slaap en Groei, afgestemd op de enums in `prisma/schema.prisma`.
- **Animaties:** de spec noemt `framer-motion`. Dat pakket heet tegenwoordig `motion` (import uit `motion/react`). Dit is een nieuwe dependency.
- **Lokale opslag:** favorieten worden alleen in `localStorage` bewaard, nog niet in de database. Die koppeling volgt na authenticatie.
- **Detailpagina:** een klik op een kaart is een placeholder (`console.log`); er komt nog geen detailpagina.
- **Zoekbalk:** de zoekbalk staat alleen vanaf `sm` in de top bar (phase 1). Op mobiel komt een zoekveld boven de filter-chips op het overzicht.
- **Geen medische inhoud:** mock-data over slaap en groei blijft beschrijvend, zonder medische interpretatie.
- **Implementatie:**
  - **State:** `DashboardFiltersProvider` (in `DashboardLayout`) houdt de zoekterm en categorieën vast; `useDashboardFilters` leest ze uit.
  - **Zoeken:** `SearchInput` staat in de top bar (vanaf `sm`) en op het overzicht (mobiel). Typen op een andere dashboardpagina navigeert naar `/dashboard`. `useDebounce` wacht 200 ms; zoeken negeert hoofdletters en accenten.
  - **Filters:** `filterContentItems` in `src/lib/content-filter.ts`. Meerdere categorieën tonen items uit elk van die categorieën (OF), gecombineerd met de zoekterm (EN).
  - **Favorieten:** `useFavorites` (`useSyncExternalStore` + `localStorage` onder `babybaas:favorites`, met try/catch). Zonder opgeslagen keuze geldt `isFavorite` uit de mock-data. De sidebar-lijst "Favorieten" is nog statisch.
  - **Kaart:** de titel is een knop over de hele kaart (`console.log`-placeholder); de favoriet-knop ligt erboven. Foto-kaarten gebruiken de illustraties uit `public/images`.
  - **Animaties:** `motion` met `layout` en `AnimatePresence mode="popLayout"`; `MotionConfig reducedMotion="user"` respecteert de systeeminstelling voor minder beweging.
  - **Valkuil:** `cn` (tailwind-merge) ziet `bg-dots` en een `bg-<kleur>` als conflict; zet ze daarom op aparte elementen.
  - **Getest in headless Edge:** zoeken ("slapen" → 3), twee filters (Foto's + Mijlpalen → 5), empty state, favoriet bewaard na herladen, klik-placeholder; geen console-fouten.
  - **Na code review opgelost:** `relative` op de grid en chips (voor `popLayout`-exits), `layoutScroll` op de scrollcontainer (`DashboardMain`), één navigatie per zoeksessie vanaf een subpagina, "Wis filters" volgt de gedebouncede zoekterm (wissen werkt direct), betere `sizes` voor foto's en de klik-log alleen in development.

## Geschiedenis

<!-- Houd dit onderdeel bijgewerkt. Oudste eerst -->

- **2026-11-19 — Database Setup (Prisma 7 + Neon PostgreSQL)**: Prisma CLI en client op 7.10.1 met `@prisma/adapter-neon`. `prisma.config.ts` leest `DATABASE_URL` (Neon ontwikkel-branch). Schema bevat het MVP-datamodel (User, Family, FamilyMember, Challenge, ChallengeEntry, SleepEntry, GrowthEntry, AlbumItem) plus de NextAuth-modellen, met indexes en cascade-regels. Eerste migratie `init_database_schema` toegepast; gedeelde client in `src/lib/prisma.ts`.
- **2026-11-22 — Seed mock-data**: `prisma/seed.ts` vult de database met demo-data volgens `context/features/seed-data-spec.md` (herschreven voor het BabyBaas-model). Het maakt twee demo-gebruikers (`demo@babybaas.nl` / `12345678`, bcryptjs 12 rondes), de gezinsruimte "Familie Demo", de zes MVP-challenges, 4 challenge-inzendingen met albumitems, 7 slaap- en 4 groei-invoeren en 4 losse albumitems. Het script is idempotent en draait met `npm run db:seed` via `tsx`. Foto's zijn placeholders van placehold.co.
- **2026-11-22 — Dashboard UI Phase 1 (Layout & Thema)**: ShadCN UI (preset `base-nova`, Base UI) is opgezet voor Tailwind v4, met `button` en `input`. Het "soft-play" thema staat in `src/app/globals.css`: palet-tokens (`ink`, `cream`, `paper`, `orange` #f17829, `teal`, `teal-deep`, `yellow`), retro-schaduwen (`shadow-retro-*`) en stippen-utilities (`bg-dots`, `bg-dots-light`). Dark mode is uitgeschakeld. Fonts: Lilita One voor koppen en Nunito voor tekst, via `next/font`. De route `/dashboard` heeft een "app-in-app"-frame met top bar (logo, zoek-placeholder, "Nieuw item"), een sidebar-placeholder voor desktop, een content-placeholder en een bottom navigation voor mobiel (componenten in `src/components/dashboard/`). Zoeken, "Nieuw item" en de tabs zijn nog niet functioneel.
- **2026-11-22 — Dashboard UI Phase 2 (Zijbalk & Navigatie)**: `SidebarContent` (client component) bevat navigatie (Challenges, Logboek, Album), de collecties "Favorieten" en "Recent bekeken" en een vastgezet gebruikersprofiel met avatar en de knoppen Instellingen en Uitloggen. Het wordt gedeeld door de desktop-zijbalk (afgeronde `paper`-kaart met retro-schaduw) en een mobiele drawer (shadcn `sheet`, schuift in vanaf links met backdrop, sluit na navigatie) achter een hamburger-knop in de top bar. De actieve route wordt gemarkeerd in de zijbalk, de drawer en de bottom navigation (`isActiveRoute` in `src/lib/navigation.ts`). Types `NavigationItem`, `CollectionItem` en `DashboardUser` staan in `src/types/dashboard.ts`, de mock-data in `src/lib/mock-data.ts`. Nieuw: een `DashboardLayout`-component en placeholder-pagina's voor `/dashboard/challenges`, `/logboek` en `/album`. Profiel, collecties, Instellingen en Uitloggen zijn nog mock-data of zonder functie.
