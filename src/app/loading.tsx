export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite" className="animate-pulse">
      <div className="theme-dark bg-ink">
        <div className="mx-auto w-full max-w-7xl px-5 pt-32 pb-16 sm:px-6 lg:px-8 lg:pt-40 lg:pb-24">
          <div className="h-3 w-24 rounded bg-white/10" />
          <div className="mt-6 h-10 w-3/4 max-w-2xl rounded bg-white/10" />
          <div className="mt-3 h-10 w-1/2 max-w-md rounded bg-white/10" />
          <div className="mt-6 h-4 w-2/3 max-w-xl rounded bg-white/5" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-56 rounded-[var(--radius-card)] bg-card-2" />
          ))}
        </div>
      </div>
    </div>
  );
}
