import { useState } from "react";

const activityFeed = [
  "Repository loaded and project context mapped",
  "Folder structure and entry points inspected",
  "Architecture summary generated from key files",
  "Run instructions and setup notes extracted",
];

const navItems = [
  { label: "Dashboard", id: "dashboard", icon: "DB" },
  { label: "Editor", id: "editor", icon: "ED" },
  { label: "Analysis", id: "analysis", icon: "AN" },
  { label: "Terminal", id: "terminal", icon: "TR" },
  { label: "History", id: "history", icon: "HS" },
];

const stackItems = [
  "TypeScript",
  "React 18",
  "Next.js",
  "TailwindCSS",
  "GraphQL",
  "Prisma",
  "Docker",
  "Node.js",
];

const structureItems = [
  "src/",
  "components/",
  "hooks/",
  "app.tsx",
  "services/",
  "auth-service.ts",
  "compute.ts",
  "public/",
  "package.json",
  "tsconfig.json",
];

function Panel({ title, subtitle, right, children, className = "" }) {
  return (
    <section
      className={`rounded-2xl border border-white/8 bg-white/[0.04] p-4 shadow-[0_14px_35px_rgba(2,6,23,0.16)] ${className}`}
    >
      {(title || subtitle || right) && (
        <div className="flex items-start justify-between gap-3">
          <div>
            {title ? <p className="text-base font-semibold text-white">{title}</p> : null}
            {subtitle ? (
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">
                {subtitle}
              </p>
            ) : null}
          </div>
          {right}
        </div>
      )}
      <div className={title || subtitle || right ? "mt-4" : ""}>{children}</div>
    </section>
  );
}

