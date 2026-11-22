# Huidige feature

Dashboard UI Phase 1 (Layout & Thema)

## Status

<!-- Niet gestart | In uitvoering | Voltooid -->

In uitvoering

## Doelen

Specificatie: `context/features/dashboard-phase-1.md`. Deze fase legt de visuele en technische basis van het dashboard in de speelse retro-stijl van het prototype (hoofdscherm).

- **ShadCN UI en Tailwind v4:** de componentenbibliotheek initialiseren volgens `coding-standards.md`, zonder `tailwind.config.*`.
- **Thema:** het kleurenpalet uit het prototype:
  - een warme beige/crème achtergrond, eventueel met een subtiele grid-dot overlay;
  - accentkleuren oranje (`#f17829`), teal/turquoise en geel.
- **Geen dark mode:** alleen het lichte "soft-play" thema. Standaard dark-mode configuratie wordt verwijderd of uitgeschakeld.
- **Typografie:** een speels, afgerond font voor koppen (zoals in het logo) en een goed leesbaar sans-serif font voor bodytekst.
- **Route:** het dashboard staat op `/dashboard`.
- **Main layout:** een responsive container met de "app-in-app" look van het prototype (afgeronde hoeken, dikke zwarte randen).
  - **Top bar:** branding (BabyBaas-logo/hartje), een zoekveld als placeholder en een knop "Nieuw item".
  - **Sidebar placeholder:** gereserveerde ruimte links (desktop) met een tijdelijke `h2` "Navigatie".
  - **Content area placeholder:** centrale ruimte voor widgets met een tijdelijke `h2` "Overzicht".
- **Bottom navigation (mobiel):** een tab-bar onderaan met Challenges, Logboek en Album (mobile-first).

## Todo

- [x] ShadCN UI initialiseren voor Tailwind v4
- [x] Thema-tokens (kleuren, achtergrond met grid-dots) vastleggen met `@theme` in `src/app/globals.css`
- [x] Dark-mode configuratie verwijderen of uitschakelen
- [x] Fonts voor koppen en bodytekst instellen
- [x] Route `/dashboard` met layout aanmaken
- [x] Top bar bouwen (logo, zoek-placeholder, knop "Nieuw item")
- [x] Sidebar placeholder voor desktop ("Navigatie")
- [x] Content area placeholder ("Overzicht")
- [x] Bottom navigation voor mobiel (Challenges, Logboek, Album)
- [x] Controleren op mobiel en desktop; lint en build draaien

## Notities

- De visuele referentie is het prototype van het hoofdscherm (`context/screenshots`).
- Zoeken, "Nieuw item" en de navigatie-items zijn in deze fase alleen placeholders, zonder functionaliteit.
- De vervolgstappen staan in `context/features/dashboard-phase-2.md`.
- ShadCN is geïnitialiseerd met de preset `base-nova` (Base UI) en de componenten `button` en `input`. `cn` komt uit het officiële shadcn-pakket `cn` (via `@/lib/utils`).
- Fonts via `next/font/google` (zelf gehost): Lilita One voor koppen (`font-heading`, automatisch op h1–h3) en Nunito voor bodytekst (`font-sans`).
- Palet-tokens: `ink`, `cream`, `paper`, `orange` (#f17829), `teal`, `teal-deep` en `yellow`, plus de schaduwen `shadow-retro-sm/retro/retro-lg` en de utilities `bg-dots` en `bg-dots-light`. De shadcn-tokens (primary, secondary, accent, border...) verwijzen naar dit palet.
- Dark mode: het `.dark`-blok is verwijderd. De `dark`-variant hangt aan een `.dark`-class die nooit wordt gezet, zodat de `dark:`-classes van shadcn ook bij een donker besturingssysteem niets doen.
- Op mobiel vult het dashboard het hele scherm. Vanaf `md` wordt het een afgerond "app-in-app"-frame met dikke rand op een teal achtergrond met stippen. Het zoekveld verschijnt vanaf `sm`; op kleinere schermen is "Nieuw item" een knop met alleen een icoon.

## Geschiedenis

<!-- Houd dit onderdeel bijgewerkt. Oudste eerst -->

- **2026-11-19 — Database Setup (Prisma 7 + Neon PostgreSQL)**: Prisma CLI en client op 7.10.1 met `@prisma/adapter-neon`. `prisma.config.ts` leest `DATABASE_URL` (Neon ontwikkel-branch). Schema bevat het MVP-datamodel (User, Family, FamilyMember, Challenge, ChallengeEntry, SleepEntry, GrowthEntry, AlbumItem) plus de NextAuth-modellen, met indexes en cascade-regels. Eerste migratie `init_database_schema` toegepast; gedeelde client in `src/lib/prisma.ts`.
- **2026-11-22 — Seed mock-data**: `prisma/seed.ts` vult de database met demo-data volgens `context/features/seed-data-spec.md` (herschreven voor het BabyBaas-model). Het maakt twee demo-gebruikers (`demo@babybaas.nl` / `12345678`, bcryptjs 12 rondes), de gezinsruimte "Familie Demo", de zes MVP-challenges, 4 challenge-inzendingen met albumitems, 7 slaap- en 4 groei-invoeren en 4 losse albumitems. Het script is idempotent en draait met `npm run db:seed` via `tsx`. Foto's zijn placeholders van placehold.co.
