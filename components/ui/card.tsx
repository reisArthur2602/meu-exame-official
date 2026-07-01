import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  accent?: boolean;
};

export const Card = ({ accent, className, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
        className,
      )}
      {...props}
    >
      {accent ? (
        <div className="absolute inset-y-0 left-0 w-1 bg-sky-700" />
      ) : null}
      {children}
    </div>
  );
};

export const CardHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("flex items-start justify-between gap-4", className)}
      {...props}
    />
  );
};

export const CardEyebrow = ({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p
      className={cn(
        "text-xs font-bold uppercase tracking-[0.14em] text-slate-400",
        className,
      )}
      {...props}
    />
  );
};

export const CardTitle = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      className={cn("mt-2 text-xl font-bold text-slate-900", className)}
      {...props}
    />
  );
};

export const CardDetails = ({
  className,
  ...props
}: HTMLAttributes<HTMLDListElement>) => {
  return (
    <dl
      className={cn("mt-6 border-t border-slate-100 pt-5", className)}
      {...props}
    />
  );
};

export const CardDetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-4 py-2 first:pt-0 last:pb-0">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="truncate text-sm font-semibold text-slate-800">{value}</dd>
    </div>
  );
};

export const CardFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("mt-6", className)} {...props} />;
};
