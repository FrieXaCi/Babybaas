# Richtlijnen voor AI-interactie

## Communicatie

- Wees beknopt en direct.
- Licht niet voor de hand liggende keuzes kort toe.
- Vraag toestemming voordat je grote refactors of architectuurwijzigingen uitvoert.
- Voeg geen functies toe die niet in de projectspecificatie staan.
- Verwijder nooit bestanden zonder eerst om verduidelijking te vragen.

## Werkwijze

Dit is de vaste werkwijze voor elke feature of bugfix:

1. **Documenteren** — Beschrijf de feature in `@context/current-feature.md`.
2. **Branch aanmaken** — Maak een nieuwe branch aan voor de feature, bugfix enzovoort.
3. **Implementeren** — Implementeer de feature of bugfix die in `@context/current-feature.md` is beschreven.
4. **Testen** — Controleer of alles werkt in de browser. Unit-tests voegen we later toe. Voer `npm run build` uit en los eventuele fouten op.
5. **Bijstellen** — Pas de implementatie aan waar nodig.
6. **Committen** — Commit pas nadat de build slaagt en alles werkt.
7. **Mergen** — Merge de branch naar `main`.
8. **Branch verwijderen** — Verwijder de branch na het mergen.
9. **Reviewen** — Controleer AI-gegenereerde code regelmatig en op verzoek.
10. **Afronden** — Markeer de feature als voltooid in `@context/current-feature.md` en voeg deze toe aan de geschiedenis.

Commit **niet** zonder toestemming en voordat de build slaagt. Als de build mislukt, los de fouten dan eerst op.

## Branches

Maak voor elke feature of bugfix een nieuwe branch aan. Gebruik bijvoorbeeld de naamgeving `feature/[feature]` of `fix/[bugfix]`. Vraag toestemming om de branch te verwijderen nadat deze is gemerged.

## Commits

- Vraag toestemming voordat je een commit maakt; commit niet automatisch.
- Gebruik Conventional Commits, zoals `feat:`, `fix:` en `chore:`.
- Houd commits gericht: één feature of bugfix per commit.
- Gebruik nooit de tekst `Generated With Claude` in commitberichten.

## Als je vastloopt

- Stop en leg het probleem uit als iets na 2 à 3 pogingen nog niet werkt.
- Blijf niet willekeurig oplossingen uitproberen.
- Vraag om verduidelijking als de vereisten niet duidelijk zijn.

## Codewijzigingen

- Voer alleen de minimale wijzigingen uit die nodig zijn voor de opdracht.
- Refactor geen niet-gerelateerde code, tenzij daar expliciet om wordt gevraagd.
- Voeg geen extra functies toe die alleen handig zouden kunnen zijn.
- Volg de bestaande patronen in de codebase.

## Code review

Controleer AI-gegenereerde code regelmatig, met speciale aandacht voor:

- **Beveiliging** — Controles op autorisatie en validatie van invoer.
- **Prestaties** — Onnodige re-renders en N+1-query’s.
- **Logische fouten** — Randgevallen.
- **Patronen** — Sluit de code aan bij de bestaande codebase?
