import type { SelectHTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 focus:border-sky-900 focus:ring-2 focus:ring-sky-900 focus:ring-offset-2",
          className,
        )}
        {...props}
      />
    );
  },
);

Select.displayName = "Select";