function SidebarButton({ item, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
        active
          ? "border border-cyan-300/20 bg-cyan-400/10 text-cyan-200"
          : "border border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-semibold ${
          active ? "bg-cyan-300/15 text-cyan-200" : "bg-white/5 text-slate-500"
        }`}
      >
        {item.icon}
      </span>
      <span>{item.label}</span>
    </button>
  );
}

function DashboardPage({
  repo,
  result,
  sections,
  loading,
  error,
  onBack,
  onAnalyze,
}) {
  const [activeTab, setActiveTab] = useState("dashboard");

  const visibleSections =
    sections.length > 0
      ? sections
      : [
          {
            id: "placeholder",
            title: "Analysis pending",
            body: "Run the repository analysis from the landing page or from the left rail to populate this dashboard with architecture, flow, and setup details.",
          },
        ];

  const repoLabel = repo || "github.com/owner/project";
  const activeStatus = loading ? "Running" : result ? "Ready" : "Idle";
  const progress = loading ? "68%" : sections.length > 0 ? "100%" : "12%";
  const progressWidth = loading ? "w-[68%]" : sections.length > 0 ? "w-full" : "w-[12%]";

  return (
    <main className="min-h-screen bg-[#0a1020] p-3 text-slate-100 md:p-4">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-[1500px] overflow-hidden rounded-[28px] border border-cyan-300/20 bg-[#0f172a] shadow-[0_30px_120px_rgba(2,6,23,0.55)]">
        <aside className="hidden h-[calc(100vh-1.5rem)] w-[238px] flex-col border-r border-white/8 bg-[linear-gradient(180deg,_#151e35_0%,_#11182c_100%)] lg:flex lg:shrink-0">
          <div className="border-b border-white/8 px-5 py-5">
            <p className="text-lg font-semibold text-white">Project Context</p>
            <div className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>main branch</span>
            </div>
          </div>

          <div className="flex-1 px-3 py-5">
            <div className="space-y-1.5">
              {navItems.map((item) => (
                <SidebarButton
                  key={item.id}
                  item={item}
                  active={item.id === activeTab}
                  onClick={() => setActiveTab(item.id)}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={onAnalyze}
              disabled={loading}
              className="mt-10 w-full rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-cyan-300/70"
            >
              {loading ? "Refreshing..." : "Run Agent"}
            </button>
          </div>

          <div className="border-t border-white/8 px-4 py-5">
            <div className="space-y-3 text-sm text-slate-500">
              <p>Settings</p>
              <p>Docs</p>
            </div>
            <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-4">
              <p className="text-sm font-semibold text-white">Alex Chen</p>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">
                Maintainer
              </p>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-white/8 bg-[#131c34] px-4 py-3 md:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <p className="text-lg font-semibold text-white">Kinetic IDE</p>
                <div className="hidden min-w-[280px] items-center rounded-xl border border-white/8 bg-[#0c1324] px-4 py-2 text-sm text-slate-500 md:flex">
                  Search architecture...
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-400">
                <button
                  type="button"
                  onClick={onBack}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white transition hover:bg-white/10"
                >
                  Landing Page
                </button>
                <button
                  type="button"
                  className="rounded-xl bg-cyan-300 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-200"
                >
                  Deploy
                </button>
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`rounded-xl px-3 py-2 text-sm whitespace-nowrap ${
                    item.id === activeTab
                      ? "bg-cyan-400/10 text-cyan-200"
                      : "bg-white/[0.04] text-slate-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {activeTab === "dashboard" ? (
              <div className="grid grid-cols-1 gap-4 p-4 xl:grid-cols-[1.15fr_0.85fr] xl:p-5">
                <Panel
                  title="Dashboard Summary"
                  subtitle="Repository command center"
                  right={
                    <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                      Live
                    </span>
                  }
                >
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-[#10182e] p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        Repo
                      </p>
                      <p className="mt-3 text-sm font-semibold text-white">{repoLabel}</p>
                    </div>
                    <div className="rounded-2xl bg-[#10182e] p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        Status
                      </p>
                      <p className="mt-3 text-lg font-semibold text-white">{activeStatus}</p>
                    </div>
                    <div className="rounded-2xl bg-[#10182e] p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        Sections
                      </p>
                      <p className="mt-3 text-lg font-semibold text-white">
                        {sections.length || (result ? 1 : 0)}
                      </p>
                    </div>
                  </div>
                </Panel>

                <Panel title="Integrity Report" subtitle="Confidence score">
                  <p className="text-5xl font-semibold text-white">98.2</p>
                  <p className="mt-1 text-sm text-emerald-300">High confidence</p>
                  <button
                    type="button"
                    className="mt-5 w-full rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                  >
                    Generate Full Report PDF
                  </button>
                </Panel>

                <Panel title="Latest Analysis Details" className="xl:col-span-2">
                  <div className="grid gap-3 md:grid-cols-2">
                    {visibleSections.map((section, index) => (
                      <article
                        key={section.id}
                        className="rounded-xl border border-white/8 bg-[#10182e] p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-sm font-semibold text-white">
                            {section.title}
                          </h3>
                          <span className="rounded-full bg-cyan-300/10 px-2 py-1 text-[11px] font-semibold text-cyan-200">
                            0{index + 1}
                          </span>
                        </div>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                          {section.body}
                        </p>
                      </article>
                    ))}
                  </div>
                </Panel>
              </div>
            ) : null}

            {activeTab === "editor" ? (
              <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.2fr_0.8fr]">
                <section className="border-b border-white/8 bg-[#11192f] p-4 xl:border-b-0 xl:border-r xl:p-5">
                  <Panel
                    title="Project Explorer"
                    subtitle="File navigation"
                    className="bg-[#11192f] shadow-none"
                  >
                    <div className="space-y-2 text-sm text-slate-300">
                      {structureItems.map((item, index) => (
                        <div key={item + index} className="rounded-lg bg-[#10182e] px-3 py-2">
                          {item}
                        </div>
                      ))}
                    </div>
                  </Panel>
                </section>

                <section className="min-w-0 border-b border-white/8 bg-[#0d1529] p-4 xl:border-b-0 xl:border-r xl:p-5">
                  <Panel title="AgentRunner.tsx" subtitle="Editor">
                    <div className="rounded-xl border border-white/8 bg-[#0a1124] p-4 font-mono text-xs leading-6 text-slate-400">
                      <p className="text-slate-500">{'import React from "react";'}</p>
                      <p className="text-slate-500">{'import { Agent } from "@kinetic/core";'}</p>
                      <br />
                      <p className="text-cyan-300">{`const source = "${repoLabel}";`}</p>
                      <p className="text-emerald-300">{`const sections = ${sections.length || 1};`}</p>
                      <p className="text-slate-300">
                        architecture.flow =&gt; controller -&gt; service -&gt; storage;
                      </p>
                    </div>
                  </Panel>
                </section>

                <section className="min-w-0 bg-[linear-gradient(180deg,_#0d1529_0%,_#11182c_100%)] p-4 xl:p-5">
                  <Panel title="Editor Notes" subtitle="Context">
                    <p className="text-sm leading-7 text-slate-300">
                      Use this area for file insights, annotations, and implementation
                      notes tied to the active repository analysis.
                    </p>
                  </Panel>
                </section>
              </div>
            ) : null}

            {activeTab === "analysis" ? (
              <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.2fr_0.8fr]">
            <section className="border-b border-white/8 bg-[#11192f] p-4 xl:border-b-0 xl:border-r xl:p-5">
              <Panel
                title="Analysis Overview"
                subtitle="System health"
                right={
                  <span className="rounded-lg bg-emerald-400/10 px-2 py-1 text-xs font-semibold text-emerald-300">
                    +AI
                  </span>
                }
                className="bg-[#11192f] shadow-none"
              >
                <div className="rounded-2xl border border-white/8 bg-[#16213a] p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    System health
                  </p>
                  <p className="mt-3 text-4xl font-semibold text-emerald-300">98.2%</p>
                  <p className="mt-1 text-sm text-slate-400">Optimal performance</p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                      Packages
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-white">142</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                      Vulns
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-white">0</p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    Critical path mapping
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-[#0f1730] px-4 py-3 text-sm">
                      <span className="text-slate-200">auth_controller.ts</span>
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
                        Complete
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-[#0f1730] px-4 py-3 text-sm">
                      <span className="text-slate-200">schema_manager.rs</span>
                      <span className="rounded-full bg-slate-700 px-3 py-1 text-[11px] font-semibold text-slate-300">
                        Stable
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onAnalyze}
                  disabled={loading}
                  className="mt-6 w-full rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-cyan-300/70"
                >
                  {loading ? "Analyzing..." : "Run Agent"}
                </button>
              </Panel>
            </section>

            <section className="min-w-0 border-b border-white/8 bg-[#0d1529] p-4 xl:border-b-0 xl:border-r xl:p-5">
              <Panel
                title="Kinetic AI Assistant"
                subtitle="Repository expert mode"
                right={
                  <div className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                    JD
                  </div>
                }
                className="bg-[#131c34]"
              >
                <div className="space-y-4">
                  <div className="rounded-2xl bg-white/[0.04] px-4 py-4 text-sm leading-7 text-slate-200">
                    Can you explain the architecture and critical flow for this repository,
                    and highlight where high-load behavior could become a bottleneck?
                  </div>

                  <div className="rounded-2xl border border-cyan-300/10 bg-[#0e1630] p-4">
                    <p className="text-sm leading-7 text-slate-300">
                      The repository appears to use a modular service layout with a
                      central orchestration layer. Based on the analyzed files, the
                      most important behavior is likely concentrated around request
                      routing, state coordination, and service-level aggregation.
                    </p>

                    <div className="mt-4 rounded-xl border border-white/8 bg-[#0a1124] p-4 font-mono text-xs leading-6 text-slate-400">
                      <p className="text-slate-500">// High-level repo signal</p>
                      <p className="text-cyan-300">{`const source = "${repoLabel}";`}</p>
                      <p className="text-emerald-300">{`const sections = ${sections.length || 1};`}</p>
                      <p className="text-slate-300">
                        architecture.flow =&gt; controller -&gt; service -&gt; storage;
                      </p>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-slate-300">
                      To improve reliability, keep shared state lightweight, isolate
                      expensive work in services, and document the key entry points
                      for contributors.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white"
                    >
                      Generate Refactor
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white"
                    >
                      Performance Profile
                    </button>
                  </div>
                </div>
              </Panel>

              <Panel
                title="Kinetic-Core-Runtime"
                subtitle="Analysis engine v2.4"
                right={
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Live analysis
                  </span>
                }
                className="mt-5 bg-[#111931]"
              >
                <p className="text-sm text-slate-400">{repoLabel}</p>

                <div className="mt-5 rounded-2xl border border-white/8 bg-[#182238] p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold text-white">Architecture Overview</p>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                      SVG visualization
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4">
                    <div className="mx-auto w-full max-w-[240px] rounded-xl border border-white/10 bg-[#25314b] px-4 py-3 text-center text-sm text-slate-200">
                      REST/GraphQL EntryPoint
                    </div>
                    <div className="mx-auto h-8 w-px bg-white/10" />
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-xl bg-[#10182e] px-4 py-4 text-center text-sm text-slate-300">
                        OAuth2 Service
                      </div>
                      <div className="rounded-xl border border-emerald-400/20 bg-[#112336] px-4 py-4 text-center text-sm text-emerald-300">
                        Task Orchestrator
                      </div>
                      <div className="rounded-xl bg-[#10182e] px-4 py-4 text-center text-sm text-slate-300">
                        Vector Node
                      </div>
                    </div>
                    <div className="mx-auto h-8 w-px bg-white/10" />
                    <div className="mx-auto w-full max-w-[220px] rounded-xl bg-[#0b1123] px-4 py-4 text-center text-sm text-slate-200">
                      PostgreSQL Cluster
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-base font-semibold text-white">Key Features</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {[
                      "Zero-Latency Runtime",
                      "Encrypted State Management",
                      "Multi-Cloud Sync",
                      "Advanced Telemetry",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-slate-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            </section>

            <section className="min-w-0 bg-[linear-gradient(180deg,_#0d1529_0%,_#11182c_100%)] p-4 xl:p-5">
              <Panel title="Repository analysis" subtitle="Active task">
                <div className="flex items-center justify-between gap-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.8)]" />
                  <p className="text-sm font-semibold text-white">{activeStatus}</p>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-slate-500">
                    <span>Progress</span>
                    <span>{progress}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full bg-[linear-gradient(90deg,_#34d399_0%,_#67e8f9_100%)] ${progressWidth}`}
                    />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-300">
                  <div className="rounded-xl bg-[#10182e] p-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                      Sections
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {sections.length || (result ? 1 : 0)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#10182e] p-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                      Repo
                    </p>
                    <p className="mt-2 truncate text-sm font-semibold text-white">
                      {repoLabel}
                    </p>
                  </div>
                </div>
              </Panel>

              <Panel title="Tech Stack" className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {stackItems.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg bg-[#10182e] px-3 py-2 text-xs font-semibold text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    Language breakdown
                  </p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="flex h-full w-full">
                      <div className="w-[45%] bg-cyan-300" />
                      <div className="w-[30%] bg-emerald-300" />
                      <div className="w-[25%] bg-amber-300" />
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between text-xs text-slate-500">
                    <span>TS 45%</span>
                    <span>Rust 30%</span>
                    <span>CSS 25%</span>
                  </div>
                </div>
              </Panel>

              <Panel title="Project Structure" className="mt-4">
                <div className="space-y-2 text-sm text-slate-300">
                  {structureItems.map((item, index) => (
                    <div key={item + index} className="rounded-lg bg-[#10182e] px-3 py-2">
                      {item}
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="Integrity Report" className="mt-4">
                <p className="text-5xl font-semibold text-white">98.2</p>
                <p className="mt-1 text-sm text-emerald-300">High confidence</p>
                <button
                  type="button"
                  className="mt-5 w-full rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                >
                  Generate Full Report PDF
                </button>
              </Panel>

              <Panel title="Analysis Details" className="mt-4">
                <div className="space-y-3">
                  {visibleSections.slice(0, 4).map((section, index) => (
                    <article
                      key={section.id}
                      className="rounded-xl border border-white/8 bg-[#10182e] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-semibold text-white">
                          {section.title}
                        </h3>
                        <span className="rounded-full bg-cyan-300/10 px-2 py-1 text-[11px] font-semibold text-cyan-200">
                          0{index + 1}
                        </span>
                      </div>
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                        {section.body}
                      </p>
                    </article>
                  ))}
                </div>
                {error ? (
                  <div className="mt-4 rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                    {error}
                  </div>
                ) : null}
              </Panel>

              <Panel title="Agent Feed" className="mt-4">
                <div className="space-y-3 text-sm text-slate-300">
                  {activityFeed.map((item, index) => (
                    <div key={item} className="flex gap-3">
                      <span className="text-slate-500">[14:22:{18 + index}]</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Panel>
            </section>
              </div>
            ) : null}

            {activeTab === "terminal" ? (
              <div className="grid grid-cols-1 gap-4 p-4 xl:p-5">
                <Panel title="Terminal" subtitle="Agent feed and logs">
                  <div className="rounded-xl border border-white/8 bg-[#0a1124] p-4 font-mono text-xs leading-6 text-slate-400">
                    {activityFeed.map((item, index) => (
                      <div key={item} className="flex gap-3">
                        <span className="text-slate-500">[14:22:{18 + index}]</span>
                        <span>{item}</span>
                      </div>
                    ))}
                    {error ? <div className="mt-3 text-rose-300">{error}</div> : null}
                  </div>
                </Panel>
              </div>
            ) : null}

            {activeTab === "history" ? (
              <div className="grid grid-cols-1 gap-4 p-4 xl:p-5">
                <Panel title="History" subtitle="Recent actions">
                  <div className="space-y-3">
                    {activityFeed.map((item, index) => (
                      <div
                        key={item}
                        className="rounded-xl border border-white/8 bg-[#10182e] px-4 py-3 text-sm text-slate-300"
                      >
                        <span className="mr-3 text-slate-500">0{index + 1}</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;
