# Huidige feature

Gebruikersauthenticatie (NextAuth v5 / Auth.js, Credentials)

## Status

<!-- Niet gestart | In uitvoering | Voltooid -->

In uitvoering

## Doelen

<!-- Doelen en vereisten -->

- Gebruikers kunnen zich registreren met naam, e-mail, wachtwoord en bevestiging van het wachtwoord. Het wachtwoord wordt met bcryptjs gehasht opgeslagen.
- Gebruikers kunnen inloggen en uitloggen met e-mail en wachtwoord (Credentials provider, JWT-sessies).
- Alle routes onder `/dashboard/*` zijn beveiligd. Wie niet is ingelogd, gaat automatisch naar de inlogpagina.
- De TopBar toont de avatar en naam van de ingelogde gebruiker, met een dropdown en een link "Uitloggen".
- Split auth config pattern: de route-beveiliging importeert geen Prisma.

## Todo

<!-- checklist van de implementatiestappen -->

- [x] Installeer `next-auth@beta` en `@auth/prisma-adapter`. Zet `bcryptjs` van devDependencies terug naar dependencies (nodig tijdens runtime).
- [x] Controleer de NextAuth-modellen (Account, Session, VerificationToken) en `User.password` in het schema. Migreer alleen als er iets wijzigt (`npx prisma migrate dev --name add-auth-models`, nooit `db push`). Schema was al compleet, geen migratie nodig.
- [x] Voeg `AUTH_SECRET` toe aan `.env` (`npx auth secret`).
- [x] `src/lib/auth.config.ts`: providers, `session: { strategy: "jwt" }`, `pages.signIn`, callbacks (`authorized`, `jwt`, `session`). Credentials met `authorize: () => null`. Geen Prisma-imports.
- [x] `src/lib/auth.ts`: breidt `authConfig` uit met `PrismaAdapter(prisma)` en een Credentials provider met bcrypt-validatie. Exporteert `handlers`, `auth`, `signIn` en `signOut`.
- [x] `src/app/api/auth/[...nextauth]/route.ts`: exporteert `GET` en `POST` uit `handlers`.
- [x] `src/proxy.ts` (Next 16, zie Notities): `NextAuth(authConfig).auth` met een matcher voor `/dashboard/:path*`.
- [x] Registratie: pagina `/auth/register` en een Server Action met validatie (bestaande e-mail, gelijke wachtwoorden, minimale lengte), bcrypt-hash en daarna inloggen of doorsturen.
- [x] Inloggen: pagina `/auth/login` met foutmelding bij ongeldige gegevens en een `callbackUrl` die terugleidt naar de oorspronkelijke pagina.
- [x] TopBar: avatar en naam uit de sessie, met een dropdown met "Uitloggen". Vervang de mock-gebruiker in de sidebar door de sessie, ook in de knop Uitloggen.
- [x] Types: breid `Session` uit met `user.id`.
- [x] Tests: gericht op validatie bij registratie en wachtwoordcontrole, daarna `npm test` en `npm run build`.
- [ ] Handmatig in de browser: registreren, inloggen met een redirect terug, uitloggen via de TopBar en de sidebar.

## Notities

<!-- Eventuele aanvullende opmerkingen -->

