type ExamsSummaryProps = {
  total: number;
  available: number;
  withError: number;
};

export const ExamsSummary = ({
  total,
  available,
  withError,
}: ExamsSummaryProps) => {
  return (
    <section
      className="mt-8 grid gap-4 sm:grid-cols-3"
      aria-label="Resumo dos exames"
    >
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
          Total
        </p>
        <p className="mt-3 text-3xl font-extrabold text-sky-900">{total}</p>
      </article>

      <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
          Disponíveis
        </p>
        <p className="mt-3 text-3xl font-extrabold text-emerald-700">
          {available}
        </p>
      </article>

      <article className="rounded-2xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-rose-700">
          Com erro
        </p>
        <p className="mt-3 text-3xl font-extrabold text-rose-700">
          {withError}
        </p>
      </article>
    </section>
  );
};
