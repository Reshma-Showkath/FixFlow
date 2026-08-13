const driver = require("./db");

const seedNodeProblem = async () => {
  const session = driver.session();

  try {
    await session.run(`
      CREATE
        (p:Problem {
          id: "problem-node-port",
          title: "Node.js Port Already in Use",
          category: "Node.js",
          description: "The application cannot start because the requested port is already being used."
        }),

        (e:Error {
          id: "error-eaddrinuse",
          code: "EADDRINUSE",
          message: "Address already in use."
        }),

        (c1:Cause {
          id: "cause-port-process",
          title: "Another process is using the port",
          description: "Another application or process is already listening on the requested port."
        }),

        (c2:Cause {
          id: "cause-duplicate-server",
          title: "Multiple server instances are running",
          description: "The application may have been started more than once."
        }),

        (ch1:Check {
          id: "check-port-process",
          title: "Find the process using the port",
          instruction: "Check which process is currently listening on the requested port."
        }),

        (ch2:Check {
          id: "check-server-instance",
          title: "Check for duplicate server instances",
          instruction: "Verify that only one instance of the application is running."
        }),

        (s1:Solution {
          id: "solution-kill-process",
          title: "Stop the process using the port",
          steps: "Stop the process that is occupying the port and restart the application."
        }),

        (s2:Solution {
          id: "solution-stop-duplicate",
          title: "Stop the duplicate server",
          steps: "Stop the extra server instance and keep only one application process running."
        }),

        (p)-[:HAS_ERROR]->(e),

        (e)-[:MAY_BE_CAUSED_BY]->(c1),
        (e)-[:MAY_BE_CAUSED_BY]->(c2),

        (c1)-[:REQUIRES_CHECK]->(ch1),
        (c2)-[:REQUIRES_CHECK]->(ch2),

        (ch1)-[:CAN_BE_RESOLVED_BY]->(s1),
        (ch2)-[:CAN_BE_RESOLVED_BY]->(s2)
    `);

    console.log("✅ Node.js troubleshooting data created!");
  } catch (error) {
    console.error("❌ Seed failed:");
    console.error(error.message);
  } finally {
    await session.close();
    await driver.close();
  }
};

seedNodeProblem();