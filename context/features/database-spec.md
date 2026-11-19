# Database Setup Specificatie (Prisma + Neon PostgreSQL)

## Overzicht

Configureer de Prisma ORM met de Neon PostgreSQL database voor het Babybaas project.

## Vereisten

- Gebruik **Neon PostgreSQL** (serverless).
- Creëer het initiële schema gebaseerd op de datamodellen in `context/project-details.md` (let op: dit model zal evolueren).
- Integreer de standaard **NextAuth** modellen (`Account`, `Session`, `User`, `VerificationToken`).
- Voeg passende indexes en `onDelete: Cascade` regels toe waar nodig voor data-integriteit.
- **Prisma versie:** Gebruik uitsluitend **Prisma 7**. Houd rekening met de breaking changes in deze versie.

## Workflow & Migraties

- Wij werken met een **ontwikkel-branch** op Neon die gekoppeld is aan de `DATABASE_URL`.
- Er is een aparte productie-branch.
- **Belangrijk:** Creëer ALTIJD migraties (`npx prisma migrate dev`). Push nooit direct naar de database (`prisma db push`), tenzij expliciet anders gevraagd.

## Referenties

- Initiële datamodellen: `@context/project-details.md`
- Prisma 7 Upgrade Gids: [Prisma Upgrade Guide](https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7)
- Prisma Postgres Quickstart: [Quickstart Guide](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres)

## Instructies voor Uitvoering

1. Controleer de bestaande Prisma installatie en zorg dat de dependencies geüpdatet zijn naar versie 7.
2. Configureer de `.env` met de verstrekte Neon `DATABASE_URL-POOLED`.
3. Vertaal de datamodellen uit de projectdocumentatie naar een geldig `schema.prisma` bestand.
4. Genereer de eerste migratie met een duidelijke omschrijving (bijv. `init_database_schema`).
5. Valideer de verbinding en de gegenereerde Prisma Client.
