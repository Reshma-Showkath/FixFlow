// seed.js

const problems = [
  {
    id: "problem-mongodb",
    title: "MongoDB Connection Failure",
    category: "Database",
    error: "ECONNREFUSED",
  },
  {
    id: "problem-node-port",
    title: "Node.js Port Already in Use",
    category: "Node.js",
    error: "EADDRINUSE",
  },
  {
    id: "problem-git-push",
    title: "Git Push Rejected",
    category: "Git",
    error: "REJECTED",
  },
  {
    id: "problem-react-undefined",
    title: "React Cannot Read Properties of Undefined",
    category: "React",
    error: "TypeError",
  },
  {
    id: "problem-npm-resolve",
    title: "npm Dependency Resolution Failure",
    category: "Node.js",
    error: "ERESOLVE",
  },
  {
    id: "problem-cors",
    title: "CORS Request Blocked",
    category: "API",
    error: "CORS",
  },
  {
    id: "problem-jwt",
    title: "JWT Authentication Failure",
    category: "Authentication",
    error: "401",
  },
  {
    id: "problem-docker",
    title: "Docker Container Exited",
    category: "Docker",
    error: "EXITED",
  },
  {
    id: "problem-azure",
    title: "Azure Deployment Failure",
    category: "Deployment",
    error: "DEPLOY_FAILED",
  },
  {
    id: "problem-mongo-auth",
    title: "MongoDB Authentication Failure",
    category: "Database",
    error: "AUTH_FAILED",
  },
];

const causes = [
  {
    id: "cause-db-unavailable",
    title: "MongoDB service is unavailable",
    description: "The MongoDB server is stopped or unreachable.",
  },
  {
    id: "cause-port-in-use",
    title: "Another process is using the port",
    description: "A different application is already listening on the requested port.",
  },
  {
    id: "cause-remote-ahead",
    title: "Remote branch contains newer commits",
    description: "The remote branch has commits missing from the local branch.",
  },
  {
    id: "cause-undefined-data",
    title: "Data is undefined before rendering",
    description: "The component accesses a property before the API data is available.",
  },
  {
    id: "cause-peer-conflict",
    title: "Conflicting package peer dependencies",
    description: "Installed packages require incompatible dependency versions.",
  },
  {
    id: "cause-cors-policy",
    title: "Server does not allow the frontend origin",
    description: "The API server is blocking requests from the frontend origin.",
  },
  {
    id: "cause-invalid-token",
    title: "JWT is invalid or expired",
    description: "The authentication token cannot be verified by the server.",
  },
  {
    id: "cause-container-crash",
    title: "Application process crashed inside container",
    description: "The container starts but the application process exits unexpectedly.",
  },
  {
    id: "cause-env-missing",
    title: "Required environment variable is missing",
    description: "The deployment environment does not contain a required configuration value.",
  },
  {
    id: "cause-wrong-credentials",
    title: "Invalid MongoDB credentials",
    description: "The username or password supplied to MongoDB is incorrect.",
  },
];

const checks = [
  {
    id: "check-db-status",
    title: "Check MongoDB service status",
    instruction: "Verify that MongoDB is running and reachable.",
  },
  {
    id: "check-port-process",
    title: "Check which process uses the port",
    instruction: "Identify the process currently listening on the application port.",
  },
  {
    id: "check-git-remote",
    title: "Check remote branch status",
    instruction: "Compare the local branch with its remote tracking branch.",
  },
  {
    id: "check-api-data",
    title: "Check API response before rendering",
    instruction: "Inspect the API response and verify the component handles loading states.",
  },
  {
    id: "check-package-tree",
    title: "Inspect dependency tree",
    instruction: "Check installed package versions and peer dependency conflicts.",
  },
  {
    id: "check-cors-config",
    title: "Check API CORS configuration",
    instruction: "Verify that the frontend origin is allowed by the API.",
  },
  {
    id: "check-jwt",
    title: "Inspect JWT token",
    instruction: "Verify token validity, expiry time, and signing configuration.",
  },
  {
    id: "check-container-logs",
    title: "Inspect Docker container logs",
    instruction: "Review container logs to identify the application startup failure.",
  },
  {
    id: "check-environment",
    title: "Check deployment environment variables",
    instruction: "Verify all required environment variables are configured.",
  },
  {
    id: "check-mongo-credentials",
    title: "Verify MongoDB credentials",
    instruction: "Confirm database username, password, and authentication database.",
  },
];

