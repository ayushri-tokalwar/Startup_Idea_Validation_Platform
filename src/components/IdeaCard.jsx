import { useMemo, useState } from "react";
import { ArrowBigDown, ArrowBigUp, BrainCircuit, MessageSquare, Radar, Sparkles } from "lucide-react";

const sentimentStyles = {
  positive: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  neutral: "bg-slate-400/10 text-slate-300 ring-slate-400/20",
  negative: "bg-rose-400/10 text-rose-300 ring-rose-400/20",
};

export function IdeaCard({ idea, onVote, onComment, featured = false }) {
  const [comment, setComment] = useState("");

  const topSignals = useMemo(
    () => [
      { label: "Demand", value: idea.analysis.marketDemand },
      { label: "Defensibility", value: idea.analysis.defensibility },
      { label: "Execution", value: idea.analysis.executionFit },
    ],
    [idea.analysis],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextComment = comment.trim();

    if (!nextComment) {
      return;
    }

    onComment(idea.id, nextComment);
    setComment("");
  };

  return (
    <article
      className={[
        "glass-panel rounded-[30px] border border-white/10 p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20",
        featured ? "shadow-neon" : "",
      ].join(" ")}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
              {idea.category}
            </span>
            <span className="rounded-full bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-200">
              {idea.stage}
            </span>
            {idea.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">{idea.name}</h3>
              <p className="mt-2 max-w-2xl text-base text-slate-300">{idea.tagline}</p>
            </div>
            <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/10 px-4 py-3 text-right">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">AI verdict</p>
              <p className="mt-2 font-display text-lg font-bold text-white">{idea.analysis.verdict}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <InfoBlock title="Problem" value={idea.problem} />
            <InfoBlock title="Moat" value={idea.moat} />
            <InfoBlock title="Primary audience" value={idea.audience} />
            <InfoBlock title="Market" value={idea.market} />
          </div>
        </div>

        <aside className="w-full max-w-sm space-y-4">
          <div className="rounded-[26px] border border-white/10 bg-slate-950/30 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Signal intensity</p>
                <p className="mt-1 font-display text-3xl font-bold text-white">{idea.trendScore}</p>
              </div>
              <Radar className="h-10 w-10 text-cyan-300" />
            </div>

            <div className="mt-4 space-y-3">
              {topSignals.map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex items-center justify-between text-sm text-slate-300">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-orange-300"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[26px] border border-white/10 bg-slate-950/30 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Community pulse</p>
              <div className="flex gap-2">
                <VoteButton label="Upvote" onClick={() => onVote(idea.id, 1)} icon={ArrowBigUp} />
                <VoteButton label="Downvote" onClick={() => onVote(idea.id, -1)} icon={ArrowBigDown} />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <MiniStat icon={Sparkles} label="Votes" value={idea.votes} />
              <MiniStat icon={MessageSquare} label="Comments" value={idea.engagement.comments} />
              <MiniStat icon={BrainCircuit} label="Confidence" value={`${idea.analysis.confidence}%`} />
              <MiniStat icon={Radar} label="Contributors" value={idea.engagement.contributors} />
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[26px] border border-white/10 bg-slate-950/30 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">AI opportunity map</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <SignalList title="Expansion opportunities" items={idea.analysis.opportunities} />
            <SignalList title="Validation risks" items={idea.analysis.risks} />
          </div>
        </div>

        <div className="rounded-[26px] border border-white/10 bg-slate-950/30 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">Feedback loop</p>
            <span className="text-sm text-slate-500">Founder: {idea.founder}</span>
          </div>

          <div className="mt-4 space-y-3">
            {idea.comments.slice(0, 3).map((entry) => (
              <div key={entry.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{entry.author}</p>
                    <p className="text-sm text-slate-400">{entry.role}</p>
                  </div>
                  <span
                    className={[
                      "rounded-full px-3 py-1 text-xs font-semibold ring-1",
                      sentimentStyles[entry.sentiment],
                    ].join(" ")}
                  >
                    {entry.sentiment}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{entry.body}</p>
              </div>
            ))}
          </div>

          <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Add practical feedback for the founder..."
              className="min-h-24 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-950 transition hover:scale-[1.01]"
            >
              Publish feedback
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}

function VoteButton({ label, onClick, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-200 ring-1 ring-white/10 transition hover:bg-white/15"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
        <Icon className="h-4 w-4 text-cyan-300" />
      </div>
      <p className="mt-3 font-display text-xl font-bold text-white">{value}</p>
    </div>
  );
}

function SignalList({ title, items }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
        {items.map((item) => (
          <li key={item} className="rounded-xl bg-slate-950/50 px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoBlock({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{title}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{value}</p>
    </div>
  );
}
