/**
 * Model for care_takers
 */

//CREATE TABLE IF NOT EXISTS care_takers (
//	username varchar(200) PRIMARY KEY NOT NULL REFERENCES users(username)
//);
const { pool } = require("../dbConfig");

// GET
// NOTE: need to change full_timers table to another
exports.getCareTakerTotalPetDays = async function (username) {
  const query = `
      SELECT SUM(DATE_PART('day', B.bid_end_date) - DATE_PART('day', B.bid_start_date) + 1)
      FROM full_timers F, availabilities A, bids B
      WHERE F.username = $1
      AND F.username = A.username
      AND B.ctuname = A.username
      AND B.start_date = A.start_date
      AND B.end_date = A.end_date
      AND B.category = A.category
      AND B.is_successful;
      `;
  const values = [username];

  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};

// GET
// NOTE: need to change full_timers table to another
// year_month in 'YYYY-MM'
// Assumption: bids cannot go beyond two months (both bid_start < month_start and bid_end > month_end)
exports.getCareTakerTotalPetDaysForMonth = async function (username, month) {
  const query = `
      SELECT 
        SUM(
        CASE
          WHEN EXTRACT(MONTH FROM B.bid_start_date) = $2 AND EXTRACT(MONTH FROM B.bid_end_date) = $2
          THEN B.bid_end_date - B.bid_start_date + 1
          WHEN EXTRACT(MONTH FROM B.bid_start_date) = $2 AND EXTRACT(MONTH FROM B.bid_end_date) <> $2
          THEN (date_trunc('MONTH', B.bid_start_date) + INTERVAL '1 MONTH - 1 day')::DATE - B.bid_start_date + 1
          WHEN EXTRACT(MONTH FROM B.bid_start_date) != $2 AND EXTRACT(MONTH FROM B.bid_end_date) = $2
          THEN B.bid_end_date - date_trunc('MONTH',now())::DATE + 1
        END) pet_days
        FROM full_timers F, availabilities A, bids B
        WHERE F.username = $1
          AND F.username = A.username
          AND B.ctuname = A.username
          AND B.start_date = A.start_date
          AND B.end_date = A.end_date
          AND B.category = A.category
          AND B.is_successful = TRUE;
      `;

  const values = [username, month];

  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};

// GET
// NOTE: need to change full_timers table to another
exports.getCareTakerTotalSalary = async function (username) {
  const query = `
      SELECT SUM(DATE_PART('day', B.bid_end_date) - DATE_PART('day', B.bid_start_date) + 1)
      FROM full_timers F, availabilities A, bids B
      WHERE F.username = $1
      AND F.username = A.username
      AND B.ctuname = A.username
      AND B.start_date = A.start_date
      AND B.end_date = A.end_date
      AND B.category = A.category
      AND B.is_successful;
      `;
  const values = [username];

  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};



exports.getAllBids = async function (username) {
    const query = `
      SELECT *
      FROM bids
      WHERE ctuname = $1
      AND start_date >= CURRENT_DATE
      ORDER BY
      start_date ASC
      `;
    const values = [username];
    try {
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.log(err.stack);
    }
}