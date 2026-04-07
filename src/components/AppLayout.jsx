import { NavLink } from "react-router-dom";
import { BarChart3, Flame, Lightbulb, PlusSquare } from "lucide-react";

const navigation = [
  { to: "/", label: "Overview", icon: Lightbulb },
  { to: "/explore", label: "Explore Ideas", icon: BarChart3 },
  { to: "/submit", label: "Submit Idea", icon: PlusSquare },
];

export function AppLayout({ children, metrics }) {
  return (
    <div className="mesh-overlay min-h-screen text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <header className="glass-panel sticky top-4 z-30 mb-8 rounded-[28px] border border-white/10 shadow-soft">
          <div className="flex flex-col gap-5 px-5 py-5 sm:px-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 ring-1 ring-cyan-300/20">
                <Flame className="h-6 w-6 text-cyan-300" />
              </div>
              <div>
                <p className="font-display text-xl font-bold tracking-tight">SignalStack</p>
                <p className="text-sm text-slate-400">
                  Startup idea validation with community signal and AI intelligence
                </p>
              </div>
            </div>

            <nav className="flex flex-wrap gap-2">
              {navigation.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    [
                      "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                      isActive
                        ? "bg-white text-slate-950"
                        : "bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-white/10",
                    ].join(" ")
                  }
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <MetricCard label="Ideas tracked" value={metrics.totalIdeas} caption="Live submissions" />
          <MetricCard label="Active contributors" value={metrics.activeVoters} caption="Community signal" />
          <MetricCard label="Avg. AI confidence" value={`${metrics.avgConfidence}%`} caption="Model-derived scoring" />
          <MetricCard
            label="Top signal"
            value={metrics.topIdea?.name ?? "None"}
            caption={metrics.topIdea?.tagline ?? "Waiting for traction"}
          />
        </div>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

function MetricCard({ label, value, caption }) {
  return (
    <div className="glass-panel rounded-[24px] border border-white/10 p-5 shadow-soft">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 font-display text-2xl font-bold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{caption}</p>
    </div>
  );
}
