# Huidige feature

Homepage & Authenticatie Setup (Fase 1)

## Status

<!-- Niet gestart | In uitvoering | Voltooid -->

In uitvoering

## Doelen

Specificatie: `context/features/homepage.md`. De publieke homepage van BabyBaas, met een uitnodigende soft-play uitstraling die ouders direct aanspreekt, een duidelijke waardepropositie en navigatie naar de login- en registratieflow.

- **Hero-afbeelding:**
  - eerst een prompt voor een AI image generator opstellen en de afbeelding laten goedkeuren voordat de code wordt geschreven;
  - opslaan als `public/images/hero-babybaas.png`.
- **Hero-sectie in `src/app/page.tsx`:**
  - titel: "BabyBaas: Alles over jouw kleintje op één veilige plek.";
  - subtitel: "Leg elk kostbaar moment vast, houd slaap en groei bij, en deel de mijlpalen van je baby veilig met de mensen die je liefhebt." (aangepast: geen voeding);
  - twee knoppen: `Aanmelden` (primair, naar `/auth/register`) en `Inloggen` (secundair/outline, naar `/auth/login`).
- **Features-grid:**
  - **Groeidagboek:** mijlpalen vastleggen met foto's en verhalen;
  - **Slaap & Groei:** slaap en groei bijhouden voor meer rust en overzicht (aangepast: geen voeding);
  - **Veilig Delen:** jij bepaalt wie er meekijkt; geen social media, maar een privé gezinshub.
- **Styling:**
  - de soft-play thema-tokens uit `src/app/globals.css`;
  - mobile-first: knoppen onder elkaar op mobiel, naast elkaar op desktop;
  - `next/image` voor de hero met de juiste aspect ratio.
- **Componenten:** bestaande UI-componenten (zoals `Button`) gebruiken, of nieuwe maken in `src/components/ui/` in BabyBaas-stijl.
- **Validatie:** de code-scanner op de nieuwe pagina laten draaien.

## Todo

- [x] Prompt voor de hero-afbeelding opstellen
- [x] Hero-afbeelding laten genereren en goedkeuren; opslaan als `public/images/hero-babybaas.png`
- [x] Hero-sectie met titel, subtitel en CTA-knoppen (`/auth/register`, `/auth/login`)
- [x] Features-grid met drie kaarten
- [x] Responsive: knoppen onder elkaar op mobiel, naast elkaar op desktop
- [x] Metadata (titel en beschrijving) van de homepage bijwerken
- [x] Controleren op mobiel en desktop; lint, typecheck, tests en build draaien
- [x] Code-scanner draaien op de nieuwe pagina en bevindingen oplossen

## Notities

- **Geen eigen beeldgenerator:** Claude kan zelf geen afbeeldingen genereren. Claude levert de prompt; de gebruiker genereert de afbeelding en zet die in `public/images/`.
- **"Soft-play kleuren":** de spec verwijst naar `coding-standards.md`, maar de kleuren staan in `src/app/globals.css` (`ink`, `cream`, `paper`, `orange`, `teal`, `teal-deep`, `yellow`).
- **Besluit: stijl van de hero:** retro BabyBaas, dus dezelfde jaren-60 cartoonstijl met dikke lijnen als `welkom.png` en `moment-*.png`, met de rustige, veilige sfeer uit de spec. Dit wijkt bewust af van de pastel/3D-richtlijn in de spec.
- **Besluit: geen "voeding":** een voedingslogboek zit niet in de MVP (alleen slaap en groei). De subtitel wordt "...houd slaap en groei bij..." en de feature heet "Slaap & Groei".
- **Besluit: volgorde:** de pagina wordt pas gebouwd nadat de gebruiker `hero-babybaas.png` heeft aangeleverd en goedgekeurd (volgens de spec).
- **Auth-routes:** `/auth/register` en `/auth/login` bestaan nog niet. In deze fase leiden de knoppen daar alleen naartoe.
- **Code-scanner:** de spec noemt `code-scanner-babybaas-nl`; de agent in het project heet `code-scanner`.
- **Implementatie:**
  - `src/app/page.tsx` (Server Component) met een gele header met logo, `Hero` en `FeatureGrid` (in `src/components/home/`) en een footer met de disclaimer dat BabyBaas geen medisch advies geeft.
  - De hero-afbeelding is vierkant (1024×1024); `next/image` met statische import, `placeholder="blur"`, `loading="eager"` en `fetchPriority="high"` (LCP).
  - De CTA's zijn `Link`s met `buttonVariants`. Nieuw in `button.tsx`: de varianten `retro` en `retro-outline` en de maat `xl`, herbruikbaar voor de auth-pagina's.
- **Na de code-scanner opgelost:**
  - focusring van de retro-knoppen in `ink` met een crème offset (een oranje ring was onzichtbaar op de oranje knop);
  - de "indruk" bij klikken overschrijft de basis-translate betrouwbaar, met `motion-reduce`-varianten;
  - extra text-shadow op "BabyBaas:" voor contrast;
  - geen hover-effect op de niet-klikbare feature-kaarten;
  - nauwkeuriger `sizes` voor de hero.
