# Huidige feature

Seed mock-data

## Status

<!-- Niet gestart | In uitvoering | Voltooid -->

In uitvoering

## Doelen

- Een seed script in `prisma/seed.ts` dat de database vult met demo-data voor ontwikkeling en demo's.
- Specificaties volgen `context/features/seed-data-spec.md`; structuur volgt `prisma/schema.prisma`.
- Demo-gebruiker `demo@babybaas.nl` (wachtwoord `12345678`, bcryptjs 12 rondes) en een partner in de gezinsruimte "Familie Demo".
- De zes vaste MVP-challenges, challenge-inzendingen, slaap- en groeilogs en albumitems.
- Het script is idempotent: opnieuw draaien geeft dezelfde dataset zonder duplicaten.

## Todo

- [x] Seed-spec omzetten naar het BabyBaas-datamodel
- [x] `bcryptjs` en `tsx` installeren
- [x] Seed-commando instellen in `prisma.config.ts` en `npm run db:seed` toevoegen
- [x] `prisma/seed.ts` schrijven
- [x] Seed uitvoeren tegen de Neon ontwikkel-branch en de data controleren

## Notities

- De oorspronkelijke spec beschreef een ander project (snippets, collecties, `isPro`). Die is herschreven voor BabyBaas.
- Foto's gebruiken placeholder-URL's van placehold.co, omdat R2 nog niet is ingericht.
- Het script verwijdert eerst de demo-gebruikers, de demo-gezinsruimte (via `inviteCode`) en de algemene challenges met dezelfde titels; cascade-regels ruimen gekoppelde data op.

## Geschiedenis

<!-- Houd dit onderdeel bijgewerkt. Oudste eerst -->

- **2026-11-19 — Database Setup (Prisma 7 + Neon PostgreSQL)**: Prisma CLI en client op 7.10.1 met `@prisma/adapter-neon`. `prisma.config.ts` leest `DATABASE_URL` (Neon ontwikkel-branch). Schema bevat het MVP-datamodel (User, Family, FamilyMember, Challenge, ChallengeEntry, SleepEntry, GrowthEntry, AlbumItem) plus de NextAuth-modellen, met indexes en cascade-regels. Eerste migratie `init_database_schema` toegepast; gedeelde client in `src/lib/prisma.ts`.
