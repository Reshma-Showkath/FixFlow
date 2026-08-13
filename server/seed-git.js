const driver = require("./db");

const seedGitProblem = async () => {
  const session = driver.session();

  try {
    await session.run(`
      CREATE
        (p:Problem {
          id: "problem-git-push",
          title: "Git Push Rejected",
          category: "Git",
          description: "Git refuses to push local changes because the remote branch contains changes that are not present locally."
        }),

        (e:Error {
          id: "error-git-rejected",
          code: "REJECTED",
          message: "Updates were rejected because the remote contains work that you do not have locally."
        }),

        (c1:Cause {
          id: "cause-remote-changes",
          title: "Remote branch has new commits",
          description: "Someone pushed changes to the remote branch before your local push."
        }),

        (c2:Cause {
          id: "cause-history-diverged",
          title: "Local and remote histories have diverged",
          description: "Local and remote branches contain different commit histories."
        }),

        (ch1:Check {
          id: "check-git-fetch",
          title: "Check remote changes",
          instruction: "Fetch the latest changes from the remote repository and inspect the commit history."
        }),

        (ch2:Check {
          id: "check-git-status",
          title: "Check branch status",
          instruction: "Compare the local branch with its remote tracking branch."
        }),

        (s1:Solution {
          id: "solution-git-pull",
          title: "Pull remote changes",
          steps: "Pull or rebase the remote changes, resolve conflicts if necessary, then push again."
        }),

        (s2:Solution {
          id: "solution-git-rebase",
          title: "Rebase local commits",
          steps: "Rebase local commits onto the latest remote branch and push the updated history."
        }),

        (p)-[:HAS_ERROR]->(e),

        (e)-[:MAY_BE_CAUSED_BY]->(c1),
        (e)-[:MAY_BE_CAUSED_BY]->(c2),

        (c1)-[:REQUIRES_CHECK]->(ch1),
        (c2)-[:REQUIRES_CHECK]->(ch2),

        (ch1)-[:CAN_BE_RESOLVED_BY]->(s1),
        (ch2)-[:CAN_BE_RESOLVED_BY]->(s2)
    `);

    console.log("✅ Git troubleshooting data created!");
  } catch (error) {
    console.error("❌ Seed failed:");
    console.error(error.message);
  } finally {
    await session.close();
    await driver.close();
  }
};

seedGitProblem();