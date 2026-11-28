Actie: Load (Laden)
Deze actie wordt gebruikt om een nieuwe feature, bugfix of specificatie in de BabyBaas workflow te laden.

Controleer $ARGUMENTS (na "load"):

Bestandsnaam: Als het één woord is zonder spaties (bijv. auth-setup-phase-1), zoek dan naar de bijbehorende specificatie in de context-mappen.
Beschrijving: Als het meerdere woorden zijn, behandel dit dan als een directe instructie voor een nieuwe feature.
Foutmelding: Indien er geen argumenten zijn, antwoord met: "De load actie vereist een bestandsnaam of een duidelijke feature-beschrijving."
Werk current-feature.md bij:

Titel: Update de H1 naar: # Huidige Feature: [Naam van de Feature].
Doelen: Formuleer heldere, resultaatgerichte doelen onder ## Doelen.
Todo Lijst: Maak een gedetailleerde checklist (- [ ]) met technische stappen onder ## Todo. Zorg dat deze stappen voldoen aan de BabyBaas coding standards.
Notities: Voeg relevante context, API-endpoints of design-richtlijnen toe onder ## Notities.
Status: Zet de status bovenaan het document op Status: In uitvoering.
Bevestiging:

Meld aan de gebruiker dat de feature succesvol is geladen in current-feature.md.
Geef een korte samenvatting van de eerste drie belangrijkste stappen.
BabyBaas Specifiek:

Controleer of de feature invloed heeft op de "soft-play" UI esthetiek.
Zorg dat eventuele database wijzigingen via Prisma migraties (npx prisma migrate dev) worden voorbereid.
