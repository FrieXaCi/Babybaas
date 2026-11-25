Gebruikersauthenticatie - Master Specificatie (BabyBaas)
Overzicht
Implementatie van NextAuth.js v5 (Auth.js) met de credentials provider (e-mail/wachtwoord) binnen de BabyBaas architectuur.

Vereisten

1. Installatie & Schema
   Installeer de laatste versie van NextAuth (v5 beta).
   Voeg de vereiste NextAuth modellen toe aan het Prisma schema (Account, Session, VerificationToken).
   Configureer de Prisma adapter voor NextAuth v5.
2. Registratie & Inloggen
   Voeg de Credentials provider toe voor e-mail/wachtwoord login.
   Maak een registratiepagina met velden voor: naam, e-mail, wachtwoord en bevestig wachtwoord.
   Hash wachtwoorden met bcryptjs tijdens de registratie voordat ze in de database worden opgeslagen.
3. Beveiliging & UI
   Voeg middleware toe om dashboard-routes (/dashboard/\*) te beveiligen.
   Leid niet-ingelogde gebruikers automatisch om naar de inlogpagina.
   Toon de avatar en naam van de gebruiker in de TopBar.
   Voeg een "Uitloggen" link toe aan het dropdown-menu van de gebruikersavatar.
   Architectuur Richtlijnen (Next.js 15 + Prisma 7 Edge)
   Vanwege de compatibiliteit met Edge-functies en Prisma 7, hanteren we het split auth config pattern. Dit voorkomt runtime errors in de middleware.

Bestandsstructuur
src/lib/auth.config.ts (Base Config)

Bevat providers, JWT session instellingen en callbacks (inclusief authorized voor routebeveiliging).
Geen Prisma imports hier.
De Credentials provider bevat hier een authorize: () => null placeholder.
src/lib/auth.ts (Main Auth)

Breidt authConfig uit.
Voegt de PrismaAdapter toe.
Overschrijft de Credentials provider met de daadwerkelijke bcrypt validatielogica.
src/middleware.ts (Edge-compatible Middleware)

Importeert alleen vanuit auth.config.ts.
Gebruik: export default NextAuth(authConfig).auth.
Belangrijke Commando's
Gebruik voor database wijzigingen altijd migraties, nooit db push:

npx prisma migrate dev --name add-auth-models
Referenties
Edge compatibility: https://authjs.dev/getting-started/installation#edge-compatibility
Prisma adapter: https://authjs.dev/getting-started/adapters/prisma
