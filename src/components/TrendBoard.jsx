import { ArrowUpRight, Flame, Layers3, ScanSearch } from "lucide-react";

export function TrendBoard({ ideas }) {
  const sortedIdeas = [...ideas].sort((a, b) => b.trendScore - a.trendScore).slice(0, 4);

  return (
    <section className="section-divider py-8">
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[30px] border border-white/10 p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Trend radar</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">What the community is amplifying</h3>
            </div>
            <div className="rounded-full bg-orange-400/10 p-3 text-orange-200">
              <Flame className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {sortedIdeas.map((idea, index) => (
              <div key={idea.id} className="rounded-[24px] border border-white/10 bg-slate-950/30 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Rank #{index + 1}</p>
                    <p className="mt-1 font-display text-xl font-bold text-white">{idea.name}</p>
                    <p className="mt-1 text-sm text-slate-400">{idea.tagline}</p>
                  </div>
                  <div className="min-w-36">
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                      <span>Trend score</span>
                      <span>{idea.trendScore}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-orange-300 via-cyan-300 to-cyan-100"
                        style={{ width: `${idea.trendScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <InsightCard
            icon={Layers3}
            title="Validation stack"
            value="Community + AI + trend visibility"
            description="Ideas are scored across market pull, defensibility, and execution fit, then enriched with open feedback."
          />
          <InsightCard
            icon={ScanSearch}
            title="Pattern watch"
            value="Healthcare, vertical SaaS, and ops tools lead"
            description="The strongest submissions pair an urgent workflow pain with a clear buyer and measurable ROI."
          />
          <InsightCard
            icon={ArrowUpRight}
            title="Launch advice"
            value="Start narrow, then widen distribution"
            description="Top-performing concepts explain exactly who buys first and what proof convinces them to keep paying."
          />
        </div>
      </div>
    </section>
  );
}

function InsightCard({ icon: Icon, title, value, description }) {
  return (
    <div className="glass-panel rounded-[30px] border border-white/10 p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.22em] text-slate-500">{title}</p>
        <Icon className="h-5 w-5 text-cyan-300" />
      </div>
      <h4 className="mt-4 font-display text-2xl font-bold text-white">{value}</h4>
      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}
