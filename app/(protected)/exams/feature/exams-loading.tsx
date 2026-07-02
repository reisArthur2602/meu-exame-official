export const ExamsLoading = () => {
    return (
        <>
            <section className="mt-8 grid gap-4 sm:grid-cols-3" aria-hidden="true">
                {['total', 'available', 'error'].map((key) => (
                    <div
                        key={key}
                        className="h-24 animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
                    />
                ))}
            </section>

            <section
                className="mt-6 h-96 animate-pulse rounded-3xl border border-slate-200 bg-slate-100"
                aria-hidden="true"
            />
        </>
    );
};
