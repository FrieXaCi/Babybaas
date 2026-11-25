Feature Specificatie: Auth UI - Inloggen, Registreren & Logout (Fase 3)
Overzicht
Vervang de standaard NextAuth-pagina's door een op maat gemaakte UI die volledig aansluit bij de BabyBaas "soft-play" esthetiek (warme kleuren, ronde vormen). Update daarnaast de sidebar met de actuele gebruikersinformatie en een functioneel gebruikersmenu.

Vereisten

1. Inlogpagina (/auth/login)
   Velden: E-mailadres en wachtwoord.
   Stijl: Gebruik de BabyBaas UI-stijl (afgeronde kaarten, zachte schaduwen).
   Functionaliteit:
   Formulier validatie (client-side).
   Foutmeldingen bij onjuiste inloggegevens.
   Link naar de registratiepagina.
2. Registratiepagina (/auth/register)
   Velden: Naam, E-mailadres, Wachtwoord, Bevestig Wachtwoord.
   Functionaliteit:
   Validatie: Wachtwoorden moeten overeenkomen, e-mailformaat check.
   Versturen naar de bestaande /api/auth/register endpoint.
   Redirect naar de inlogpagina na succesvolle registratie.
3. Sidebar Gebruikerssectie (Onderaan)
   Weergave: Toon de naam van de ingelogde gebruiker.
   Interactie:
   Klik op het icoon/avatar leidt naar /profile.
   Dropdown/Up menu bij klik op de avatar met de optie "Uitloggen".
   Avatar Logica:
   Indien een afbeelding beschikbaar is: toon afbeelding.
   Anders: Genereer initialen op basis van de naam (bijv. "Baby Baas" → "BB").
   Maak hiervoor een herbruikbaar UserAvatar component.
   Technische Richtlijnen (BabyBaas)
   Context: Gebruik useSession voor client-side checks en auth() voor server-side componenten.
   Design: Implementeer de "soft-play" retro stijl (geen harde zwarte kleuren, gebruik de warme paletten uit de dashboard specs).
   Navigatie: Zorg dat de login/register pagina's niet de volledige dashboard-layout bevatten (gebruik een aparte auth-layout).
   Testplan
   Toegang: Navigeer naar /auth/login en controleer of de custom UI rendert in plaats van de standaard NextAuth pagina.
   Flow: Log in met een bestaand account en controleer de redirect naar het dashboard.
   Menu: Klik op de avatar in de sidebar, open het menu en klik op "Uitloggen". Controleer of de sessie wordt beëindigd.
   Registratie: Maak een nieuw account aan via /auth/register en verifieer de database-entry via Prisma Studio.
