# Huidige Feature: Auth Fase 2 — E-mail/wachtwoord en registratie-API

## Status

In uitvoering

## Doelen

- Het `User`-model heeft een `password`-veld (`String?`) voor de bcrypt-hash.
- `auth.config.ts` blijft edge-compatible met een placeholder `Credentials({ authorize: () => null })`; `auth.ts` overschrijft die met de echte controle (gebruiker op e-mail zoeken, `bcrypt.compare()`).
- Er is een JSON-endpoint `POST /api/auth/register` dat een account aanmaakt met `name`, `email`, `password` en `confirmPassword`.
- Het endpoint geeft duidelijke statuscodes: `201` bij succes, `400` bij ongeldige invoer, `409` als het e-mailadres al bestaat, `500` bij een onverwachte fout.
- De registratieregels zijn op één plek vastgelegd, zodat het formulier `/auth/register` en de API zich hetzelfde gedragen.
- Een account dat via de API is aangemaakt, kan inloggen en komt op `/dashboard` uit.

## Todo

- [x] Controleer `prisma/schema.prisma`: `User.password String?` bestaat (geen migratie nodig)
- [x] Controleer de split config: placeholder in `src/lib/auth.config.ts`, echte bcrypt-validatie in `src/lib/auth.ts`
- [x] Haal de gedeelde registratielogica uit `registerAction` (bestaat-al-check, bcrypt-hash met 12 rondes, `prisma.user.create`) naar een server-only module, bijv. `src/lib/register-user.ts`
- [x] Laat `registerAction` in `src/app/auth/actions.ts` die gedeelde functie gebruiken (gedrag van het formulier blijft gelijk)
- [x] Maak `src/app/api/auth/register/route.ts` met `POST`:
  - [x] JSON veilig inlezen; ongeldige JSON of geen object → `400`
  - [x] Velden normaliseren (naam trimmen, e-mail met `normalizeEmail`) en valideren met `validateRegisterInput` → `400` met `{ errors }`
  - [x] Bestaande gebruiker → `409`
  - [x] Succes → `201` met `{ user: { id, name, email } }` (nooit de hash teruggeven)
  - [x] Onverwachte fout (bijv. gelijktijdige registratie) → `500` met een algemene melding
- [x] Controleer dat de statische route `api/auth/register` voorrang krijgt op `api/auth/[...nextauth]`
- [x] Unit tests voor het inlezen en valideren van de JSON-invoer
- [x] `npm test`, `npm run lint` en `npm run build` slagen
- [x] API-test met de curl uit de spec (`test@babybaas.nl`), plus een dubbele registratie (`409`) en niet-gelijke wachtwoorden (`400`)
- [x] Flow-test: inloggen met het nieuwe account → doorgestuurd naar `/dashboard`
- [x] Testaccount `test@babybaas.nl` na afloop weer verwijderen uit de ontwikkeldatabase

**Controle-resultaat (2026-11-28):** tests 61/61 groen (9 nieuw voor `parseRegisterJson`), lint en `tsc` zonder fouten, build geslaagd (`/api/auth/register` staat naast `/api/auth/[...nextauth]`). API met `next start` + curl: spec-curl → `201` zonder hash; zelfde e-mail in andere schrijfwijze → `409`; ongelijke wachtwoorden, lege body, ongeldige JSON en een array → `400`; `GET` → `405`. Inloggen met het nieuwe account gaf een sessie en `/dashboard` → `200`; `/api/auth/signin` stuurt door naar `/auth/login`. Testaccount daarna verwijderd. Het registratieformulier `/auth/register` is na de refactor door de gebruiker in de browser getest: aanmaken, dubbel e-mailadres, foute invoer en inloggen werken.

- Een unieke-index-fout (`P2002`) bij een gelijktijdige registratie geeft nu ook "e-mailadres bestaat al" (`409` / veldfout) in plaats van de algemene foutmelding.

## Notities

- Bron: `context/features/auth-spec-files/auth-phase-2-spec.md`.
- **Al aanwezig uit eerdere features:** `User.password String?` staat in het schema (eerste migratie), `auth.config.ts` heeft de placeholder-provider en `auth.ts` de bcrypt-validatie. Taken 1 en 2 uit de spec zijn dus controle; taak 3 (de API-route) is nieuw.
- **Geen dubbele logica.** `src/lib/auth-validation.ts` heeft al `validateRegisterInput` (naam max 80, geldig e-mailadres, wachtwoord 8–72 bytes, wachtwoorden gelijk). De API gebruikt die ook, zodat de API niet soepeler is dan het formulier.
- **Login-flow uit de spec:** de spec zegt "navigeer naar `/api/auth/signin` en kies Credentials". Omdat `pages.signIn` naar `/auth/login` wijst, stuurt NextAuth die URL door naar onze eigen inlogpagina. De flow-test loopt dus via `/auth/login`.
- **Beveiliging:** het endpoint is publiek (de proxy-matcher dekt `/api` niet, en dat moet zo blijven). Geen wachtwoord of hash in responses of logs. Een limiet op het aantal registraties/inlogpogingen valt buiten deze fase (al genoteerd als review-punt in fase 1).
- **Soft-play UI:** geen invloed; het is alleen een API. De pagina `/auth/register` behoudt haar uiterlijk en gedrag.
- **Prisma:** geen schemawijziging verwacht. Mocht het `password`-veld toch ontbreken, dan via `npx prisma migrate dev --name add_user_password` (nooit `db push`).
- Referentie: https://authjs.dev/getting-started/authentication/credentials