- **Next.js 16.4.6, afwijking van de spec:** `middleware.ts` is deprecated en heet nu `src/proxy.ts`, met de export `proxy`. Proxy draait standaard op de Node.js-runtime, en de `runtime`-optie is daar niet toegestaan. We houden het split config pattern toch aan, zodat de proxy licht blijft en geen Prisma laadt. Zie `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`.
- Het schema bevat al `Account`, `Session`, `VerificationToken` en `User.password` (uit de migratie `init_database_schema`). Waarschijnlijk is er geen nieuwe migratie nodig.
- De demo-gebruiker `demo@babybaas.nl` / `12345678` (uit de seed, bcrypt 12 rondes) kan dienen als testlogin.
- De homepage verwijst al naar `/auth/register` en `/auth/login`. Die routes geven nu nog een 404.
- Stijl: retro soft-play (knoppen `retro` / `retro-outline`, shadcn `input`). Een dropdown-component (shadcn `dropdown-menu`) moet mogelijk nog worden toegevoegd.
- **Cache Components staan aan:** `auth()` en `searchParams` zijn runtime-data. De dashboard-layout geeft de gebruiker als promise door (`DashboardUserProvider`), en `UserMenu` en `UserProfile` lezen die met `use()` binnen `<Suspense>` met een skeleton. De inlogpagina leest `callbackUrl` binnen Suspense.
- `proxy.ts` moet `export default NextAuth(authConfig).auth` gebruiken. Een gedestructureerde `export const { auth: proxy }` herkent de build niet.
- `next start` lokaal vereist `AUTH_TRUST_HOST=true` (Auth.js `UntrustedHost`). Bij `next dev` en op Vercel is dat niet nodig. Op een eigen server moet je `AUTH_TRUST_HOST` of `AUTH_URL` zetten.
- De proxy-matcher dekt ook `/auth/*`: wie al is ingelogd, gaat van de login- of registratiepagina naar `/dashboard`.
- Referenties: https://authjs.dev/getting-started/installation#edge-compatibility, https://authjs.dev/getting-started/adapters/prisma

## Geschiedenis

<!-- Houd dit onderdeel bijgewerkt. Oudste eerst -->

