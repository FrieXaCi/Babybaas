Auth Setup - NextAuth v5 (Credentials Provider)
Overzicht
Stel NextAuth v5 in met de Prisma adapter voor Babybaas. Gebruik de standaard NextAuth pagina's voor initiële testen en zorg voor een architectuur die klaar is voor de toekomst (edge-compatible split config).

Let op: In tegenstelling tot de bron-specificatie gebruiken we voor Babybaas geen GitHub Provider, maar uitsluitend de Credentials Provider (e-mail/wachtwoord).

Vereisten
Installeer NextAuth v5 (next-auth@beta) en @auth/prisma-adapter.
Gebruik het split auth config patroon voor maximale compatibiliteit.
Beveilig /dashboard/\* routes middels middleware.ts (Next.js 15+ standaard).
Redirect niet-ingelogde gebruikers automatisch naar de sign-in pagina.
Bestanden om aan te maken
src/auth.config.ts: Edge-compatible configuratie (bevat enkel de providers en basis logica, geen adapter).
src/auth.ts: Volledige configuratie inclusief de Prisma adapter en JWT-strategie.
src/app/api/auth/[...nextauth]/route.ts: Exporteer de handlers vanuit auth.ts.
src/middleware.ts: Routebescherming en redirect logica (vervangt proxy.ts voor standaard Next.js implementatie).
src/types/next-auth.d.ts: Breid het Session type uit met user.id en user.role indien nodig.
Belangrijke aandachtspunten (Babybaas Standaard)
Gebruik altijd next-auth@beta (v5).
Gebruik de Credentials Provider: implementeer de authorize functie om gebruikers te valideren tegen de database (gebruik bcrypt voor wachtwoordverificatie).
Gebruik session: { strategy: 'jwt' } in de split config.
Gebruik voorlopig de standaard NextAuth pagina's (pages niet definiëren in de config) om de flow te testen voordat de custom UI wordt gebouwd.
Gebruik npx prisma migrate dev voor database wijzigingen, niet db push.
Referenties
Edge compatibility: https://authjs.dev/getting-started/installation#edge-compatibility
Prisma adapter: https://authjs.dev/getting-started/adapters/prisma
Credentials provider: https://authjs.dev/getting-started/providers/credentials
