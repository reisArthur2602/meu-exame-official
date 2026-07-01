import type { LabelHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ className, ...props }: LabelProps) => {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: htmlFor is forwarded by the consumer via ...props
    <label
      className={cn("mb-2 block text-sm font-bold text-slate-700", className)}
      {...props}
    />
  );
};
