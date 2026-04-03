/**
 * Full-viewport animated placeholder while the home page preloads critical images.
 * Uses motion (aurora blobs, gradient drift, spinner, pulsing dots) — no skeleton blocks.
 */
const LandingPageLoader = () => {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Drifting gradient wash */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-coral/[0.12] via-background to-coral/[0.06] bg-[length:200%_200%] animate-loader-gradient-shift"
        aria-hidden
      />

      {/* Soft aurora orbs */}
      <div
        className="pointer-events-none absolute -left-1/4 top-1/4 h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full bg-coral/25 blur-[80px] animate-loader-aurora"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-1/4 bottom-1/4 h-[min(65vw,380px)] w-[min(65vw,380px)] rounded-full bg-rose-400/20 blur-[90px] animate-loader-aurora-slow"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(50vw,280px)] w-[min(50vw,280px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral/10 blur-[60px] animate-loader-aurora"
        style={{ animationDelay: "-4s" }}
        aria-hidden
      />

      {/* Center mark: ring + dots */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full border-[3px] border-coral/25"
            aria-hidden
          />
          <div
            className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-coral border-r-coral/70"
            style={{ animationDuration: "1.15s" }}
            aria-hidden
          />
          <div
            className="absolute inset-3 animate-spin rounded-full border-2 border-transparent border-b-coral/50 border-l-coral/30"
            style={{ animationDuration: "1.8s", animationDirection: "reverse" }}
            aria-hidden
          />
        </div>

        <div className="flex items-center gap-2.5" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-coral animate-loader-dot"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
      </div>

      <span className="sr-only">Loading page content</span>
    </div>
  );
};

export default LandingPageLoader;
