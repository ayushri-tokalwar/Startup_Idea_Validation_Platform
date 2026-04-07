const scoreFromText = (text) =>
  text
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

export function buildIdeaAnalysis(idea) {
  const signal = scoreFromText(`${idea.name}${idea.problem}${idea.moat}`);

  const marketDemand = 65 + (signal % 24);
  const defensibility = 54 + (signal % 31);
  const executionFit = 60 + (signal % 28);
  const confidence = Math.round((marketDemand + defensibility + executionFit) / 3);

  const risks = [
    "Customer acquisition may require trust-heavy sales cycles.",
    "Retention depends on proving measurable ROI quickly.",
    "Positioning must stay narrow enough for a first clear buyer.",
  ].sort(() => 0.5 - ((signal % 10) / 10));

  const opportunities = [
    "Strong wedge if early adopters can invite collaborators into the workflow.",
    "Could expand into a benchmark data product after enough usage density.",
    "Community feedback suggests shareable reports would accelerate referrals.",
  ];

  return {
    marketDemand,
    defensibility,
    executionFit,
    confidence,
    verdict:
      confidence >= 80
        ? "High-potential signal"
        : confidence >= 70
          ? "Worth validating fast"
          : "Promising, but refine the wedge",
    opportunities: opportunities.slice(0, 2),
    risks: risks.slice(0, 2),
  };
}
