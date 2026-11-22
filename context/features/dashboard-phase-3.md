# Huidige Feature: Dashboard Fase 3 - Filters, Zoeken & Acties

## Status
**Gepland**

## Context & Doel
In deze fase maken we de interactie in het dashboard compleet. De focus ligt op het functioneel maken van de zoekbalk, het implementeren van de filter-chips en het toevoegen van actieknoppen aan de content-kaarten. De interface moet levendig en intuïtief aanvoelen, passend bij de Babybaas stijl.

## Benodigdheden & Taken

### 1. Zoekfunctionaliteit
- [ ] Implementeer een werkende zoekbalk in de header.
- [ ] Logica voor het filteren van de `mock-data` op basis van de ingevoerde tekst (zoeken op titel en tags).
- [ ] 'Empty state' weergave wanneer er geen zoekresultaten zijn.

### 2. Interactieve Filter-Chips
- [ ] Maak de filter-chips onder de zoekbalk interactief.
- [ ] Statussen: `Active` (gekleurd) en `Inactive` (neutraal/omlijnd).
- [ ] Implementeer meervoudige filtering (bijv. "Challenges" + "Video").
- [ ] Visuele feedback (subtiele animatie/transitie) bij het selecteren van een filter.

### 3. Kaart Acties & Interactie
- [ ] Voeg interactieve elementen toe aan de content-kaarten:
    - Favoriet-knop (Hartje icoon met toggle-status).
    - Status-indicator (bijv. "Nieuw", "Bezig", "Voltooid").
- [ ] Hover-effecten: De kaarten moeten subtiel reageren op de cursor (bijv. lichte schaduwvergroting).
- [ ] Klik-afhandeling: Bij het klikken op een kaart moet er een actie getriggerd worden (voor nu een `console.log` of simpele alert als placeholder voor de detailpagina).

### 4. Animatie & Afwerking
- [ ] Voeg 'framer-motion' (of vergelijkbaar) transities toe aan de grid-items wanneer de filters wijzigen.
- [ ] Zorg dat de overgang tussen verschillende filter-states vloeiend verloopt (geen harde verspringing van de layout).

### 5. Data Verfijning
- [ ] Breid de `mock-data.ts` uit met extra velden voor filters (categorieën, tags, favoriet-status).
- [ ] Zorg voor voldoende testdata om de filters en zoekbalk goed te kunnen testen.

## Definitie van Klaar (DoD)
- [ ] De zoekbalk filtert de resultaten in realtime (of na een korte debounce).
- [ ] De filter-chips werken en tonen de juiste actieve status.
- [ ] Kaarten reageren visueel op gebruikersinteractie (hover/click).
- [ ] De favoriet-knop slaat de status (lokaal) op.
- [ ] Geen visuele glitches bij het herschikken van de grid.
- [ ] Code voldoet aan `coding-standards.md`.

## Aantekeningen voor Claude
- Gebruik state management (bijv. React `useState` of een eenvoudige context) voor de filters en zoekterm.
- Focus op de "juicy" feel: de knoppen en chips moeten uitnodigend zijn om op te klikken.
- Houd de mobiele ervaring in gedachten; zorg dat filters op kleine schermen scrollbaar blijven.