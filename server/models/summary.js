/**
 * Model for monthly summaries
 */
const { pool } = require("../dbConfig");

// GET
async function getMonthlySummary(ctname, year, month) {
  // async/await
  const query =
    "SELECT * \
                    FROM monthly_summary \
                    WHERE ctname=$1::text AND year=$2::int AND month=$3::int";
  const values = [ctname, year, month];

  try {
    const res = await pool.query(query, values);
    console.log(res.rows[0]);
  } catch (err) {
    console.log(err.stack);
  }
}
