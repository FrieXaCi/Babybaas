import type { ComponentProps } from "react";
import { UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  /** Volledige naam; daaruit komen de initialen ("Baby Baas" → "BB"). */
  name: string;
  /** Profielfoto; zonder foto (of als die niet laadt) verschijnen de initialen. */
  image?: string | null;
  size?: ComponentProps<typeof Avatar>["size"];
  className?: string;
};

/** Herbruikbare avatar: foto als die er is, anders initialen of een icoon. */
export function UserAvatar({ name, image, size, className }: UserAvatarProps) {
  const initials = getInitials(name);

  return (
    <Avatar size={size} className={cn("border-2 border-ink after:hidden", className)}>
      {image && <AvatarImage src={image} alt="" />}
      <AvatarFallback className="bg-teal font-heading text-ink">
        {initials || <UserRound aria-hidden className="size-1/2" />}
      </AvatarFallback>
    </Avatar>
  );
}
