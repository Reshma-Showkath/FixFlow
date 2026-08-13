import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ProblemCard from "./components/ProblemCard";
import TroubleshootingPath from "./components/TroubleShootingPath";

function App() {
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const [results, setResults] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingProblemId, setLoadingProblemId] = useState(null);

  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!search.trim()) {
      setResults([]);
      setSubmittedSearch("");
      setSelectedProblem(null);
      setError("");
      return;
    }

    setLoading(true);
    setError("");
    setSelectedProblem(null);
    setSubmittedSearch(search);

    try {
      const response = await fetch(
        `https://fixflow-oe6u.onrender.com/api/search?q=${encodeURIComponent(
          search
        )}`
      );

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);

      setResults([]);

      setError(
        "Unable to connect to FixFlow API. Please make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewFix = async (problemId) => {
    setLoadingProblemId(problemId);
    setError("");
    setSelectedProblem(null);

    try {
      const response = await fetch(
        `https://fixflow-oe6u.onrender.com/api/problems/${problemId}`
      );

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      setSelectedProblem(data);
    } catch (error) {
      console.error("Failed to load problem:", error);

      setError(
        "Unable to load the troubleshooting details. Please check that the backend server is running."
      );
    } finally {
      setLoadingProblemId(null);
    }
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <div className="logo-mark">F</div>
            <span>FixFlow</span>
          </div>

          <div className="header-badge">
            Developer Troubleshooting
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="container">
            <h1>
              Fix errors.
              <br />
              <span>Understand why.</span>
            </h1>

            <p>
              Search developer errors and follow a clear path from
              the root cause to the right solution.
            </p>

            <SearchBar
              search={search}
              setSearch={setSearch}
              onSearch={handleSearch}
            />
          </div>
        </section>

        {/* API ERROR */}
        {error && (
          <section className="section">
            <div className="container">
              <div className="api-error">
                <div className="api-error-title">
                  Something went wrong
                </div>

                <div className="api-error-message">
                  {error}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SEARCH RESULTS */}
        {submittedSearch && !error && (
          <section className="section">
            <div className="container">
              <div className="section-title">
                Search Results
              </div>

              {loading && (
                <div className="loading">
                  Searching FixFlow...
                </div>
              )}

              {!loading && results.length === 0 && (
                <div className="empty">
                  No matching problems found.
                </div>
              )}

              {!loading && results.length > 0 && (
                <div className="results">
                  {results.map((problem) => (
                    <ProblemCard
                      key={problem.id}
                      problem={problem}
                      onViewFix={handleViewFix}
                      loading={loadingProblemId === problem.id}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* DETAILS LOADING */}
        {loadingProblemId && !error && (
          <section className="section">
            <div className="container">
              <div className="loading">
                Loading troubleshooting path...
              </div>
            </div>
          </section>
        )}

        {/* PROBLEM DETAILS */}
        {selectedProblem && !error && !loadingProblemId && (
          <section className="section">
            <div className="container">
              <div className="details">
                <div className="details-header">
                  <h2>{selectedProblem.title}</h2>

                  <div className="error-box">
                    <div className="error-code">
                      {selectedProblem.error.code}
                    </div>

                    <div className="error-message">
                      {selectedProblem.error.message}
                    </div>
                  </div>
                </div>

                <h3 className="troubleshooting-title">
                  Troubleshooting Paths
                </h3>

                <div className="paths">
                  {selectedProblem.paths.map((path) => (
                    <TroubleshootingPath
                      key={path.cause.id}
                      path={path}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;