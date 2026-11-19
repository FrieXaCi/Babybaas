# Huidige feature

<!-- Naam van de feature -->

## Status

<!-- Niet gestart | In uitvoering | Voltooid -->

Niet gestart

## Doelen

<!-- Doelen en vereisten -->

## Todo

<!-- checklist van de implementatiestappen -->

## Notities

<!-- Eventuele aanvullende opmerkingen -->

## Geschiedenis

<!-- Houd dit onderdeel bijgewerkt. Oudste eerst -->

- **2026-11-19 — Database Setup (Prisma 7 + Neon PostgreSQL)**: Prisma CLI en client op 7.10.1 met `@prisma/adapter-neon`. `prisma.config.ts` leest `DATABASE_URL` (Neon ontwikkel-branch). Schema bevat het MVP-datamodel (User, Family, FamilyMember, Challenge, ChallengeEntry, SleepEntry, GrowthEntry, AlbumItem) plus de NextAuth-modellen, met indexes en cascade-regels. Eerste migratie `init_database_schema` toegepast; gedeelde client in `src/lib/prisma.ts`.
