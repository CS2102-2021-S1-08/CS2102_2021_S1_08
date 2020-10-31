/**
 * Model for monthly summaries
 */
const { pool } = require("../dbConfig");

exports.getMonthlySummary = async function (ctname, year, month) {
  const query =
    "SELECT * \
    FROM monthly_summary \
    WHERE ctname=$1::text AND year=$2::int AND month=$3::int";
  const values = [ctname, year, month];

  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};

exports.getAllMonthlySummary = async function () {
  const query = "SELECT * FROM monthly_summary";

  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }
};
