const driver = require("./db");

async function testConnection() {
  const session = driver.session();

  try {
    const result = await session.run("RETURN 1 AS result");

    console.log("✅ CognoDB connected successfully!");
    console.log("Result:", result.records[0].get("result").toNumber());
  } catch (error) {
    console.error("❌ CognoDB connection failed:");
    console.error(error.message);
  } finally {
    await session.close();
    await driver.close();
  }
}

testConnection();