import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";

const API_URL = "https://github-repo-explainer-b.onrender.com/analyze";

function formatSections(text) {
  if (!text) {
    return [];
  }

  const blocks = text
    .split(/\n(?=\d+\.\s|#+\s)/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block, index) => {
    const [firstLine, ...rest] = block.split("\n");
    return {
      id: `${firstLine}-${index}`,
      title: firstLine.trim(),
      body: rest.join("\n").trim(),
    };
  });
}

function App() {
  const [repo, setRepo] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("landing");

  const sections = formatSections(result);

  async function analyze() {
    if (!repo.trim()) {
      setError("Paste a GitHub repository URL to analyze.");
      return false;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoUrl: repo.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze repository.");
      }

      const explanation = data.explanation || "No explanation returned.";
      setResult(explanation);
      setPage("dashboard");
      return true;
    } catch (err) {
      setError(err.message || "Something went wrong while analyzing the repo.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  if (page === "dashboard") {
    return (
      <DashboardPage
        repo={repo}
        result={result}
        sections={sections}
        loading={loading}
        error={error}
        onBack={() => setPage("landing")}
        onAnalyze={analyze}
      />
    );
  }

  return (
    <LandingPage
      repo={repo}
      setRepo={setRepo}
      result={result}
      error={error}
      loading={loading}
      onAnalyze={analyze}
      onOpenDashboard={() => setPage("dashboard")}
    />
  );
}

export default App;
