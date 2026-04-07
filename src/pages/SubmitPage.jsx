import { useMemo, useState } from "react";
import { CheckCircle2, Sparkles, WandSparkles } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { buildIdeaAnalysis } from "../lib/analysis";

const initialForm = {
  name: "",
  tagline: "",
  category: "Healthtech",
  founder: "",
  market: "",
  problem: "",
  audience: "",
  moat: "",
  tagsInput: "",
};

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40";

export function SubmitPage({ onSubmitIdea }) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const previewIdea = useMemo(() => {
    const tags = form.tagsInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const baseIdea = {
      ...form,
      tags,
      tagline: form.tagline || "A sharper, validated concept is taking shape.",
      founder: form.founder || "Anonymous founder",
      market: form.market || "Undeclared market",
      problem: form.problem || "Describe the market pain to unlock AI analysis.",
      audience: form.audience || "Define the first buyer and user.",
      moat: form.moat || "Explain what becomes harder to copy over time.",
    };

    return {
      ...baseIdea,
      analysis: buildIdeaAnalysis(baseIdea),
    };
  }, [form]);

  const canSubmit =
    form.name.trim() &&
    form.tagline.trim() &&
    form.problem.trim() &&
    form.audience.trim() &&
    form.moat.trim();

  const handleChange = (field) => (event) => {
    setSubmitted(false);
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!canSubmit) {
      setSubmitted(false);
      return;
    }

    const tags = form.tagsInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    onSubmitIdea({
      name: form.name.trim(),
      tagline: form.tagline.trim(),
      category: form.category,
      founder: form.founder.trim() || "Anonymous founder",
      market: form.market.trim() || "Undeclared market",
      problem: form.problem.trim(),
      audience: form.audience.trim(),
      moat: form.moat.trim(),
      tags: tags.length ? tags : ["New"],
    });

    setForm(initialForm);
    setSubmitted(true);
  };

  return (
    <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="glass-panel rounded-[30px] border border-white/10 p-6 shadow-soft">
        <SectionHeader
          eyebrow="Submit"
          title="Turn a rough startup concept into a validation-ready signal"
          description="Fill in the strongest version of the problem, wedge, and market. The platform instantly frames the opportunity through an AI lens."
        />

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <Field label="Startup idea name">
            <input value={form.name} onChange={handleChange("name")} className={inputClassName} placeholder="Signal-worthy name" />
          </Field>

          <Field label="One-line pitch">
            <input value={form.tagline} onChange={handleChange("tagline")} className={inputClassName} placeholder="What makes this interesting?" />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Category">
              <select value={form.category} onChange={handleChange("category")} className={inputClassName}>
                <option>Healthtech</option>
                <option>Commerce Ops</option>
                <option>Proptech</option>
                <option>Future of Work</option>
                <option>Climate</option>
              </select>
            </Field>

            <Field label="Founder name">
              <input value={form.founder} onChange={handleChange("founder")} className={inputClassName} placeholder="Who is building this?" />
            </Field>
          </div>

          <Field label="Target market">
            <input value={form.market} onChange={handleChange("market")} className={inputClassName} placeholder="Where does this land first?" />
          </Field>

          <Field label="Problem">
            <textarea value={form.problem} onChange={handleChange("problem")} className={`${inputClassName} min-h-28`} placeholder="Describe the pain in a concrete way." />
          </Field>

          <Field label="Primary audience">
            <textarea value={form.audience} onChange={handleChange("audience")} className={`${inputClassName} min-h-24`} placeholder="Who feels this pain most urgently?" />
          </Field>

          <Field label="Why this wins">
            <textarea value={form.moat} onChange={handleChange("moat")} className={`${inputClassName} min-h-24`} placeholder="What gets stronger as usage grows?" />
          </Field>

          <Field label="Tags">
            <input
              value={form.tagsInput}
              onChange={handleChange("tagsInput")}
              className={inputClassName}
              placeholder="AI, SaaS, Workflow, Marketplace"
            />
          </Field>

          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-950 transition enabled:hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <WandSparkles className="h-4 w-4" />
            Submit for validation
          </button>

          {submitted ? (
            <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300 ring-1 ring-emerald-400/20">
              <CheckCircle2 className="h-4 w-4" />
              Idea submitted. It now appears in the live platform feed.
            </div>
          ) : null}
        </form>
      </div>

      <div className="glass-panel rounded-[30px] border border-white/10 p-6 shadow-neon">
        <p className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 ring-1 ring-cyan-300/15">
          <Sparkles className="h-4 w-4" />
          AI preview
        </p>
        <h3 className="mt-5 font-display text-3xl font-bold text-white">{previewIdea.name || "Your idea preview"}</h3>
        <p className="mt-3 text-base leading-7 text-slate-300">{previewIdea.tagline}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <PreviewMetric label="Confidence" value={`${previewIdea.analysis.confidence}%`} />
          <PreviewMetric label="Verdict" value={previewIdea.analysis.verdict} />
          <PreviewMetric label="Demand" value={`${previewIdea.analysis.marketDemand}%`} />
          <PreviewMetric label="Defensibility" value={`${previewIdea.analysis.defensibility}%`} />
        </div>

        <div className="mt-6 grid gap-4">
          <PreviewBlock title="Problem framing" value={previewIdea.problem} />
          <PreviewBlock title="Audience" value={previewIdea.audience} />
          <PreviewBlock title="Moat" value={previewIdea.moat} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <PreviewList title="AI opportunities" items={previewIdea.analysis.opportunities} />
          <PreviewList title="AI risks" items={previewIdea.analysis.risks} />
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-200">{label}</span>
      {children}
    </label>
  );
}

function PreviewMetric({ label, value }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-950/30 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function PreviewBlock({ title, value }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-950/30 p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{title}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{value}</p>
    </div>
  );
}

function PreviewList({ title, items }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-950/30 p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item} className="rounded-xl bg-white/5 px-3 py-2 leading-6">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
