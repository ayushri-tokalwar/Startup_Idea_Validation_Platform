import { useMemo, useState } from "react";
import { IdeaCard } from "../components/IdeaCard";
import { SectionHeader } from "../components/SectionHeader";

const filters = ["All", "Healthtech", "Commerce Ops", "Proptech"];

export function ExplorePage({ ideas, onVote, onComment }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredIdeas = useMemo(() => {
    const nextIdeas =
      activeFilter === "All" ? ideas : ideas.filter((idea) => idea.category === activeFilter);
    return [...nextIdeas].sort((a, b) => b.trendScore - a.trendScore);
  }, [activeFilter, ideas]);

  return (
    <section>
      <SectionHeader
        eyebrow="Explore"
        title="A live board of startup concepts, ranked by traction and quality of signal"
        description="Browse what people are validating, where the AI sees edge, and which ideas are actually gaining support."
      />

      <div className="mb-6 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={[
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              activeFilter === filter
                ? "bg-white text-slate-950"
                : "bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-white/10",
            ].join(" ")}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredIdeas.map((idea, index) => (
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
  );
}
