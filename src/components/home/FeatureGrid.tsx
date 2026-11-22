import { BookHeart, Moon, ShieldCheck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
};

const FEATURES: Feature[] = [
  {
    title: "Groeidagboek",
    description: "Leg mijlpalen vast met foto's en verhalen.",
    icon: BookHeart,
    iconClassName: "bg-orange",
  },
  {
    title: "Slaap & Groei",
    description: "Houd slaap en groei bij voor meer rust en overzicht.",
    icon: Moon,
    iconClassName: "bg-teal",
  },
  {
    title: "Veilig Delen",
    description:
      "Jij bepaalt wie er meekijkt. Geen social media, maar een privé gezinshub.",
    icon: ShieldCheck,
    iconClassName: "bg-yellow",
  },
];

export function FeatureGrid() {
  return (
    <section
      aria-labelledby="features-title"
      className="border-y-4 border-ink bg-paper"
    >
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <h2 id="features-title" className="text-center text-3xl md:text-4xl">
          Alles voor jullie gezin, samen op één plek
        </h2>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {FEATURES.map(({ title, description, icon: Icon, iconClassName }) => (
            <li
              key={title}
              className="flex flex-col gap-3 rounded-[1.5rem] border-[3px] border-ink bg-cream p-6 shadow-retro"
            >
              <span
                className={cn(
                  "flex size-14 items-center justify-center rounded-full border-[3px] border-ink shadow-retro-sm",
                  iconClassName,
                )}
              >
                <Icon aria-hidden className="size-7" />
              </span>
              <h3 className="text-2xl">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
