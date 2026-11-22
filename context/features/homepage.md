# Feature: Homepage & Authenticatie Setup (Fase 1)

## Status
- **Status:** In uitvoering
- **Prioriteit:** Hoog
- **Bestanden:** `src/app/page.tsx`, `src/components/ui/`, `public/images/hero-babybaas.png`

## Beschrijving
Het opzetten van de publieke homepage van BabyBaas. De focus ligt op een uitnodigende uitstraling (soft-play/pastel stijl) die ouders direct aanspreekt. De pagina bevat een duidelijke waardepropositie en navigatie naar de login/registratie flow.

## Requirements

### 1. Visuele Identiteit & Hero Image
- **STAP 1 (Eerst uitvoeren):** Genereer een hero-afbeelding via een AI image generator.
- **Prompt Richtlijn:** "Een vrolijke, veilige en moderne baby-omgeving in pastelkleuren (mintgroen, zachtgeel, babyblauw). Stijl: 3D render of zachte illustratie passend bij een premium baby-app. Focus op verbinding en rust, geen drukke elementen."
- **Actie:** Presenteer de prompt en de gegenereerde afbeelding aan de gebruiker voor goedkeuring voordat je doorgaat met de code.
- **Opslaan:** Sla de definitieve afbeelding op als `public/images/hero-babybaas.png`.

### 2. Homepage Content (`src/app/page.tsx`)
- **Hero Sectie:**
    - **Titel:** "BabyBaas: Alles over jouw kleintje op één veilige plek."
    - **Subtitel:** "Leg elk kostbaar moment vast, houd slaap en voeding bij, en deel de groei van je baby veilig met de mensen die je liefhebt."
    - **Call to Action (CTA):** Twee prominente knoppen:
        - `Aanmelden` (Primair - geaccentueerd)
        - `Inloggen` (Secundair - outline/subtiel)
- **Korte Beschrijving (Features grid):**
    - **Groeidagboek:** Leg mijlpalen vast met foto's en verhalen.
    - **Slaap & Voeding:** Houd ritmes bij voor meer rust en regelmaat.
    - **Veilig Delen:** Jij bepaalt wie er meekijkt. Geen social media, maar een privé gezinshub.

### 3. Styling (Tailwind CSS v4)
- Gebruik de `soft-play` kleuren gedefinieerd in de `coding-standards.md`.
- Mobile-first: De knoppen moeten op mobiel onder elkaar staan en op desktop naast elkaar.
- Gebruik `next/image` voor de hero-afbeelding met de juiste aspect ratio.

## Technische Instructies voor Claude
1.  **Update `current-feature.md`**: Vervang de inhoud door dit document.
2.  **Maak de Assets**: Genereer de hero-afbeelding en vraag expliciet om goedkeuring van de gebruiker.
3.  **Implementeer Page**: Pas na goedkeuring van de afbeelding, schrijf de code voor `src/app/page.tsx`. Zorg dat de knoppen linken naar `/auth/register` en `/auth/login`.
4.  **Componenten**: Gebruik bestaande UI-componenten (zoals `Button`) of maak nieuwe in `src/components/ui/` die voldoen aan de BabyBaas stijl.
5.  **Validatie**: Voer de `code-scanner-babybaas-nl` uit op de nieuwe pagina.