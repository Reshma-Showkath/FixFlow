function ProblemCard({ problem, onViewFix, loading }) {
  const handleClick = () => {
    if (!loading) {
      onViewFix(problem.id);
    }
  };

  return (
    <div className="problem-card">

      <div className="problem-info">

        <h2>{problem.title}</h2>

        <p>
          Category: {problem.category}
        </p>

        <p>
          Error: <strong>{problem.error}</strong>
        </p>

      </div>

      <button
        onClick={handleClick}
        disabled={loading}
        type="button"
      >
        {loading ? "Loading..." : "View Fix →"}
      </button>

    </div>
  );
}

export default ProblemCard;