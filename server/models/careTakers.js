/**
 * Model for care_takers
 */

//CREATE TABLE IF NOT EXISTS care_takers (
//	username varchar(200) PRIMARY KEY NOT NULL REFERENCES users(username)
//);

const { pool } = require("../dbConfig");

// GET
function getCareTaker(username) {
  let result = []

  pool.query(`
      SELECT * FROM care_takers
      WHERE username = $1
      `,
    [username],
    (err, res) => {
      if (err) {
        console.error('Error executing query', err.stack)
      }
      result = res;
    })

  return result
}

// PUT
function putFullTImer(username) {
  return pool.query(
    `INSERT INTO full_timers (username)
    VALUES ($1)
    RETURNING username`, [username],
    (err, res) => {
      if (err) {
        console.error('Error executing query', err.stack)
      }
      console.log(res.rows);
    }
  )
}

function putPartTimer(username) {
  return pool.query(
    `INSERT INTO part_timers (username)
    VALUES ($1)
    RETURNING username`, [username],
    (err, res) => {
      if (err) {
        console.error('Error executing query', err.stack)
      }
      console.log(res.rows);
    }
  )
}

// DELETE
exports.getCareTaker = getCareTaker;
exports.putCareTaker = putCareTaker;