const solutions = [
  {
    id: "solution-start-mongodb",
    title: "Start or restart MongoDB",
    instruction: "Start the MongoDB service and verify the application can connect.",
  },
  {
    id: "solution-change-port",
    title: "Change the application port",
    instruction: "Stop the conflicting process or configure the application to use another port.",
  },
  {
    id: "solution-pull-rebase",
    title: "Pull and rebase remote changes",
    instruction: "Synchronize the local branch with the remote branch before pushing.",
  },
  {
    id: "solution-guard-render",
    title: "Guard against undefined data",
    instruction: "Add loading checks, optional chaining, or safe default values.",
  },
  {
    id: "solution-install-compatible",
    title: "Install compatible dependency versions",
    instruction: "Align package versions so peer dependency requirements are satisfied.",
  },
  {
    id: "solution-enable-cors",
    title: "Allow the frontend origin",
    instruction: "Configure the backend CORS policy to allow the required frontend origin.",
  },
  {
    id: "solution-refresh-token",
    title: "Refresh or regenerate JWT",
    instruction: "Generate a valid token and verify the signing secret/configuration.",
  },
  {
    id: "solution-fix-container",
    title: "Fix container startup configuration",
    instruction: "Correct the application command, configuration, or runtime error causing the container to exit.",
  },
  {
    id: "solution-configure-env",
    title: "Configure deployment environment variables",
    instruction: "Add the missing variables to the deployment environment and redeploy.",
  },
  {
    id: "solution-update-credentials",
    title: "Update MongoDB credentials",
    instruction: "Use valid database credentials and confirm the required database permissions.",
  },
];

const relationships = [
  // Problem -> Cause
  ["problem-mongodb", "cause-db-unavailable"],
  ["problem-node-port", "cause-port-in-use"],
  ["problem-git-push", "cause-remote-ahead"],
  ["problem-react-undefined", "cause-undefined-data"],
  ["problem-npm-resolve", "cause-peer-conflict"],
  ["problem-cors", "cause-cors-policy"],
  ["problem-jwt", "cause-invalid-token"],
  ["problem-docker", "cause-container-crash"],
  ["problem-azure", "cause-env-missing"],
  ["problem-mongo-auth", "cause-wrong-credentials"],

  // Cause -> Check
  ["cause-db-unavailable", "check-db-status"],
  ["cause-port-in-use", "check-port-process"],
  ["cause-remote-ahead", "check-git-remote"],
  ["cause-undefined-data", "check-api-data"],
  ["cause-peer-conflict", "check-package-tree"],
  ["cause-cors-policy", "check-cors-config"],
  ["cause-invalid-token", "check-jwt"],
  ["cause-container-crash", "check-container-logs"],
  ["cause-env-missing", "check-environment"],
  ["cause-wrong-credentials", "check-mongo-credentials"],

  // Check -> Solution
  ["check-db-status", "solution-start-mongodb"],
  ["check-port-process", "solution-change-port"],
  ["check-git-remote", "solution-pull-rebase"],
  ["check-api-data", "solution-guard-render"],
  ["check-package-tree", "solution-install-compatible"],
  ["check-cors-config", "solution-enable-cors"],
  ["check-jwt", "solution-refresh-token"],
  ["check-container-logs", "solution-fix-container"],
  ["check-environment", "solution-configure-env"],
  ["check-mongo-credentials", "solution-update-credentials"],
];

module.exports = {
  problems,
  causes,
  checks,
  solutions,
  relationships,
};