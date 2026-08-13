function TroubleshootingPath({ path }) {
  return (
    <div className="troubleshooting-path">

      {/* CAUSE */}
      <div className="path-step">

        <span className="step-label">
          CAUSE
        </span>

        <h3>
          {path.cause.title}
        </h3>

        <p>
          {path.cause.description}
        </p>

      </div>


      {/* ARROW */}
      <div className="path-arrow">

        <span className="desktop-arrow">
          →
        </span>

        <span className="mobile-arrow">
          ↓
        </span>

      </div>


      {/* CHECK */}
      <div className="path-step">

        <span className="step-label">
          CHECK
        </span>

        <h3>
          {path.check.title}
        </h3>

        <p>
          {path.check.instruction}
        </p>

      </div>


      {/* ARROW */}
      <div className="path-arrow">

        <span className="desktop-arrow">
          →
        </span>

        <span className="mobile-arrow">
          ↓
        </span>

      </div>


      {/* SOLUTION */}
      <div className="path-step solution">

        <span className="step-label">
          SOLUTION
        </span>

        <h3>
          {path.solution.title}
        </h3>

        <p>
          {path.solution.steps}
        </p>

      </div>

    </div>
  );
}

export default TroubleshootingPath;