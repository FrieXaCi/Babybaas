import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import {
  AlbumItemType,
  ChallengeEntryType,
  FamilyRole,
  PrismaClient,
} from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is niet ingesteld");
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

const DEMO_PASSWORD = "12345678";
const BCRYPT_ROUNDS = 12;
const DEMO_INVITE_CODE = "DEMO2026";

const DEMO_USERS = {
  owner: { email: "demo@babybaas.nl", name: "Demo Gebruiker" },
  partner: { email: "partner@babybaas.nl", name: "Demo Partner" },
} as const;

const CHALLENGES = [
  {
    title: "Luierkampioen",
    description: "Wissel een luier in recordtijd en vertel hoe het ging.",
  },
  {
    title: "Babytas-bingo",
    description: "Pak de babytas in zonder iets te vergeten.",
  },
  {
    title: "Kinderwagenpitstop",
    description: "Klap de kinderwagen in en uit. Wie is het snelst?",
  },
  {
    title: "Raad het eerste woord",
    description: "Voorspel welk woord je kindje als eerste zegt.",
  },
  {
    title: "Fotoprompt van de week",
    description: "Maak een foto die past bij de prompt van deze week.",
  },
  {
    title: "Zenmoment",
    description: "Neem vijf minuten rust voor jezelf en deel hoe dat voelde.",
  },
] as const;

type ChallengeTitle = (typeof CHALLENGES)[number]["title"];

type DemoContext = {
  familyId: string;
  ownerId: string;
  partnerId: string;
};

function daysAgo(days: number, hour = 12): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hour, 0, 0, 0);
  return date;
}

function placeholderPhoto(text: string): string {
  return `https://placehold.co/800x600/fde68a/78350f?text=${encodeURIComponent(text)}`;
}

async function clearDemoData() {
  await prisma.user.deleteMany({
    where: { email: { in: Object.values(DEMO_USERS).map((u) => u.email) } },
  });
  await prisma.family.deleteMany({ where: { inviteCode: DEMO_INVITE_CODE } });
  await prisma.challenge.deleteMany({
    where: { familyId: null, title: { in: CHALLENGES.map((c) => c.title) } },
  });
}

async function seedUsersAndFamily(): Promise<DemoContext> {
  const password = await bcrypt.hash(DEMO_PASSWORD, BCRYPT_ROUNDS);
  const emailVerified = new Date();

  const owner = await prisma.user.create({
    data: { ...DEMO_USERS.owner, password, emailVerified },
  });
  const partner = await prisma.user.create({
    data: { ...DEMO_USERS.partner, password, emailVerified },
  });

  const family = await prisma.family.create({
    data: {
      name: "Familie Demo",
      inviteCode: DEMO_INVITE_CODE,
      members: {
        create: [
          { userId: owner.id, role: FamilyRole.OWNER, joinedAt: daysAgo(120) },
          { userId: partner.id, role: FamilyRole.MEMBER, joinedAt: daysAgo(119) },
        ],
      },
    },
  });

  return { familyId: family.id, ownerId: owner.id, partnerId: partner.id };
}

async function seedChallenges(): Promise<Map<ChallengeTitle, string>> {
  const ids = new Map<ChallengeTitle, string>();
  for (const challenge of CHALLENGES) {
    const created = await prisma.challenge.create({ data: { ...challenge } });
    ids.set(challenge.title, created.id);
  }
  return ids;
}

async function seedChallengeEntries(
  ctx: DemoContext,
  challengeIds: Map<ChallengeTitle, string>,
) {
  const entries: {
    challenge: ChallengeTitle;
    userId: string;
    entryType: ChallengeEntryType;
    text?: string;
    photoUrl?: string;
    completedAt: Date;
  }[] = [
    {
      challenge: "Luierkampioen",
      userId: ctx.ownerId,
      entryType: ChallengeEntryType.TEXT,
      text: "In 47 seconden! Wel een tweede romper nodig gehad.",
      completedAt: daysAgo(12, 8),
    },
    {
      challenge: "Raad het eerste woord",
      userId: ctx.ownerId,
      entryType: ChallengeEntryType.PREDICTION,
      text: "Papa",
      completedAt: daysAgo(9, 20),
    },
    {
      challenge: "Raad het eerste woord",
      userId: ctx.partnerId,
      entryType: ChallengeEntryType.PREDICTION,
      text: "Mama, natuurlijk",
      completedAt: daysAgo(9, 21),
    },
    {
      challenge: "Fotoprompt van de week",
      userId: ctx.partnerId,
      entryType: ChallengeEntryType.PHOTO,
      text: "Prompt: iets geels",
      photoUrl: placeholderPhoto("Iets geels"),
      completedAt: daysAgo(3, 15),
    },
  ];

  for (const { challenge, ...entry } of entries) {
    const challengeId = challengeIds.get(challenge);
    if (!challengeId) throw new Error(`Challenge ontbreekt: ${challenge}`);

    await prisma.challengeEntry.create({
      data: {
        ...entry,
        challengeId,
        albumItem: {
          create: {
            familyId: ctx.familyId,
            createdById: entry.userId,
            type: AlbumItemType.CHALLENGE,
            title: challenge,
            text: entry.text,
            photoUrl: entry.photoUrl,
            occurredAt: entry.completedAt,
          },
        },
      },
    });
  }

  return entries.length;
}

