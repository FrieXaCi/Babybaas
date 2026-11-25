import type { ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { DashboardUser } from "@/types/dashboard";

type UserAvatarProps = {
  user: Pick<DashboardUser, "name" | "avatarUrl">;
  size?: ComponentProps<typeof Avatar>["size"];
  className?: string;
};

export function UserAvatar({ user, size, className }: UserAvatarProps) {
  return (
    <Avatar size={size} className={cn("border-2 border-ink after:hidden", className)}>
      {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt="" />}
      <AvatarFallback className="bg-teal font-heading text-ink">
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  );
}
