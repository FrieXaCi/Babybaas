# Huidige Feature: Dashboard Fase 2 - Zijbalk & Navigatie

## Status
**In uitvoering**

## Context & Doel
Het doel van deze fase is het toevoegen van de navigatiestructuur aan het dashboard. Dit omvat een responsieve zijbalk die op desktop zichtbaar is en op mobiel verandert in een 'drawer' (hamburger-menu). De stijl moet consistent zijn met de "soft-play" retro-esthetiek van de welkomstpagina (`welkom.png`).

## Benodigdheden & Taken

### 1. Layout Component Update
- [ ] Implementeer een `DashboardLayout` component die de `Sidebar` en de `MainContent` (uit Fase 1) omhult.
- [ ] Gebruik een flexbox of grid layout: zijbalk links, content rechts.
- [ ] Zorg voor een responsieve breakpoint (bijv. `< 768px`) waarbij de zijbalk verborgen wordt.

### 2. Zijbalk (Desktop)
- [ ] **Stijl**: Achtergrondkleur `#FFFBF2` (of vergelijkbaar warm wit), zachte afgeronde hoeken, en een subtiele outline/schaduw.
- [ ] **Navigatie Sectie**:
    - "Challenges" (Icoon + Tekst)
    - "Logboek" (Icoon + Tekst)
    - "Album" (Icoon + Tekst)
- [ ] **Collecties Sectie**:
    - Lijst met "Favorieten" (met iconen).
    - Lijst met "Recent bekeken".
- [ ] **Gebruikersprofiel (Onderaan)**:
    - Avatar (placeholder/mock).
    - Naam van de gebruiker.
    - Instellingen/Logout acties (optioneel, maar voorbereid).

### 3. Mobile Drawer (Mobiel)
- [ ] Voeg een "Hamburger" icoon toe aan de header (gemaakt in Fase 1).
- [ ] Implementeer een slide-over menu (Drawer) met dezelfde navigatie-items als de desktop zijbalk.
- [ ] Zorg voor een soepele transitie en een 'overlay' (backdrop) wanneer het menu open is.

### 4. Data & Types
- [ ] Gebruik de bestaande `mock-data.ts` (of breid deze uit) voor de navigatie-items en collecties.
- [ ] Definieer interfaces voor `NavigationItem` en `CollectionItem`.

### 5. Styling Richtlijnen
- [ ] Gebruik de kleuren uit de `welkom.png` referentie.
- [ ] Ronde vormen (`border-radius: 1.5rem` of hoger voor containers).
- [ ] Geen Dark Mode.

## Definitie van Klaar (DoD)
- [ ] Zijbalk is zichtbaar en functioneel op desktop.
- [ ] Hamburger-menu werkt op mobiele schermen en opent de drawer.
- [ ] Navigatie-items zijn klikbaar (ook al leiden ze nu nog naar placeholders).
- [ ] De visuele stijl matcht met de rest van de app (soft-play/retro).
- [ ] Code voldoet aan `coding-standards.md`.

## Aantekeningen voor Claude
- Werk in de feature-branch voor het dashboard.
- Update de status van de individuele taken in dit document tijdens het werken.
- Vraag om toestemming voor de finale merge.