# Huidige Feature: Auth Setup — NextAuth v5 (Credentials Provider, Fase 1)

## Status

In uitvoering

## Doelen

- NextAuth v5 (`next-auth@beta`) met `@auth/prisma-adapter` is geïnstalleerd.
- Split auth config: een edge-compatible config zonder adapter en een volledige config met Prisma adapter.
- Alleen de Credentials Provider (e-mail/wachtwoord), geen GitHub of andere OAuth-providers.
- `authorize` valideert gebruikers tegen de database met bcrypt.
- `session: { strategy: 'jwt' }`.
- `/dashboard/*` is beveiligd; niet-ingelogde gebruikers worden naar de sign-in pagina gestuurd.
- Het `Session`-type is uitgebreid met `user.id` (en `user.role` indien nodig).
- Database-wijzigingen alleen via `npx prisma migrate dev`, nooit `db push`.

## Todo

- [x] Controleer dat `next-auth@beta` (v5) en `@auth/prisma-adapter` in `package.json` staan
- [x] Controleer `src/lib/auth.config.ts`: edge-compatible (geen Prisma/bcrypt-imports), alleen Credentials, `session: { strategy: 'jwt' }`
- [x] Controleer `src/lib/auth.ts`: PrismaAdapter, JWT-strategie en een `authorize` die de gebruiker uit de database haalt en het wachtwoord met bcrypt vergelijkt
- [x] Controleer `src/app/api/auth/[...nextauth]/route.ts`: exporteert `GET` en `POST` uit `handlers`
- [x] Controleer `src/proxy.ts`: beschermt `/dashboard/*` en stuurt niet-ingelogde gebruikers naar de sign-in pagina (met `callbackUrl`)
- [x] Controleer `src/types/next-auth.d.ts`: `Session.user.id` is getypt; `role` alleen toevoegen als het nodig is
- [x] Los gevonden verschillen met de spec op (geen codeverschillen gevonden; alleen de besluiten hieronder)
- [x] `npm test`, `npm run lint` en `npm run build` slagen
- [x] Handmatig testen: inloggen met `demo@babybaas.nl`, uitloggen, `/dashboard` zonder sessie → redirect naar inloggen

**Controle-resultaat (2026-11-28):** tests 52/52 groen, lint zonder fouten, build geslaagd. Flow getest met `next start` + curl: `/dashboard` zonder sessie → 307 naar `/auth/login?callbackUrl=…`; fout wachtwoord → `CredentialsSignin`; juist wachtwoord → sessie met `user.id`; `/auth/login` met sessie → `/dashboard`; na uitloggen weer 307 naar inloggen.

## Notities

- Bron: `context/features/auth-spec-files/auth-phase-1-spec.md`.
- **Grotendeels al gebouwd.** De feature "Gebruikersauthenticatie" (2026-11-25, zie Geschiedenis) heeft dit al opgezet: `src/lib/auth.config.ts`, `src/lib/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `src/proxy.ts` en `src/types/next-auth.d.ts` bestaan. Deze fase is dus vooral controleren en de verschillen oplossen.
- **Besluit: `proxy.ts` in plaats van `middleware.ts`.** In Next 16 is `middleware` verouderd en hernoemd naar `proxy` (`node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`). We gebruiken de bestaande `src/proxy.ts`.
- **Besluit: de bestaande auth-bestanden gebruiken en in `src/lib/` laten.** Dat de spec `src/auth.ts` noemt, is alleen de Auth.js-voorbeeldconventie; de locatie is vrij. In `src/lib/` staan ze bij de andere gedeelde modules (`prisma.ts`, `auth-validation.ts`), en verplaatsen wijzigt alleen imports.
- **Afwijking: standaardpagina's.** De spec wil de standaard NextAuth-pagina's (geen `pages` in de config). Er zijn al eigen pagina's `/auth/login` en `/auth/register`; die blijven, want de spec bedoelde de standaardpagina's alleen als tijdelijke testoplossing.
- **Soft-play UI:** geen invloed. Er komen geen nieuwe schermen bij; de bestaande login- en registratiepagina's houden hun retro-stijl.
- **Prisma:** geen schemawijziging verwacht; de NextAuth-modellen staan al in de eerste migratie. Als `user.role` toch nodig blijkt, voeg het veld toe aan `User` en maak een migratie met `npx prisma migrate dev --name add_user_role` (nooit `db push`).
- Referenties: https://authjs.dev/getting-started/installation#edge-compatibility, https://authjs.dev/getting-started/adapters/prisma, https://authjs.dev/getting-started/providers/credentials

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
