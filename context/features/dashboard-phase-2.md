Auth Credentials - Email/Password Provider (Fase 2)
Overzicht
Voeg de Credentials provider toe aan BabyBaas voor e-mail/wachtwoord authenticatie inclusief registratie functionaliteit.

Vereisten
Gebruik bcryptjs voor het hashen van wachtwoorden.
Voeg het password veld toe aan het User model in schema.prisma (indien nog niet aanwezig) en voer een migratie uit.
Update auth.config.ts met de Credentials provider placeholder.
Update auth.ts om de Credentials logica te implementeren met bcrypt validatie.
Maak een registratie API route aan op /api/auth/register.
Registratie API Route
POST /api/auth/register

Input: name, email, password, confirmPassword.
Validatie: Wachtwoorden moeten matchen, e-mail moet uniek zijn.
Beveiliging: Hash het wachtwoord met bcryptjs.
Database: Maak de gebruiker aan via Prisma.
Return: Succes of foutmelding JSON.
Architectuur Notities (Split Pattern)
auth.config.ts: Voeg de Credentials provider toe met een authorize: () => null placeholder. Dit houdt de config Edge-compatible.
auth.ts: Overschrijf de Credentials provider met de daadwerkelijke authorize functie die de database raadpleegt en bcrypt gebruikt.
Testen
Test de registratie via curl of Postman:
curl -X POST http://localhost:3000/api/auth/register \
 -H "Content-Type: application/json" \
 -d '{"name":"BabyBaas Tester","email":"test@babybaas.nl","password":"password123","confirmPassword":"password123"}'
Navigeer naar /api/auth/signin.
Log in met de zojuist aangemaakte gegevens.
Controleer de redirect naar /dashboard.
