const express = require("express");
const cors = require("cors");
require("dotenv").config();

const driver = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "FixFlow API is running",
  });
});

app.get("/api/health", async (req, res) => {
    
  const session = driver.session();

  try {
    const result = await session.run("RETURN 1 AS result");

    res.json({
      status: "ok",
      database: result.records[0].get("result").toNumber(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
    });
  } finally {
    await session.close();
  }
});
app.get("/api/problems", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (p:Problem)
      RETURN p.id AS id, p.title AS title, p.category AS category
      ORDER BY p.title
    `);

    const problems = result.records.map((record) => ({
      id: record.get("id"),
      title: record.get("title"),
      category: record.get("category"),
    }));

    res.json(problems);
  } catch (error) {
    console.error("Failed to fetch problems:", error.message);

    res.status(500).json({
      message: "Failed to fetch problems",
    });
  } finally {
    await session.close();
  }
});
app.get("/api/problems/:id", async (req, res) => {
  const session = driver.session();
  const { id } = req.params;

  try {
    const result = await session.run(
      `
      MATCH (p:Problem {id: $id})
            -[:HAS_ERROR]->(e:Error)
            -[:MAY_BE_CAUSED_BY]->(c:Cause)
            -[:REQUIRES_CHECK]->(ch:Check)
            -[:CAN_BE_RESOLVED_BY]->(s:Solution)

      RETURN
        p.id AS problemId,
        p.title AS problem,
        p.category AS category,
        e.code AS error,
        e.message AS errorMessage,
        c.id AS causeId,
        c.title AS cause,
        c.description AS causeDescription,
        ch.id AS checkId,
        ch.title AS check,
        ch.instruction AS instruction,
        s.id AS solutionId,
        s.title AS solution,
        s.steps AS steps
      `,
      { id }
    );

    if (result.records.length === 0) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    const first = result.records[0];

    const response = {
      id: first.get("problemId"),
      title: first.get("problem"),
      category: first.get("category"),
      error: {
        code: first.get("error"),
        message: first.get("errorMessage"),
      },
      paths: result.records.map((record) => ({
        cause: {
          id: record.get("causeId"),
          title: record.get("cause"),
          description: record.get("causeDescription"),
        },
        check: {
          id: record.get("checkId"),
          title: record.get("check"),
          instruction: record.get("instruction"),
        },
        solution: {
          id: record.get("solutionId"),
          title: record.get("solution"),
          steps: record.get("steps"),
        },
      })),
    };

    res.json(response);
  } catch (error) {
    console.error("Failed to fetch problem:", error.message);

    res.status(500).json({
      message: "Failed to fetch problem",
    });
  } finally {
    await session.close();
  }
});
app.get("/api/search", async (req, res) => {
  const session = driver.session();
  const searchTerm = req.query.q?.trim();

  if (!searchTerm) {
    return res.status(400).json({
      message: "Search query is required",
    });
  }

  try {
    const result = await session.run(
      `
      MATCH (p:Problem)-[:HAS_ERROR]->(e:Error)
      WHERE
        toLower(p.title) CONTAINS toLower($searchTerm)
        OR toLower(p.description) CONTAINS toLower($searchTerm)
        OR toLower(e.code) CONTAINS toLower($searchTerm)
        OR toLower(e.message) CONTAINS toLower($searchTerm)

      RETURN DISTINCT
        p.id AS id,
        p.title AS title,
        p.category AS category,
        e.code AS error
      ORDER BY p.title
      `,
      { searchTerm }
    );

    const results = result.records.map((record) => ({
      id: record.get("id"),
      title: record.get("title"),
      category: record.get("category"),
      error: record.get("error"),
    }));

    res.json(results);
  } catch (error) {
    console.error("Search failed:", error.message);

    res.status(500).json({
      message: "Search failed",
    });
  } finally {
    await session.close();
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0",() => {
  console.log(` FixFlow API running on http://localhost:${PORT}`);
});