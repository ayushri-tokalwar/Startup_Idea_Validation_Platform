import { Route, Routes } from "react-router-dom";
import { useMemo, useState } from "react";
import { initialIdeas } from "./data/mockData";
import { buildIdeaAnalysis } from "./lib/analysis";
import { AppLayout } from "./components/AppLayout";
import { LandingPage } from "./pages/LandingPage";
import { ExplorePage } from "./pages/ExplorePage";
import { SubmitPage } from "./pages/SubmitPage";

const enrichIdeas = (ideas) =>
  ideas.map((idea) => ({
    ...idea,
    analysis: buildIdeaAnalysis(idea),
  }));

export default function App() {
  const [ideas, setIdeas] = useState(() => enrichIdeas(initialIdeas));

  const metrics = useMemo(() => {
    const sorted = [...ideas].sort((a, b) => b.votes - a.votes);
    const avgConfidence =
      ideas.reduce((sum, idea) => sum + idea.analysis.confidence, 0) / ideas.length;

    return {
      totalIdeas: ideas.length,
      activeVoters: ideas.reduce((sum, idea) => sum + idea.engagement.contributors, 0),
      avgConfidence: Math.round(avgConfidence),
      topIdea: sorted[0],
    };
  }, [ideas]);

  const addIdea = (ideaInput) => {
    const nextIdea = {
      id: crypto.randomUUID(),
      ...ideaInput,
      createdAt: new Date().toISOString(),
      votes: 0,
      trendScore: 58,
      stage: "Fresh signal",
      tags: ideaInput.tags,
      engagement: {
        comments: 0,
        contributors: 1,
      },
      comments: [
        {
          id: crypto.randomUUID(),
          author: "SignalStack AI",
          role: "Validation Copilot",
          body: "Early framing looks promising. Publish it to gather sharper market evidence.",
          sentiment: "positive",
        },
      ],
    };

    setIdeas((currentIdeas) => [enrichIdeas([nextIdea])[0], ...currentIdeas]);
  };

  const voteIdea = (ideaId, direction) => {
    setIdeas((currentIdeas) =>
      currentIdeas.map((idea) =>
        idea.id === ideaId
          ? {
              ...idea,
              votes: Math.max(0, idea.votes + direction),
              trendScore: Math.max(1, idea.trendScore + direction * 2),
            }
          : idea,
      ),
    );
  };

  const addComment = (ideaId, body) => {
    setIdeas((currentIdeas) =>
      currentIdeas.map((idea) =>
        idea.id === ideaId
          ? {
              ...idea,
              engagement: {
                ...idea.engagement,
                comments: idea.engagement.comments + 1,
              },
              comments: [
                {
                  id: crypto.randomUUID(),
                  author: "Community Member",
                  role: "Early supporter",
                  body,
                  sentiment: "positive",
                },
                ...idea.comments,
              ],
            }
          : idea,
      ),
    );
  };

  return (
    <AppLayout metrics={metrics}>
      <Routes>
        <Route
          path="/"
          element={<LandingPage ideas={ideas} metrics={metrics} onVote={voteIdea} onComment={addComment} />}
        />
        <Route
          path="/explore"
          element={<ExplorePage ideas={ideas} onVote={voteIdea} onComment={addComment} />}
        />
        <Route path="/submit" element={<SubmitPage onSubmitIdea={addIdea} />} />
      </Routes>
    </AppLayout>
  );
}
