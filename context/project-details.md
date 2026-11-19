# BabyBaas — Projectdetails

👶 **Een speelse, gedeelde plek voor ouders om challenges te doen en de kleine momenten van het gezinsleven te bewaren.**

---

## Projectdoel

BabyBaas helpt ouders om samen plezier te maken, kleine momenten vast te leggen en die automatisch terug te zien in een digitaal mini-album.

**Kernbelofte:** _Maak van de kleine chaos en overwinningen van nieuw ouderschap een spel én een herinnering._

Dit document beschrijft de uitgangspunten voor de projectaftrap en een eerste MVP. De scope is bewust beperkt, zodat de eerste versie binnen ongeveer één maand gebouwd en getest kan worden.

---

## Doelgroep

- Ouders die samen de dagelijkse momenten met hun baby willen vastleggen.
- Ouders die op een laagdrempelige, speelse manier meer met elkaar willen delen.
- Ouders die een eenvoudige tijdlijn van foto’s, notities en mijlpalen willen bijhouden.

---

## MVP-functies

### 1. Account en gezinsruimte

- Een ouder kan een account aanmaken en een gezinsruimte starten.
- De andere ouder kan deelnemen via een uitnodigingscode of link.
- Alleen leden van de gezinsruimte kunnen de bijbehorende inhoud bekijken.
- Houd de registratie eenvoudig; sociale aanmeldopties kunnen later worden toegevoegd.

### 2. Challenges

De eerste versie bevat zes vaste challenges:

- Luierkampioen
- Babytas-bingo
- Kinderwagenpitstop
- Raad het eerste woord
- Fotoprompt van de week
- Zenmoment

Ouders kunnen een challenge afronden met een foto, korte tekst of voorspelling. Een eenvoudige badge of puntenbeloning mag de ervaring speelser maken. Een ranglijst is niet nodig: BabyBaas moet samenwerking stimuleren, geen competitie tussen ouders.

### 3. Slaaplogboek

- Een ouder kan dagelijks een slaapmoment of slaapduur invoeren.
- Een invoer kan aan de betreffende ouder worden gekoppeld.
- Een korte notitie is optioneel.
- Slaapgegevens worden als logboek getoond; BabyBaas geeft geen medisch advies.

### 4. Groeilogboek

- Ouders kunnen handmatig een meetmoment toevoegen met datum, lengte en gewicht.
- Ingevoerde gegevens zijn zichtbaar in het gezinslogboek.
- BabyBaas doet geen medische interpretaties of gezondheidsclaims.

### 5. Mini-album

- Een chronologische tijdlijn bundelt challenge-inzendingen, foto’s, notities en mijlpalen.
- Ouders kunnen eigen items verwijderen.
- Foto’s kunnen worden gedownload.
- Albumexport en printservice vallen buiten de eerste versie.

---

## Buiten scope voor de MVP

- AI-beeldbewerking of beeldgeneratie
- Pushmeldingen en uitgebreide statistieken
- Publieke profielen, vriendenfeeds of ranglijsten
- Print-on-demand fotoalbums
- Een uitgebreide bibliotheek met spelletjes
- Medische adviezen of automatische interpretatie van slaap- en groeigegevens

---

## Voorlopige technische stack

De stack sluit aan bij de bestaande projectbasis. De precieze keuzes kunnen tijdens de technische aftrap worden bevestigd.

| Onderdeel          | Keuze                                                 |
| :----------------- | :---------------------------------------------------- |
| Framework          | Next.js met React 19                                  |
| Programmeertaal    | TypeScript                                            |
| Database           | Neon PostgreSQL                                       |
| ORM                | Prisma                                                |
| Cache              | Redis, optioneel                                      |
| Bestandsopslag     | Cloudflare R2 voor foto’s                             |
| CSS en componenten | Tailwind CSS v4 en shadcn/ui                          |
| Authenticatie      | NextAuth v5; eenvoudige accountaanmelding voor de MVP |
| Hosting            | Vercel, voorlopig uitgangspunt                        |
| Monitoring         | Sentry in een latere fase                             |

**Opmerking:** AI-functionaliteit zit niet in de MVP. Daardoor is er voor de eerste versie geen AI-provider nodig.

---

## Voorlopig Prisma-datamodel

Dit schema is een startpunt voor de MVP, geen definitieve database-indeling. Het maakt onderscheid tussen gebruikers, gezinsruimtes, challenges, logboekinvoer en albumitems.

