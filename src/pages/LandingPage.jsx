import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ArrowRight, BrainCircuit, MessageSquareText, Sparkles, TrendingUp } from "lucide-react";
import { IdeaCard } from "../components/IdeaCard";
import { SectionHeader } from "../components/SectionHeader";
import { TrendBoard } from "../components/TrendBoard";

export function LandingPage({ ideas, metrics, onVote, onComment }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-item]",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
        },
      );
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <div className="space-y-8">
      <section ref={heroRef} className="section-divider overflow-hidden rounded-[34px] border border-white/10 bg-slate-950/30 px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <div data-hero-item className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 ring-1 ring-cyan-300/15">
              <Sparkles className="h-4 w-4" />
              Product-grade validation for startup founders
            </div>

            <div data-hero-item>
              <h1 className="max-w-3xl font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Find the startup ideas worth building before you burn time building them.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                SignalStack blends founder submissions, community conviction, and AI-based analysis into a living
                platform for surfacing demand, risks, and breakout opportunities.
              </p>
            </div>

            <div data-hero-item className="flex flex-wrap gap-3">
              <Link
                to="/submit"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:scale-[1.01]"
              >
                Submit an idea
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 rounded-full bg-white/5 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/10 transition hover:bg-white/10"
              >
                Explore trend board
              </Link>
            </div>

            <div data-hero-item className="grid gap-4 sm:grid-cols-3">
              <FeaturePill icon={BrainCircuit} title="AI analysis" text="Scored demand, moat, and execution fit." />
              <FeaturePill icon={MessageSquareText} title="Community feedback" text="Founders get honest validation loops." />
              <FeaturePill icon={TrendingUp} title="Trend dashboard" text="See what ideas are gaining real momentum." />
            </div>
          </div>

          <div data-hero-item className="glass-panel rounded-[32px] border border-white/10 p-6 shadow-neon">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Validation snapshot</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <HeroMetric label="Ideas today" value={metrics.totalIdeas} />
              <HeroMetric label="Top confidence" value={`${metrics.topIdea?.analysis.confidence ?? 0}%`} />
              <HeroMetric label="Contributors" value={metrics.activeVoters} />
              <HeroMetric label="Momentum leader" value={metrics.topIdea?.name ?? "None"} />
            </div>

            <div className="mt-6 rounded-[28px] border border-white/10 bg-slate-950/40 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Breakout pattern</p>
                  <p className="mt-1 font-display text-2xl font-bold text-white">Utility-first, niche-first</p>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm font-semibold text-emerald-300">
                  Growing signal
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                The best-performing ideas solve operational pain for a clearly defined buyer, then layer in network or
                data advantages over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrendBoard ideas={ideas} />

      <section className="py-8">
        <SectionHeader
          eyebrow="Featured ideas"
          title="Founders are testing sharper, less obvious startup bets"
          description="Each idea blends founder context, AI scoring, and discussion from operators, builders, and investors."
          action={
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/10"
            >
              View all ideas
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="space-y-6">
          {ideas.slice(0, 2).map((idea, index) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onVote={onVote}
              onComment={onComment}
              featured={index === 0}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function FeaturePill({ icon: Icon, title, text }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <Icon className="h-5 w-5 text-cyan-300" />
      <p className="mt-4 font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm text-slate-400">{text}</p>
    </div>
  );
}

function HeroMetric({ label, value }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
