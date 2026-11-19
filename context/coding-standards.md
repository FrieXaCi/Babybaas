# Codeerafspraken — BabyBaas

## Werkwijze voor elke feature

- Beschrijf de feature eerst in `@context/current-feature.md`.
- Begin pas met implementeren nadat de gebruiker de beschrijving heeft gecontroleerd en goedgekeurd.
- Werk op een aparte branch:
  - `feature/<korte-naam>` voor nieuwe functionaliteit
  - `fix/<korte-naam>` voor bugfixes
- Voer relevante tests en controles uit voordat je het werk afrondt.
- Commit of merge nooit zonder expliciete toestemming van de gebruiker.
- Pas de scope, het budget of productbesluiten niet zelfstandig aan. Leg onduidelijkheden en voorgestelde wijzigingen eerst voor.

## TypeScript

- Gebruik TypeScript in de strikte modus.
- Gebruik geen `any`. Gebruik een passend type of, als het type onbekend is, `unknown`.
- Definieer types of interfaces voor componentprops, API-antwoorden en datamodellen.
- Gebruik type-inferentie wanneer het type vanzelfsprekend is; schrijf types expliciet waar dat de code begrijpelijker of veiliger maakt.

## React

- Gebruik uitsluitend functionele componenten; geen class components.
- Gebruik hooks voor state en side-effects.
- Houd componenten gericht op één duidelijke taak.
- Haal herbruikbare logica onder in custom hooks.

## Next.js

- Gebruik standaard Server Components.
- Gebruik `'use client'` alleen wanneer dat nodig is, bijvoorbeeld voor interactie, hooks of browser-API’s.
- Gebruik Server Actions voor formulierinzendingen en eenvoudige mutaties.
- Gebruik API-routes wanneer dat nodig is voor:
  - webhooks;
  - uploads met voortgangsregistratie;
  - langdurige bewerkingen;
  - specifieke HTTP-statuscodes of headers;
  - toekomstige mobiele apps of CLI-clients;
  - integraties met externe diensten.
- Haal gegevens anders rechtstreeks op in Server Components.
- Gebruik dynamische routes voor pagina’s van afzonderlijke items of collecties.
- Controleer bij iedere gegevensbewerking of de ingelogde gebruiker bevoegd is om die gegevens te bekijken of aan te passen.

## Tailwind CSS v4

**Belangrijk:** BabyBaas gebruikt Tailwind CSS v4, als dat overeenkomt met de projectconfiguratie.

- Maak geen `tailwind.config.ts`- of `tailwind.config.js`-bestand aan. Die horen bij Tailwind CSS v3.
- Configureer het thema met CSS en de `@theme`-directive in `src/app/globals.css`.
- Gebruik CSS custom properties voor kleuren, spacing en andere themawaarden.
- Gebruik geen JavaScript-configuratie voor Tailwind.

Voorbeeld:

```css
@import "tailwindcss";

@theme {
  --color-primary: oklch(50% 0.2 250);
}
```

Controleer eerst de bestaande projectbestanden en geïnstalleerde versie voordat je configuratie aanpast.

## Bestandsindeling

Volg deze structuur als die aansluit op de bestaande repository:

- Componenten: `src/components/[feature]/ComponentName.tsx`
- Pagina’s: `src/app/[route]/page.tsx`
- Server Actions: `src/actions/[feature].ts`
- Types: `src/types/[feature].ts`
- Bibliotheken en hulpfuncties: `src/lib/[utility].ts`

Voeg geen nieuwe mappenstructuur toe als het project al een consistente structuur heeft.

## Naamgeving

- Componenten: PascalCase, bijvoorbeeld `ItemCard.tsx`.
- Bestanden: de naam van de component of kebab-case.
- Functies: camelCase.
- Constanten: SCREAMING_SNAKE_CASE.
- Types en interfaces: PascalCase, zonder prefix.

## Styling

- Gebruik Tailwind CSS voor styling, in overeenstemming met de bestaande projectconfiguratie.
- Gebruik shadcn/ui-componenten waar dat passend is en ze al deel uitmaken van het project.
- Gebruik geen inline styles, tenzij een concrete technische reden dat vereist.
- Houd rekening met toegankelijkheid en leesbaarheid op mobiel.
- Kies niet zelfstandig voor een dark-mode-first ontwerp; volg de vastgestelde BabyBaas-ontwerpkeuzes.

## Database

- Gebruik Prisma voor databasebewerkingen, als Prisma de ORM van het project is.
- Gebruik `prisma migrate dev` voor wijzigingen aan het databaseschema; gebruik hiervoor geen `db push`.
- Controleer met `prisma migrate status` of migraties overeenkomen met de database.
- Productie-uitrol moet `prisma migrate deploy` uitvoeren voordat de applicatie start.
- Neem geen schemawijzigingen op zonder de gevolgen voor bestaande gegevens te controleren en de gebruiker hierover te informeren.

## Gegevens ophalen en valideren

- Server Components halen gegevens rechtstreeks op via Prisma, als dat past bij de architectuur.
- Client Components gebruiken Server Actions voor mutaties, tenzij het project een andere afgesproken aanpak heeft.
- Valideer alle invoer met Zod of de bestaande validatieoplossing van het project.
- Vertrouw nooit alleen op validatie in de browser; valideer invoer ook aan de serverzijde.

## Privacy en beveiliging — specifiek voor BabyBaas

- Behandel gezinsgegevens, slaap- en groeilogboeken en foto’s als gevoelige, persoonlijke informatie.
- Verzamel en bewaar alleen gegevens die nodig zijn voor de afgesproken functionaliteit.
- Zorg dat gebruikers alleen gegevens van hun eigen gezin kunnen bekijken, wijzigen of verwijderen.
- Controleer autorisatie aan de serverzijde bij iedere actie op gezinsgegevens, logboeken en albums.
- Toon geen privégegevens of foto’s in openbare pagina’s, logs, foutmeldingen of analytics.
- Sla geheimen, toegangstokens en persoonlijke gegevens niet op in broncode of debuglogs.
- Gebruik veilige opslag- en uploadinstellingen voor foto’s. Maak uploads niet openbaar toegankelijk tenzij dat uitdrukkelijk is ontworpen en goedgekeurd.
- Voeg waar haalbaar een manier toe om gegevens te verwijderen of bespreek de vereiste verwijdering voordat je gegevensstructuren ontwerpt.
- Geef geen medisch advies en presenteer logboekgegevens niet als medische beoordeling.
- Bouw geen AI-fotofuncties of medische functies in, tenzij de gebruiker die later expliciet aan de scope toevoegt en de gevolgen eerst bespreekt.

## Foutafhandeling

- Gebruik `try/catch` in Server Actions waar dat passend is.
- Gebruik voor acties een consistente retourstructuur, bijvoorbeeld `{ success, data, error }`, afgestemd op de bestaande codebase.
- Toon gebruikers duidelijke, behulpzame foutmeldingen.
- Toon geen technische details, stacktraces of persoonlijke gegevens aan gebruikers.
- Gebruik toastmeldingen alleen als die al bij de interface passen.

## Codekwaliteit

- Laat geen ongebruikte imports of variabelen achter.
- Laat geen uitgecommentarieerde code achter, tenzij de gebruiker daar specifiek om vraagt.
- Houd functies waar mogelijk korter dan 50 regels. Splits ze op als dat de leesbaarheid verbetert.
- Volg de bestaande conventies van de codebase boven algemene voorkeuren uit dit document.
- Meld ontbrekende tests, onduidelijke vereisten of technische risico’s in plaats van aannames als feiten te presenteren.
