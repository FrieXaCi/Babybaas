---
name: feature
description: Beheer de workflow van de huidige feature - laden, starten, beoordelen, uitleggen of voltooien
argument-hint: load|start|review|explain|complete
---

# Feature Workflow

Beheert de volledige levenscyclus van een feature, van specificatie tot merge.

## Werkbestand

@context/current-feature.md

### Bestandsstructuur

current-feature.md bevat de volgende secties:

- `# Huidige Feature` - H1 kop met de naam van de feature wanneer deze actief is
- `## Status` - Niet Gestart | In Uitvoering | Voltooid
- `## Doelen` - Opsommingstekens van wat succes inhoudt
- `## Todo` - Checklist van implementatiestappen (`- [ ]` / `- [x]`)
- `## Notities` - Extra context, beperkingen of details uit de specificatie
- `## Geschiedenis` - Voltooide features (alleen toevoegen)

## Taak

Voer de gevraagde actie uit: $ARGUMENTS

| Actie | Beschrijving |
|-------|--------------|
| `load` | Laad een feature-specificatie of inline beschrijving |
| `start` | Begin met de implementatie, maak een branch aan |
| `review` | Controleer of doelen zijn behaald en controleer de codekwaliteit |
| `explain` | Documenteer wat er is veranderd en waarom |
| `complete` | Commit, push, merge, reset |

Zie [actions/](actions/) voor gedetailleerde instructies.

Als er geen actie is opgegeven, leg dan de beschikbare opties uit.