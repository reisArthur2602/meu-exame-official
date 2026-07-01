import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-sm transition focus-visible:ring-2 focus-visible:ring-offset-2 active:translate-y-px disabled:cursor-not-allowed disabled:pointer-events-none disabled:shadow-none disabled:active:translate-y-0";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-sky-900 text-white hover:bg-sky-800 focus-visible:ring-sky-900 disabled:bg-slate-200 disabled:text-slate-400",
  secondary:
    "border border-slate-300 bg-white text-slate-700 hover:border-sky-700 hover:text-sky-900 focus-visible:ring-sky-900 disabled:border-slate-200 disabled:bg-slate-200 disabled:text-slate-400",
  danger:
    "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-600 disabled:bg-slate-200 disabled:text-slate-400",
};

export const Button = ({
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    />
  );
};
