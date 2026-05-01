const sampleRepos = [
  {
    name: "shadcn-ui/ui",
    category: "Interface",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS.",
    language: "TypeScript",
  },
  {
    name: "langchain-ai/langchain",
    category: "Systems",
    description: "Frameworks and tooling for building LLM-powered applications.",
    language: "Python",
  },
  {
    name: "supabase/supabase",
    category: "Platform",
    description: "The open source Firebase alternative for modern product teams.",
    language: "TypeScript",
  },
];

const featureCards = [
  {
    title: "Structural Mapping",
    description:
      "See folders, modules, and dependencies grouped into a readable system view.",
    accent: "bg-emerald-400",
  },
  {
    title: "AI Documentation",
    description:
      "Generate crisp explanations for setup, architecture, and important logic paths.",
    accent: "bg-sky-400",
  },
  {
    title: "Stack Intelligence",
    description:
      "Recognize frameworks, data layers, APIs, and engineering patterns at a glance.",
    accent: "bg-cyan-300",
  },
];

const proofPoints = [
  "Live repo structure breakdown",
  "Architecture summary in seconds",
  "Setup notes for new contributors",
];

function LandingPage({
  repo,
  setRepo,
  result,
  error,
  loading,
  onAnalyze,
  onOpenDashboard,
}) {
  return (
    <main className="min-h-screen bg-[#09111f] text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.10),_transparent_28%),linear-gradient(180deg,_#0b1323_0%,_#09101d_100%)]" />

      <section className="mx-auto max-w-[1280px] px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,_rgba(12,23,43,0.98)_0%,_rgba(10,19,35,0.98)_100%)] shadow-[0_40px_120px_rgba(3,8,20,0.45)]">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/6 px-5 py-4 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Repo Lens
              </div>
              <nav className="hidden gap-6 text-sm text-slate-400 md:flex">
                <a href="#trending" className="transition hover:text-white">
                  Trending
                </a>
                <a href="#features" className="transition hover:text-white">
                  Features
                </a>
                <a href="#results" className="transition hover:text-white">
                  Results
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-xs uppercase tracking-[0.25em] text-slate-500 sm:block">
                AI repo analysis
              </span>
              {result ? (
                <button
                  type="button"
                  onClick={onOpenDashboard}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Dashboard
                </button>
              ) : null}
              <button
                type="button"
                className="rounded-xl border border-cyan-300/30 bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_10px_40px_rgba(103,232,249,0.25)] transition hover:bg-cyan-200"
              >
                Deploy
              </button>
            </div>
          </header>

          <div className="px-5 pb-10 pt-14 sm:px-8 sm:pt-20 lg:px-12">
            <section className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.9)]" />
                Decode any repository
              </div>

              <h1 className="mt-8 max-w-3xl text-balance font-serif text-4xl leading-none text-white sm:text-6xl">
                Decode any repository
                <span className="block text-slate-300">in seconds.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Paste a GitHub URL to analyze the project&apos;s architecture,
                hidden tech stack, and documentation depth with structured,
                readable output.
              </p>

              <div className="mt-10 w-full max-w-3xl rounded-[22px] border border-white/10 bg-[#091121]/90 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    id="repo-input"
                    type="text"
                    className="min-w-0 flex-1 rounded-[16px] border border-white/6 bg-transparent px-5 py-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                    placeholder="https://github.com/owner/project"
                  />
                  <button
                    type="button"
                    onClick={onAnalyze}
                    disabled={loading}
                    className="rounded-[16px] bg-emerald-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-emerald-400/60"
                  >
                    {loading ? "Analyzing..." : "Analyze"}
                  </button>
                </div>
              </div>

              {result ? (
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={onOpenDashboard}
                    className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                  >
                    Open Dashboard
                  </button>
                  <span className="text-xs uppercase tracking-[0.24em] text-emerald-300">
                    Analysis ready
                  </span>
                </div>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-[0.22em] text-slate-500">
                {proofPoints.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              {error ? (
                <div className="mt-6 w-full max-w-3xl rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-left text-sm text-rose-200">
                  {error}
                </div>
              ) : null}
            </section>

            <section id="trending" className="mt-20">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Trending Repositories
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Fresh examples you can paste directly into the analyzer.
                  </p>
                </div>
                <span className="hidden text-xs uppercase tracking-[0.22em] text-slate-500 md:block">
                  View GitHub trends
                </span>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {sampleRepos.map((sample, index) => {
                  const url = `https://github.com/${sample.name}`;

                  return (
                    <button
                      key={sample.name}
                      type="button"
                      onClick={() => setRepo(url)}
                      className="group rounded-[24px] border border-white/8 bg-white/[0.03] p-5 text-left transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.05]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/8 bg-[#101b31] text-sm font-semibold text-slate-200">
                          0{index + 1}
                        </div>
                        <span className="rounded-full border border-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-slate-400">
                          {sample.category}
                        </span>
                      </div>

                      <p className="mt-6 text-lg font-semibold text-white">
                        {sample.name}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-slate-400">
                        {sample.description}
                      </p>

                      <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
                        <span>{sample.language}</span>
                        <span className="transition group-hover:text-cyan-200">
                          Paste into analyzer
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section
              id="features"
              className="mt-20 grid gap-8 rounded-[28px] border border-white/8 bg-white/[0.025] p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8"
            >
              <div className="rounded-[24px] border border-white/8 bg-[#0c162a] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
                <div className="rounded-[20px] border border-emerald-400/10 bg-[#09111e] p-4 text-sm text-slate-300">
                  <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">
                    Scanning modules...
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl bg-white/[0.03] px-4 py-3">
                      Detecting framework, runtime, and build tooling
                    </div>
                    <div className="rounded-2xl bg-white/[0.03] px-4 py-3">
                      Mapping routes, services, and database flows
                    </div>
                    <div className="rounded-2xl bg-white/[0.03] px-4 py-3">
                      Generating contributor-friendly explanation
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-3/4 rounded-full bg-[linear-gradient(90deg,_#67e8f9_0%,_#4ade80_100%)]" />
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-500">
                      System operational
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">
                  Engineered for clarity
                </p>
                <h2 className="mt-4 max-w-md font-serif text-3xl leading-tight text-white sm:text-4xl">
                  Built to turn repo complexity into readable context.
                </h2>
                <div className="mt-8 space-y-4">
                  {featureCards.map((feature) => (
                    <div
                      key={feature.title}
                      className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4"
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={`mt-1 h-3 w-3 rounded-full ${feature.accent}`}
                        />
                        <div>
                          <p className="text-base font-semibold text-white">
                            {feature.title}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-400">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="results" className="mt-20">
              {result ? (
                <div className="rounded-[28px] border border-cyan-300/15 bg-[linear-gradient(180deg,_rgba(15,23,42,0.8)_0%,_rgba(8,14,26,0.96)_100%)] p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">
                        Latest Analysis
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">
                        Dashboard ready with repository details
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={onOpenDashboard}
                      className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                    >
                      Go To Dashboard
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,_rgba(255,255,255,0.06)_0%,_rgba(255,255,255,0.03)_100%)] px-6 py-10 text-center sm:px-10">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    Ready to skip the README?
                  </p>
                  <h3 className="mt-4 font-serif text-3xl text-white sm:text-4xl">
                    Paste a repository and get the architecture story first.
                  </h3>
                  <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                    After analysis, you will be redirected to a dedicated
                    dashboard page with the repo details, sections, and IDE-style
                    layout.
                  </p>
                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={onAnalyze}
                      className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                    >
                      Start exploring
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setRepo("https://github.com/facebook/react")
                      }
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
                    >
                      Try a sample repo
                    </button>
                  </div>
                </div>
              )}
            </section>

            <footer className="mt-16 border-t border-white/6 pt-6 text-center text-sm text-slate-500">
              <p className="font-semibold text-slate-300">Repo Lens</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-5">
                <span>Terms</span>
                <span>Privacy</span>
                <span>GitHub</span>
                <span>Twitter</span>
              </div>
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
