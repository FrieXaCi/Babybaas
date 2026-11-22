# Seed Data Specificatie

## Overzicht

Maak een seed script (`prisma/seed.ts`) om de database te vullen met voorbeelddata voor ontwikkeling en demo's binnen het BabyBaas platform. De data volgt het datamodel in `prisma/schema.prisma`.

Het script is idempotent: bij elke run worden de demo-gebruikers en het demo-gezin (met hun gegevens) eerst verwijderd en daarna opnieuw aangemaakt. De algemene challenges worden nooit verwijderd maar aangemaakt of bijgewerkt, omdat inzendingen van andere gezinnen eraan kunnen hangen. Datums worden relatief aan "nu" berekend, zodat de demo altijd actueel oogt.

### Veiligheid

- Het script weigert te draaien als `NODE_ENV` `production` is.
- Het script weigert te draaien als de database andere gebruikers bevat dan de demo-accounts. Bewust overschrijven kan met `SEED_FORCE=true`.
- Het wachtwoord wordt niet gelogd.

## Vereisten

### Gebruikers (User)

| E-mail                   | Naam           | Rol in gezin |
| ------------------------ | -------------- | ------------ |
| demo@babybaas.nl         | Demo Gebruiker | OWNER        |
| partner@babybaas.nl      | Demo Partner   | MEMBER       |

- **Wachtwoord:** 12345678 (hash met bcryptjs, 12 rondes)
- **emailVerified:** huidige datum

### Gezinsruimte (Family)

- **Naam:** Familie Demo
- **Uitnodigingscode:** DEMO2026
- Beide gebruikers zijn lid (zie rollen hierboven)

### Challenges (algemeen, `familyId: null`)

De zes vaste MVP-challenges, allemaal `isActive: true`:

| Titel                   | Beschrijving                                                        |
| ----------------------- | ------------------------------------------------------------------- |
| Luierkampioen           | Wissel een luier in recordtijd en vertel hoe het ging.              |
| Babytas-bingo           | Pak de babytas in zonder iets te vergeten.                          |
| Kinderwagenpitstop      | Klap de kinderwagen in en uit. Wie is het snelst?                   |
| Raad het eerste woord   | Voorspel welk woord je kindje als eerste zegt.                      |
| Fotoprompt van de week  | Maak een foto die past bij de prompt van deze week.                 |
| Zenmoment               | Neem vijf minuten rust voor jezelf en deel hoe dat voelde.          |

### Challenge-inzendingen (ChallengeEntry)

4 inzendingen, verdeeld over beide ouders, met elk type minstens één keer:

- Luierkampioen — TEXT (Demo Gebruiker)
- Raad het eerste woord — PREDICTION (Demo Gebruiker)
- Raad het eerste woord — PREDICTION (Demo Partner)
- Fotoprompt van de week — PHOTO (Demo Partner)

Elke inzending krijgt een gekoppeld albumitem van type `CHALLENGE`.

### Slaaplogboek (SleepEntry)

- 7 invoeren, één per dag voor de afgelopen 7 dagen
- Afwisselend ingevoerd door beide ouders
- Uren tussen 9 en 14, een paar met een korte notitie

### Groeilogboek (GrowthEntry)

- 4 meetmomenten, ongeveer één per maand (geboorte tot nu)
- Oplopende lengte (cm) en gewicht (kg) met realistische waarden
- Alleen gegevens, geen medische interpretatie in notities

### Mini-album (AlbumItem)

Naast de 4 challenge-albumitems:

- 1 `MILESTONE` (bijv. "Eerste glimlach")
- 1 `MILESTONE` (bijv. "Voor het eerst omgerold")
- 1 `NOTE` (korte notitie van een ouder)
- 1 `PHOTO` (losse foto)

### Foto's

Er is nog geen Cloudflare R2-opslag. Gebruik placeholder-URL's van `https://placehold.co/` voor `photoUrl`. Gebruik geen echte foto's van kinderen.