- **2026-11-19 — Database Setup (Prisma 7 + Neon PostgreSQL)**: Prisma CLI en client op 7.10.1 met `@prisma/adapter-neon`. `prisma.config.ts` leest `DATABASE_URL` (Neon ontwikkel-branch). Schema bevat het MVP-datamodel (User, Family, FamilyMember, Challenge, ChallengeEntry, SleepEntry, GrowthEntry, AlbumItem) plus de NextAuth-modellen, met indexes en cascade-regels. Eerste migratie `init_database_schema` toegepast; gedeelde client in `src/lib/prisma.ts`.
- **2026-11-22 — Seed mock-data**: `prisma/seed.ts` vult de database met demo-data volgens `context/features/seed-data-spec.md` (herschreven voor het BabyBaas-model). Het maakt twee demo-gebruikers (`demo@babybaas.nl` / `12345678`, bcryptjs 12 rondes), de gezinsruimte "Familie Demo", de zes MVP-challenges, 4 challenge-inzendingen met albumitems, 7 slaap- en 4 groei-invoeren en 4 losse albumitems. Het script is idempotent en draait met `npm run db:seed` via `tsx`. Foto's zijn placeholders van placehold.co.
- **2026-11-22 — Dashboard UI Phase 1 (Layout & Thema)**: ShadCN UI (preset `base-nova`, Base UI) is opgezet voor Tailwind v4, met `button` en `input`. Het "soft-play" thema staat in `src/app/globals.css`: palet-tokens (`ink`, `cream`, `paper`, `orange` #f17829, `teal`, `teal-deep`, `yellow`), retro-schaduwen (`shadow-retro-*`) en stippen-utilities (`bg-dots`, `bg-dots-light`). Dark mode is uitgeschakeld. Fonts: Lilita One voor koppen en Nunito voor tekst, via `next/font`. De route `/dashboard` heeft een "app-in-app"-frame met top bar (logo, zoek-placeholder, "Nieuw item"), een sidebar-placeholder voor desktop, een content-placeholder en een bottom navigation voor mobiel (componenten in `src/components/dashboard/`). Zoeken, "Nieuw item" en de tabs zijn nog niet functioneel.
- **2026-11-22 — Dashboard UI Phase 2 (Zijbalk & Navigatie)**: `SidebarContent` (client component) bevat navigatie (Challenges, Logboek, Album), de collecties "Favorieten" en "Recent bekeken" en een vastgezet gebruikersprofiel met avatar en de knoppen Instellingen en Uitloggen. Het wordt gedeeld door de desktop-zijbalk (afgeronde `paper`-kaart met retro-schaduw) en een mobiele drawer (shadcn `sheet`, schuift in vanaf links met backdrop, sluit na navigatie) achter een hamburger-knop in de top bar. De actieve route wordt gemarkeerd in de zijbalk, de drawer en de bottom navigation (`isActiveRoute` in `src/lib/navigation.ts`). Types `NavigationItem`, `CollectionItem` en `DashboardUser` staan in `src/types/dashboard.ts`, de mock-data in `src/lib/mock-data.ts`. Nieuw: een `DashboardLayout`-component en placeholder-pagina's voor `/dashboard/challenges`, `/logboek` en `/album`. Profiel, collecties, Instellingen en Uitloggen zijn nog mock-data of zonder functie.
- **2026-11-22 — Dashboard UI Phase 3 (Filters, Zoeken & Acties)**: Het overzicht `/dashboard` toont 16 mock-momenten (`CONTENT_ITEMS` in `src/lib/mock-data.ts`) in een geanimeerde grid (`motion`, `layout` + `AnimatePresence`, `reducedMotion="user"`). Zoeken (titel en tags, zonder hoofdletters of accenten, 200 ms debounce) en filter-chips (Challenges, Foto's, Notities, Mijlpalen, Slaap, Groei; meerdere tegelijk als OF) delen hun state via `DashboardFiltersProvider`. De zoekbalk staat in de top bar en op mobiel op het overzicht; typen op een subpagina navigeert één keer naar het overzicht. Content-kaarten hebben een favoriet-toggle (`useFavorites`, bewaard in `localStorage`), een status-badge, een hover-lift en een klik-placeholder (log alleen in development). Er is een empty state met "Wis zoekterm en filters". Na code review: `relative` op popLayout-containers, `layoutScroll` op de scrollcontainer (`DashboardMain`) en "Wis filters" gekoppeld aan de gedebouncede zoekterm. De sidebar-lijst "Favorieten" volgt de hartjes nog niet.
- **2026-11-22 — Review, tests en code-scan (fixes)**: Vitest 4 opgezet (`npm test`) met unit tests voor `content-filter`, `navigation`, `parseFavoriteOverrides` en de mock-data. Fixes uit de review: hero-/kaartafbeeldingen boven de vouw laden direct, opgeslagen favorieten accepteren alleen booleans, `ContentCard` en `FilterChips` opgesplitst, `shadcn` en `bcryptjs` naar devDependencies. Fixes uit de code-scan: de seed verwijdert nooit meer algemene challenges, weigert bij `NODE_ENV=production` of niet-demo gebruikers (`SEED_FORCE=true` om te overschrijven) en logt geen wachtwoord meer. Vaste instellingen staan in `src/lib/content-categories.ts` en `src/lib/navigation.ts`; `mock-data.ts` bevat alleen tijdelijke data.
- **2026-11-22 — Homepage & Authenticatie Setup (Fase 1)**: De publieke homepage `src/app/page.tsx` (Server Component) in retro soft-play stijl: een gele header met logo, `Hero` (sticker "Privé", titel, subtitel over slaap en groei zonder voeding, CTA's `Aanmelden` → `/auth/register` en `Inloggen` → `/auth/login`) en `FeatureGrid` (Groeidagboek, Slaap & Groei, Veilig Delen) in `src/components/home/`, plus een disclaimer over medisch advies. De door de gebruiker goedgekeurde hero `public/images/hero-babybaas.png` (1024×1024, retro BabyBaas-stijl) laadt via `next/image` met blur-placeholder, `loading="eager"` en `fetchPriority="high"`. Nieuw in `button.tsx`: de varianten `retro` en `retro-outline` en de maat `xl`, met een zichtbare `ink`-focusring en `motion-reduce`-ondersteuning. De auth-routes bestaan nog niet en geven een 404.