## Geschiedenis

<!-- Houd dit onderdeel bijgewerkt. Oudste eerst -->

- **2026-11-19 — Database Setup (Prisma 7 + Neon PostgreSQL)**: Prisma CLI en client op 7.10.1 met `@prisma/adapter-neon`. `prisma.config.ts` leest `DATABASE_URL` (Neon ontwikkel-branch). Schema bevat het MVP-datamodel (User, Family, FamilyMember, Challenge, ChallengeEntry, SleepEntry, GrowthEntry, AlbumItem) plus de NextAuth-modellen, met indexes en cascade-regels. Eerste migratie `init_database_schema` toegepast; gedeelde client in `src/lib/prisma.ts`.
- **2026-11-22 — Seed mock-data**: `prisma/seed.ts` vult de database met demo-data volgens `context/features/seed-data-spec.md` (herschreven voor het BabyBaas-model). Het maakt twee demo-gebruikers (`demo@babybaas.nl` / `12345678`, bcryptjs 12 rondes), de gezinsruimte "Familie Demo", de zes MVP-challenges, 4 challenge-inzendingen met albumitems, 7 slaap- en 4 groei-invoeren en 4 losse albumitems. Het script is idempotent en draait met `npm run db:seed` via `tsx`. Foto's zijn placeholders van placehold.co.
- **2026-11-22 — Dashboard UI Phase 1 (Layout & Thema)**: ShadCN UI (preset `base-nova`, Base UI) is opgezet voor Tailwind v4, met `button` en `input`. Het "soft-play" thema staat in `src/app/globals.css`: palet-tokens (`ink`, `cream`, `paper`, `orange` #f17829, `teal`, `teal-deep`, `yellow`), retro-schaduwen (`shadow-retro-*`) en stippen-utilities (`bg-dots`, `bg-dots-light`). Dark mode is uitgeschakeld. Fonts: Lilita One voor koppen en Nunito voor tekst, via `next/font`. De route `/dashboard` heeft een "app-in-app"-frame met top bar (logo, zoek-placeholder, "Nieuw item"), een sidebar-placeholder voor desktop, een content-placeholder en een bottom navigation voor mobiel (componenten in `src/components/dashboard/`). Zoeken, "Nieuw item" en de tabs zijn nog niet functioneel.
- **2026-11-22 — Dashboard UI Phase 2 (Zijbalk & Navigatie)**: `SidebarContent` (client component) bevat navigatie (Challenges, Logboek, Album), de collecties "Favorieten" en "Recent bekeken" en een vastgezet gebruikersprofiel met avatar en de knoppen Instellingen en Uitloggen. Het wordt gedeeld door de desktop-zijbalk (afgeronde `paper`-kaart met retro-schaduw) en een mobiele drawer (shadcn `sheet`, schuift in vanaf links met backdrop, sluit na navigatie) achter een hamburger-knop in de top bar. De actieve route wordt gemarkeerd in de zijbalk, de drawer en de bottom navigation (`isActiveRoute` in `src/lib/navigation.ts`). Types `NavigationItem`, `CollectionItem` en `DashboardUser` staan in `src/types/dashboard.ts`, de mock-data in `src/lib/mock-data.ts`. Nieuw: een `DashboardLayout`-component en placeholder-pagina's voor `/dashboard/challenges`, `/logboek` en `/album`. Profiel, collecties, Instellingen en Uitloggen zijn nog mock-data of zonder functie.
- **2026-11-22 — Dashboard UI Phase 3 (Filters, Zoeken & Acties)**: Het overzicht `/dashboard` toont 16 mock-momenten (`CONTENT_ITEMS` in `src/lib/mock-data.ts`) in een geanimeerde grid (`motion`, `layout` + `AnimatePresence`, `reducedMotion="user"`). Zoeken (titel en tags, zonder hoofdletters of accenten, 200 ms debounce) en filter-chips (Challenges, Foto's, Notities, Mijlpalen, Slaap, Groei; meerdere tegelijk als OF) delen hun state via `DashboardFiltersProvider`. De zoekbalk staat in de top bar en op mobiel op het overzicht; typen op een subpagina navigeert één keer naar het overzicht. Content-kaarten hebben een favoriet-toggle (`useFavorites`, bewaard in `localStorage`), een status-badge, een hover-lift en een klik-placeholder (log alleen in development). Er is een empty state met "Wis zoekterm en filters". Na code review: `relative` op popLayout-containers, `layoutScroll` op de scrollcontainer (`DashboardMain`) en "Wis filters" gekoppeld aan de gedebouncede zoekterm. De sidebar-lijst "Favorieten" volgt de hartjes nog niet.
- **2026-11-22 — Review, tests en code-scan (fixes)**: Vitest 4 opgezet (`npm test`) met unit tests voor `content-filter`, `navigation`, `parseFavoriteOverrides` en de mock-data. Fixes uit de review: hero-/kaartafbeeldingen boven de vouw laden direct, opgeslagen favorieten accepteren alleen booleans, `ContentCard` en `FilterChips` opgesplitst, `shadcn` en `bcryptjs` naar devDependencies. Fixes uit de code-scan: de seed verwijdert nooit meer algemene challenges, weigert bij `NODE_ENV=production` of niet-demo gebruikers (`SEED_FORCE=true` om te overschrijven) en logt geen wachtwoord meer. Vaste instellingen staan in `src/lib/content-categories.ts` en `src/lib/navigation.ts`; `mock-data.ts` bevat alleen tijdelijke data.
- **2026-11-22 — Homepage & Authenticatie Setup (Fase 1)**: De publieke homepage `src/app/page.tsx` (Server Component) in retro soft-play stijl: een gele header met logo, `Hero` (sticker "Privé", titel, subtitel over slaap en groei zonder voeding, CTA's `Aanmelden` → `/auth/register` en `Inloggen` → `/auth/login`) en `FeatureGrid` (Groeidagboek, Slaap & Groei, Veilig Delen) in `src/components/home/`, plus een disclaimer over medisch advies. De door de gebruiker goedgekeurde hero `public/images/hero-babybaas.png` (1024×1024, retro BabyBaas-stijl) laadt via `next/image` met blur-placeholder, `loading="eager"` en `fetchPriority="high"`. Nieuw in `button.tsx`: de varianten `retro` en `retro-outline` en de maat `xl`, met een zichtbare `ink`-focusring en `motion-reduce`-ondersteuning. De auth-routes bestaan nog niet en geven een 404.
- **2026-11-25 — Gebruikersauthenticatie (NextAuth v5, Credentials)**: `next-auth@5.0.0-beta.32` met `@auth/prisma-adapter`, JWT-sessies en inloggen met e-mail en wachtwoord. Split config: `src/lib/auth.config.ts` (zonder Prisma, `authorized`/`jwt`/`session`-callbacks, `session.user.id`) en `src/lib/auth.ts` (PrismaAdapter en bcrypt-controle). Next 16: `src/proxy.ts` (in plaats van middleware, `export default NextAuth(authConfig).auth`) beschermt `/dashboard/*` en stuurt ingelogde gebruikers van `/auth/*` naar `/dashboard`. Pagina's `/auth/login` en `/auth/register` met server actions in `src/app/auth/actions.ts`: validatie in `src/lib/auth-validation.ts` (met tests), bcrypt 12 rondes, automatisch inloggen na registratie en een `callbackUrl` die alleen interne paden toelaat. De TopBar heeft een `UserMenu` (avatar, naam, dropdown met Uitloggen) en het sidebar-profiel gebruikt de sessie met de gezinsnaam uit de database. `MOCK_USER` is verwijderd. Vanwege Cache Components geeft de dashboard-layout de gebruiker als promise door (`DashboardUserProvider`, gelezen met `use()` binnen Suspense). Geen migratie nodig; `AUTH_SECRET` staat in `.env`. Voor een lokale `next start` is `AUTH_TRUST_HOST=true` nodig.
- **2026-11-28 — Auth Setup NextAuth v5 (Fase 1, controle)**: `context/features/auth-spec-files/auth-phase-1-spec.md` gecontroleerd tegen de bestaande auth-opzet; geen codewijzigingen nodig. Split config, alleen Credentials met bcrypt, JWT-sessies, routebescherming van `/dashboard/*` en het getypte `session.user.id` voldoen aan de spec. Besluiten: `src/proxy.ts` in plaats van `middleware.ts` (Next 16), auth-bestanden blijven in `src/lib/`, de eigen pagina's `/auth/login` en `/auth/register` blijven in plaats van de standaard NextAuth-pagina's. Geverifieerd met tests (52/52), lint, build en een handmatige flow (redirect zonder sessie, fout/juist wachtwoord, uitloggen). Review-punten voor later: timingverschil in `authorize` bij een onbekend e-mailadres, geen limiet op inlogpogingen. Ook meegenomen: nieuwe `load`-instructies voor de features-skill en een bijgewerkte `dashboard-phase-2.md`.
