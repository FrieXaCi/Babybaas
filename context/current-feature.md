# Database Setup (Prisma 7 + Neon PostgreSQL)

## Status

In uitvoering

## Doelen

- Prisma ORM draait op **Prisma 7** (CLI én client) en is gekoppeld aan de Neon PostgreSQL ontwikkel-branch via `DATABASE_URL`.
- `prisma/schema.prisma` bevat het MVP-datamodel uit `context/project-details.md`: `User`, `Family`, `FamilyMember`, `Challenge`, `ChallengeEntry`, `SleepEntry`, `GrowthEntry`, `AlbumItem` en de enums `FamilyRole`, `ChallengeEntryType`, `AlbumItemType`.
- De standaard NextAuth-modellen (`Account`, `Session`, `User`, `VerificationToken`) zijn geïntegreerd; het bestaande `User`-model is hiermee samengevoegd.
- Relaties hebben passende `onDelete: Cascade`-regels en indexes voor data-integriteit en veelgebruikte queries.
- Er is een eerste migratie `init_database_schema` aangemaakt met `prisma migrate dev`.
- De verbinding met de database en de gegenereerde Prisma Client zijn gevalideerd.

## Todo

- [x] Prisma-installatie controleren en dependencies gelijktrekken naar Prisma 7 (`prisma` CLI staat nu op `^8.0.0-rc.34`, `@prisma/client` op `^7.10.1`)
- [x] Benodigde Prisma 7-onderdelen voor Neon toevoegen (driver adapter) volgens de Prisma 7 upgrade guide
- [x] `prisma.config.ts` uitbreiden met schema-pad, migratiemap en datasource (`DATABASE_URL` uit `.env`)
- [x] Controleren dat `.env` de Neon `DATABASE_URL` van de ontwikkel-branch bevat (niet committen; `.env*` staat al in `.gitignore`)
- [x] `prisma/schema.prisma` schrijven: generator, datasource, enums en MVP-modellen
- [x] NextAuth-modellen toevoegen en `User` uitbreiden met `emailVerified`, `image`, `accounts` en `sessions`
- [x] Indexes en `onDelete`-regels nalopen
- [x] Migratie genereren: `npx prisma migrate dev --name init_database_schema`
- [x] `npx prisma migrate status` en Prisma Client generatie controleren
- [x] Prisma Client singleton toevoegen in `src/lib/prisma.ts` en verbinding valideren
- [x] `npm run build` uitvoeren en eventuele fouten oplossen

## Notities

- **Prisma-versie:** de spec eist uitsluitend Prisma 7. De geïnstalleerde CLI is een Prisma 8 release candidate; die moet terug naar 7 zodat CLI en client gelijk lopen.
- **Prisma 7 breaking changes:** onder andere de nieuwe `prisma-client` generator met verplichte `output`, configuratie via `prisma.config.ts` (de datasource-URL staat niet meer in het schema) en verplichte driver adapters. Volg de [Prisma 7 upgrade guide](https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7).
- **Migraties:** altijd `prisma migrate dev`, nooit `prisma db push` tenzij expliciet gevraagd.
- **Neon-branches:** `DATABASE_URL` wijst naar de ontwikkel-branch; productie is een aparte branch en wordt later met `prisma migrate deploy` bijgewerkt.
- **NextAuth:** NextAuth v5 met eenvoudige accountaanmelding. Het `password`-veld op `User` blijft (optioneel) staan voor credentials-login; wachtwoorden alleen gehasht opslaan.
- **Datamodel evolueert:** het schema in `project-details.md` is een startpunt, geen definitieve indeling.
- **Privacy:** foto's staan in Cloudflare R2; de database bewaart alleen `photoUrl`/metadata. Gezinsdata is gevoelig — geen gegevens in logs.
- Prisma 8-specifieke `skills`-configuratie en het postinstall-script `prisma skills sync` zijn verwijderd (bestaan niet in Prisma 7). De skill-bestanden in `.claude/` en `.agents/` blijven staan.
- De Prisma Client wordt gegenereerd in `src/generated/prisma` (gitignored); `postinstall` draait `prisma generate`.
- Productie-URL staat niet meer in `.env`; die is pas nodig bij uitrol met `prisma migrate deploy`.
- Spec: `context/features/database-spec.md`

## Geschiedenis

<!-- Houd dit onderdeel bijgewerkt. Oudste eerst -->
