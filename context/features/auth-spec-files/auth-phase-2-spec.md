Feature: Auth Phase 2 - Email/Password Credentials
Status
Titel: Implementatie Credentials Provider (Email/Wachtwoord)
Fase: Phase 2 - Auth
Prioriteit: Hoog

Overzicht
Toevoegen van de Credentials provider aan BabyBaas voor authenticatie via e-mail en wachtwoord, inclusief een registratie-API.

Architectuur Richtlijnen
Wachtwoord Hashing: Gebruik bcryptjs voor het veilig opslaan van wachtwoorden.
Split Pattern: Houd auth.config.ts edge-compatible (placeholder) en implementeer de logica in auth.ts.
Database: Zorg dat het User model een password veld heeft.
Taken & Instructies voor Claude

1. Database Migratie
   Controleer schema.prisma. Als het User model nog geen password veld heeft, voeg dit toe: password String?.
   Voer een migratie uit of update de lokale database.
2. Auth Configuratie (Split Pattern)
   Update auth.config.ts:
   Voeg de Credentials provider toe aan de providers array.
   Gebruik een placeholder: Credentials({ authorize: () => null }).
   Update auth.ts:
   Importeer bcryptjs.
   Overschrijf de Credentials provider met de echte validatie-logica.
   Zoek de gebruiker op via e-mail, valideer het wachtwoord met bcrypt.compare().
3. Registratie API Route
   Maak app/api/auth/register/route.ts.
   Input: name, email, password, confirmPassword.
   Validatie:
   Check of alle velden aanwezig zijn.
   Check of password en confirmPassword matchen.
   Check of de gebruiker al bestaat in de database.
   Verwerking: Hash het wachtwoord en maak de gebruiker aan.
   Response: Retourneer een succesbericht of passende error status codes.
   Testing & Verificatie
   API Test (Registratie)
   Gebruik de volgende curl opdracht om een account aan te maken:

curl -X POST http://localhost:3000/api/auth/register \
 -H "Content-Type: application/json" \
 -d '{"name":"Test Gebruiker","email":"test@babybaas.nl","password":"VeiligWachtwoord123","confirmPassword":"VeiligWachtwoord123"}'
Flow Test (Login)
Navigeer naar /api/auth/signin.
Selecteer de Credentials optie.
Log in met de zojuist aangemaakte gegevens.
Verifieer dat je succesvol wordt doorgestuurd naar de /dashboard.
Referenties
Auth.js Credentials Provider: https://authjs.dev/getting-started/authentication/credentials
