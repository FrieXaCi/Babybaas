# Specificatie: Dashboard UI Phase 1 (Layout & Thema)

## Status
In uitvoering (Gekoppeld aan current-feature)

## Overzicht
Dit is de eerste fase van de dashboard-implementatie voor BabyBaas. In deze fase leggen we de visuele en technische basis die aansluit bij de speelse, retro-stijl van de applicatie zoals te zien in het prototype (hoofdscherm).

## Vereisten voor Phase 1

### 1. Project Initialisatie & Thema
- **ShadCN UI & Tailwind v4:** Initialisatie van de componentenbibliotheek conform de `coding-standards.md`.
- **Thema (Visual Design):** 
    - Implementeer het kleurenpalet uit het prototype:
        - Achtergrond: Warm beige/crème (met subtiele grid-dot overlay indien mogelijk).
        - Accentkleuren: Oranje (`#f17829`), Teal/Turquoise, en Geel.
    - **Geen Dark Mode:** De applicatie gebruikt uitsluitend het lichte "soft-play" thema. Verwijder of deactiveer standaard dark-mode configuraties om visuele consistentie te waarborgen.
- **Typografie:** Gebruik van een speels, afgerond font voor koppen (zoals in het logo) en een goed leesbaar sans-serif font voor bodytekst.

### 2. Layout Structuur
- **Route:** Dashboard bereikbaar op `/dashboard`.
- **Main Layout:** 
    - Een responsive container die de "app-in-app" look van het prototype nabootst (afgeronde hoeken, dikke zwarte randen/outlines).
    - **Top Bar:** Bevat de branding (BabyBaas logo/hartje), een zoekfunctie (placeholder) en een "Nieuw item" knop.
    - **Sidebar Placeholder:** Een gereserveerde ruimte aan de linkerzijde (desktop) met een tijdelijke `h2` "Navigatie".
    - **Content Area Placeholder:** Centrale ruimte voor de widgets met een tijdelijke `h2` "Overzicht".

### 3. Globale Elementen
- **Bottom Navigation (Mobile):** Omdat BabyBaas mobile-first is, moet de layout rekening houden met een tab-bar onderaan voor snelle acties (Challenges, Logboek, Album).

## Referenties
- `user_input_hoofdscherm-image-16` (Visuele stijl & kleuren)
- `project-details.md` (MVP functies)
- `coding-standards.md` (Technische afspraken)
- `user_input_dashboard-phase-2-spec-document-18` (Vervolgstappen)
