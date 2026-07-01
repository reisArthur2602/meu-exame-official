import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "error";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  warning: "bg-amber-50 text-amber-700 ring-amber-500/25",
  error: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

const dotStyles: Record<BadgeVariant, string> = {
  success: "bg-emerald-600",
  warning: "bg-amber-500 animate-pulse",
  error: "bg-rose-600",
};

export const Badge = ({
  variant = "success",
  className,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      <span className={cn("size-2 rounded-full", dotStyles[variant])} />
      {children}
    </span>
  );
};
