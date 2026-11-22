"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { CATEGORY_BY_ID, STATUS_LABELS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { ContentItem, ContentStatus } from "@/types/dashboard";

const STATUS_CLASSES: Record<ContentStatus, string> = {
  new: "bg-orange",
  in_progress: "bg-yellow",
  done: "bg-teal",
};

const DATE_FORMAT = new Intl.DateTimeFormat("nl-NL", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

type ContentCardProps = {
  item: ContentItem;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpen: () => void;
  /** Afbeelding direct laden (kaart staat boven de vouw). */
  eager?: boolean;
};

export function ContentCard({
  item,
  isFavorite,
  onToggleFavorite,
  onOpen,
  eager = false,
}: ContentCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border-[3px] border-ink bg-paper shadow-retro transition-[translate,box-shadow] duration-200 ease-out focus-within:-translate-y-1 focus-within:shadow-retro-lg hover:-translate-y-1 hover:shadow-retro-lg active:translate-y-0 active:shadow-retro-sm">
      <CardHeader item={item} eager={eager} />
      <CardBody item={item} onOpen={onOpen} />
      <FavoriteButton
        title={item.title}
        active={isFavorite}
        onToggle={onToggleFavorite}
      />
    </article>
  );
}

function CardBody({ item, onOpen }: { item: ContentItem; onOpen: () => void }) {
  return (
    <div className="flex flex-1 flex-col gap-2 p-4">
      <p className="text-xs font-extrabold tracking-widest text-muted-foreground uppercase">
        {CATEGORY_BY_ID[item.category].label}
      </p>
      <h3 className="text-xl leading-tight">
        {/* Knop over de hele kaart; de favoriet-knop ligt erboven. */}
        <button
          type="button"
          onClick={onOpen}
          className="text-left outline-none after:absolute after:inset-0 after:rounded-[1.25rem] focus-visible:after:ring-3 focus-visible:after:ring-ring/60"
        >
          {item.title}
        </button>
      </h3>
      <p className="line-clamp-2 text-sm text-muted-foreground">
        {item.description}
      </p>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-1" aria-label="Tags">
        {item.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold"
          >
            #{tag}
          </li>
        ))}
      </ul>
      <CardFooter item={item} />
    </div>
  );
}

function CardFooter({ item }: { item: ContentItem }) {
  return (
    <div className="flex items-center justify-between pt-1 text-xs font-bold">
      <time dateTime={item.date} className="text-muted-foreground">
        {DATE_FORMAT.format(new Date(item.date))}
      </time>
      <span
        className={cn(
          "rounded-full border-2 border-ink px-2 py-0.5",
          STATUS_CLASSES[item.status],
        )}
      >
        {STATUS_LABELS[item.status]}
      </span>
    </div>
  );
}

function CardHeader({ item, eager }: { item: ContentItem; eager: boolean }) {
  const category = CATEGORY_BY_ID[item.category];
  const Icon = category.icon;

  return (
    <div
      className={cn(
        "relative h-32 shrink-0 overflow-hidden border-b-[3px] border-ink",
        !item.imageUrl && category.activeClassName,
      )}
    >
      {/* Aparte laag: tailwind-merge zou `bg-dots` en de kleur als conflict zien. */}
      {!item.imageUrl && <div aria-hidden className="absolute inset-0 bg-dots" />}
      {item.imageUrl ? (
        <Image
          src={item.imageUrl}
          alt=""
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="(min-width: 1280px) 320px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="relative flex h-full items-center justify-center">
          <span className="flex size-14 items-center justify-center rounded-full border-[3px] border-ink bg-paper shadow-retro-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
            <Icon aria-hidden className="size-7" />
          </span>
        </div>
      )}
    </div>
  );
}

type FavoriteButtonProps = {
  title: string;
  active: boolean;
  onToggle: () => void;
};

function FavoriteButton({ title, active, onToggle }: FavoriteButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      aria-label={`${title} als favoriet markeren`}
      whileTap={{ scale: 0.8 }}
      className="absolute top-3 right-3 z-10 flex size-10 items-center justify-center rounded-full border-2 border-ink bg-paper shadow-retro-sm"
    >
      <motion.span
        key={active ? "on" : "off"}
        initial={{ scale: active ? 0.4 : 1 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 12 }}
        className="flex"
      >
        <Heart
          aria-hidden
          className={cn(
            "size-5 transition-colors",
            active ? "fill-orange text-orange" : "text-ink",
          )}
        />
      </motion.span>
    </motion.button>
  );
}