- **Bewust niet aangepast:**
  - de relatieve import van de hero (`@/` wijst naar `src/`, de afbeelding staat in `public/`);
  - het contrast van het logo (tekst die deel uitmaakt van een logo is uitgezonderd van WCAG-contrasteisen).

## Geschiedenis

<!-- Houd dit onderdeel bijgewerkt. Oudste eerst -->

- **2026-11-19 — Database Setup (Prisma 7 + Neon PostgreSQL)**: Prisma CLI en client op 7.10.1 met `@prisma/adapter-neon`. `prisma.config.ts` leest `DATABASE_URL` (Neon ontwikkel-branch). Schema bevat het MVP-datamodel (User, Family, FamilyMember, Challenge, ChallengeEntry, SleepEntry, GrowthEntry, AlbumItem) plus de NextAuth-modellen, met indexes en cascade-regels. Eerste migratie `init_database_schema` toegepast; gedeelde client in `src/lib/prisma.ts`.
- **2026-11-22 — Seed mock-data**: `prisma/seed.ts` vult de database met demo-data volgens `context/features/seed-data-spec.md` (herschreven voor het BabyBaas-model). Het maakt twee demo-gebruikers (`demo@babybaas.nl` / `12345678`, bcryptjs 12 rondes), de gezinsruimte "Familie Demo", de zes MVP-challenges, 4 challenge-inzendingen met albumitems, 7 slaap- en 4 groei-invoeren en 4 losse albumitems. Het script is idempotent en draait met `npm run db:seed` via `tsx`. Foto's zijn placeholders van placehold.co.
- **2026-11-22 — Dashboard UI Phase 1 (Layout & Thema)**: ShadCN UI (preset `base-nova`, Base UI) is opgezet voor Tailwind v4, met `button` en `input`. Het "soft-play" thema staat in `src/app/globals.css`: palet-tokens (`ink`, `cream`, `paper`, `orange` #f17829, `teal`, `teal-deep`, `yellow`), retro-schaduwen (`shadow-retro-*`) en stippen-utilities (`bg-dots`, `bg-dots-light`). Dark mode is uitgeschakeld. Fonts: Lilita One voor koppen en Nunito voor tekst, via `next/font`. De route `/dashboard` heeft een "app-in-app"-frame met top bar (logo, zoek-placeholder, "Nieuw item"), een sidebar-placeholder voor desktop, een content-placeholder en een bottom navigation voor mobiel (componenten in `src/components/dashboard/`). Zoeken, "Nieuw item" en de tabs zijn nog niet functioneel.
- **2026-11-22 — Dashboard UI Phase 2 (Zijbalk & Navigatie)**: `SidebarContent` (client component) bevat navigatie (Challenges, Logboek, Album), de collecties "Favorieten" en "Recent bekeken" en een vastgezet gebruikersprofiel met avatar en de knoppen Instellingen en Uitloggen. Het wordt gedeeld door de desktop-zijbalk (afgeronde `paper`-kaart met retro-schaduw) en een mobiele drawer (shadcn `sheet`, schuift in vanaf links met backdrop, sluit na navigatie) achter een hamburger-knop in de top bar. De actieve route wordt gemarkeerd in de zijbalk, de drawer en de bottom navigation (`isActiveRoute` in `src/lib/navigation.ts`). Types `NavigationItem`, `CollectionItem` en `DashboardUser` staan in `src/types/dashboard.ts`, de mock-data in `src/lib/mock-data.ts`. Nieuw: een `DashboardLayout`-component en placeholder-pagina's voor `/dashboard/challenges`, `/logboek` en `/album`. Profiel, collecties, Instellingen en Uitloggen zijn nog mock-data of zonder functie.
- **2026-11-22 — Dashboard UI Phase 3 (Filters, Zoeken & Acties)**: Het overzicht `/dashboard` toont 16 mock-momenten (`CONTENT_ITEMS` in `src/lib/mock-data.ts`) in een geanimeerde grid (`motion`, `layout` + `AnimatePresence`, `reducedMotion="user"`). Zoeken (titel en tags, zonder hoofdletters of accenten, 200 ms debounce) en filter-chips (Challenges, Foto's, Notities, Mijlpalen, Slaap, Groei; meerdere tegelijk als OF) delen hun state via `DashboardFiltersProvider`. De zoekbalk staat in de top bar en op mobiel op het overzicht; typen op een subpagina navigeert één keer naar het overzicht. Content-kaarten hebben een favoriet-toggle (`useFavorites`, bewaard in `localStorage`), een status-badge, een hover-lift en een klik-placeholder (log alleen in development). Er is een empty state met "Wis zoekterm en filters". Na code review: `relative` op popLayout-containers, `layoutScroll` op de scrollcontainer (`DashboardMain`) en "Wis filters" gekoppeld aan de gedebouncede zoekterm. De sidebar-lijst "Favorieten" volgt de hartjes nog niet.