async function seedSleepEntries(ctx: DemoContext) {
  const hours = [11.5, 10, 12.5, 9, 13, 11, 14];
  const notes: (string | undefined)[] = [
    undefined,
    "Twee keer wakker geweest",
    undefined,
    "Onrustige nacht",
    undefined,
    undefined,
    "Lang uitgeslapen!",
  ];

  const { count } = await prisma.sleepEntry.createMany({
    data: hours.map((h, i) => ({
      familyId: ctx.familyId,
      userId: i % 2 === 0 ? ctx.ownerId : ctx.partnerId,
      date: daysAgo(7 - i, 7),
      hours: h,
      note: notes[i],
    })),
  });
  return count;
}

async function seedGrowthEntries(ctx: DemoContext) {
  const { count } = await prisma.growthEntry.createMany({
    data: [
      { daysBack: 120, heightCm: 50, weightKg: 3.4, note: "Geboorte" },
      { daysBack: 90, heightCm: 54.5, weightKg: 4.5 },
      { daysBack: 60, heightCm: 58, weightKg: 5.6 },
      { daysBack: 30, heightCm: 61, weightKg: 6.4, note: "Consultatiebureau" },
    ].map(({ daysBack, ...entry }) => ({
      ...entry,
      familyId: ctx.familyId,
      date: daysAgo(daysBack, 10),
    })),
  });
  return count;
}

async function seedAlbumItems(ctx: DemoContext) {
  const { count } = await prisma.albumItem.createMany({
    data: [
      {
        familyId: ctx.familyId,
        createdById: ctx.ownerId,
        type: AlbumItemType.MILESTONE,
        title: "Eerste glimlach",
        text: "Tijdens het voeden, ineens die grote glimlach.",
        occurredAt: daysAgo(80, 9),
      },
      {
        familyId: ctx.familyId,
        createdById: ctx.partnerId,
        type: AlbumItemType.MILESTONE,
        title: "Voor het eerst omgerold",
        occurredAt: daysAgo(20, 16),
      },
      {
        familyId: ctx.familyId,
        createdById: ctx.partnerId,
        type: AlbumItemType.NOTE,
        title: "Eerste wandeling met z'n drieën",
        text: "Rondje door het park, de hele weg geslapen.",
        occurredAt: daysAgo(100, 14),
      },
      {
        familyId: ctx.familyId,
        createdById: ctx.ownerId,
        type: AlbumItemType.PHOTO,
        title: "Bij opa en oma",
        photoUrl: placeholderPhoto("Bij opa en oma"),
        occurredAt: daysAgo(45, 13),
      },
    ],
  });
  return count;
}

async function main() {
  console.log("Demo-data opruimen...");
  await clearDemoData();

  const ctx = await seedUsersAndFamily();
  console.log("Gebruikers en gezinsruimte aangemaakt");

  const challengeIds = await seedChallenges();
  console.log(`${challengeIds.size} challenges aangemaakt`);

  const entryCount = await seedChallengeEntries(ctx, challengeIds);
  console.log(`${entryCount} challenge-inzendingen aangemaakt (met albumitem)`);

  console.log(`${await seedSleepEntries(ctx)} slaapinvoeren aangemaakt`);
  console.log(`${await seedGrowthEntries(ctx)} groei-invoeren aangemaakt`);
  console.log(`${await seedAlbumItems(ctx)} losse albumitems aangemaakt`);

  console.log(`Klaar. Inloggen met ${DEMO_USERS.owner.email} / ${DEMO_PASSWORD}`);
}

main()
  .catch((error: unknown) => {
    console.error("Seed mislukt:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