```prisma
enum FamilyRole {
  OWNER
  MEMBER
}

enum ChallengeEntryType {
  TEXT
  PHOTO
  PREDICTION
}

enum AlbumItemType {
  CHALLENGE
  PHOTO
  NOTE
  MILESTONE
}

model User {
  id               String         @id @default(cuid())
  email            String         @unique
  name             String?
  password         String?
  familyMemberships FamilyMember[]
  challengeEntries ChallengeEntry[]
  sleepEntries     SleepEntry[]
  growthEntries    GrowthEntry[]
  albumItems       AlbumItem[]    @relation("AlbumItemCreator")
  createdAt        DateTime       @default(now())
  updatedAt        DateTime       @updatedAt
}

model Family {
  id          String         @id @default(cuid())
  name        String?
  inviteCode  String         @unique
  members     FamilyMember[]
  challenges  Challenge[]
  sleepEntries SleepEntry[]
  growthEntries GrowthEntry[]
  albumItems  AlbumItem[]
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
}

model FamilyMember {
  userId   String
  familyId String
  role     FamilyRole @default(MEMBER)
  joinedAt DateTime   @default(now())

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  family Family @relation(fields: [familyId], references: [id], onDelete: Cascade)

  @@id([userId, familyId])
}

model Challenge {
  id          String           @id @default(cuid())
  title       String
  description String?
  isActive    Boolean          @default(true)
  familyId    String?
  family      Family?          @relation(fields: [familyId], references: [id], onDelete: Cascade)
  entries     ChallengeEntry[]
  createdAt   DateTime         @default(now())

  @@index([familyId, isActive])
}

model ChallengeEntry {
  id          String             @id @default(cuid())
  challengeId String
  userId      String
  entryType   ChallengeEntryType
  text        String?
  photoUrl    String?
  completedAt DateTime           @default(now())

  challenge Challenge @relation(fields: [challengeId], references: [id], onDelete: Cascade)
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  albumItem AlbumItem?

  @@index([userId, completedAt])
}

model SleepEntry {
  id        String   @id @default(cuid())
  familyId  String
  userId    String
  date      DateTime
  hours     Float?
  note      String?
  createdAt DateTime @default(now())

  family Family @relation(fields: [familyId], references: [id], onDelete: Cascade)
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([familyId, date])
}

model GrowthEntry {
  id        String   @id @default(cuid())
  familyId  String
  date      DateTime
  heightCm  Float?
  weightKg  Float?
  note      String?
  createdAt DateTime @default(now())

  family Family @relation(fields: [familyId], references: [id], onDelete: Cascade)

  @@index([familyId, date])
}

model AlbumItem {
  id                String        @id @default(cuid())
  familyId          String
  createdById       String
  type              AlbumItemType
  title             String?
  text              String?
  photoUrl          String?
  occurredAt        DateTime      @default(now())
  challengeEntryId  String?       @unique
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt

  family         Family          @relation(fields: [familyId], references: [id], onDelete: Cascade)
  createdBy      User            @relation("AlbumItemCreator", fields: [createdById], references: [id], onDelete: Cascade)
  challengeEntry ChallengeEntry? @relation(fields: [challengeEntryId], references: [id], onDelete: SetNull)

  @@index([familyId, occurredAt])
}
```

### Datamodel-notities

- Foto’s worden in Cloudflare R2 opgeslagen; de database bevat alleen de bestandsverwijzing en relevante metadata.
- Een challenge kan standaard voor alle gezinnen beschikbaar zijn. `familyId` maakt daarnaast ruimte voor challenges die specifiek bij een gezin horen.
- `AlbumItem` vormt de gezamenlijke tijdlijn. Challenge-inzendingen kunnen eraan worden gekoppeld; losse notities of mijlpalen kunnen rechtstreeks als albumitem worden opgeslagen.
- Slaap- en groeigegevens zijn apart opgeslagen, zodat ze later overzichtelijk als logboek kunnen worden getoond.
- Toegangscontrole moet steeds controleren of de ingelogde gebruiker lid is van het betreffende gezin.

---

## Schermen en gebruikersroute

De belangrijkste route voor de MVP:

1. Een ouder maakt een account aan.
2. De ouder start een gezinsruimte en nodigt de andere ouder uit.
3. Een ouder kiest een challenge en rondt die af met tekst, voorspelling of foto.
4. Een ouder voegt eventueel een slaap- of groeimoment toe.
5. De gezinsruimte toont de bewaarde momenten in het mini-album.

Belangrijke schermen:

- Aanmelden en inloggen
- Gezinsruimte aanmaken of deelnemen
- Overzicht met challenges
- Challenge afronden
- Slaap- en groeilogboek
- Mini-album
- Instellingen en beheer van gezinsleden

---

## Privacy en gegevensbescherming

BabyBaas verwerkt persoonlijke gezinsinformatie en mogelijk foto’s van een kind. Privacy is daarom een uitgangspunt van het ontwerp.

- Gezinsgegevens en foto’s zijn alleen toegankelijk voor leden van de betreffende gezinsruimte.
- Controleer autorisatie aan de serverzijde, niet alleen in de interface.
- Geef gebruikers een duidelijke manier om eigen inhoud te verwijderen.
- Bewaar alleen gegevens die nodig zijn voor de MVP.
- Gebruik geen foto’s of logboekgegevens voor publieke profielen of feeds.
- Maak vóór een pilot duidelijk welke gegevens worden opgeslagen en hoe verwijderen werkt.

---

## Planning voor vier weken

| Week | Focus                              | Beoogd resultaat                                             |
| :--- | :--------------------------------- | :----------------------------------------------------------- |
| 1    | Scope, ontwerp en technische basis | Datamodel, projectstructuur en eerste schermen               |
| 2    | Gezinsruimte en challenges         | Ouders kunnen deelnemen, challenges bekijken en afronden     |
| 3    | Logboeken en mini-album            | Slaap en groei invoeren; momenten verschijnen in de tijdlijn |
| 4    | Testen, privacy en oplevering      | Geteste MVP, foutafhandeling en kleine pilot                 |

Reserveer de laatste dagen voor testen en reparaties. Voeg geen nieuwe functies toe zodra de kernroute werkt.

---

## MVP is geslaagd wanneer

Een ouder kan:

- een gezinsruimte starten en de andere ouder uitnodigen;
- een challenge bekijken en afronden;
- een slaap- of groeimoment invoeren;
- bewaarde momenten terugzien in een chronologisch mini-album;
- eigen inhoud verwijderen.

**Belangrijkste meetpunt:** keren ouders binnen een week terug om opnieuw een moment vast te leggen?

---

## Latere mogelijkheden

Pas na feedback op de MVP kunnen deze mogelijkheden worden onderzocht:

- albumexport of een printservice;
- pushmeldingen;
- extra challenges en badges;
- uitgebreidere statistieken;
- AI-ondersteuning;
- andere vormen van delen binnen het gezin.

🏗️ **BabyBaas — Samen spelen, momenten bewaren.**
