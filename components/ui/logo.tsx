import { FileHeart } from "lucide-react";

import { cn } from "@/lib/utils";

const MARK_SIZES = {
  sm: "size-10",
  md: "size-11",
  lg: "size-12",
  xl: "size-16",
};

const ICON_SIZES = {
  sm: "size-5",
  md: "size-6",
  lg: "size-7",
  xl: "size-8",
};

type LogoProps = {
  size?: keyof typeof MARK_SIZES;
  inverted?: boolean;
  showWordmark?: boolean;
  subtitle?: string;
  subtitleClassName?: string;
  className?: string;
};

export const Logo = ({
  size = "md",
  inverted = false,
  showWordmark = true,
  subtitle,
  subtitleClassName,
  className,
}: LogoProps) => {
  return (
    <span className="inline-flex items-center gap-3">
      <span
        className={cn(
          "relative grid place-items-center overflow-hidden rounded-2xl shadow-sm",
          MARK_SIZES[size],
          inverted
            ? "bg-white text-sky-900 shadow-xl shadow-sky-950/20"
            : "bg-sky-900 text-white",
          className,
        )}
      >
        <FileHeart
          className={ICON_SIZES[size]}
          strokeWidth={1.7}
          aria-hidden="true"
        />
        {inverted ? null : (
          <span className="absolute inset-x-0 bottom-0 h-1 bg-sky-400" />
        )}
      </span>

      {showWordmark ? (
        <span>
          <span
            className={cn(
              "block font-extrabold tracking-tight",
              inverted ? "text-xl text-white" : "text-lg text-sky-900",
            )}
          >
            MeuLaudo
          </span>
          {subtitle ? (
            <span
              className={cn(
                "block text-xs font-medium",
                inverted ? "text-sky-200" : "text-slate-500",
                subtitleClassName,
              )}
            >
              {subtitle}
            </span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
};
