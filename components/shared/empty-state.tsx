import type { ReactNode } from "react";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
};

export const EmptyState = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) => {
  return (
    <div className="px-6 py-16 text-center">
      {icon ? (
        <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-slate-100 text-slate-400">
          {icon}
        </span>
      ) : null}
      <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
      {description ? (
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
};
