const driver = require("./db");

async function queryGraph() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH path =
        (p:Problem)-[:HAS_ERROR]->(e:Error)
        -[:MAY_BE_CAUSED_BY]->(c:Cause)
        -[:REQUIRES_CHECK]->(ch:Check)
        -[:CAN_BE_RESOLVED_BY]->(s:Solution)

      RETURN
        p.title AS problem,
        e.code AS error,
        c.title AS cause,
        ch.title AS check,
        s.title AS solution
    `);

    result.records.forEach((record) => {
      console.log({
        problem: record.get("problem"),
        error: record.get("error"),
        cause: record.get("cause"),
        check: record.get("check"),
        solution: record.get("solution"),
      });
    });
  } catch (error) {
    console.error("❌ Query failed:");
    console.error(error.message);
  } finally {
    await session.close();
    await driver.close();
  }
}

queryGraph();