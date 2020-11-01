/**
 * Model for pcs_admins
 */

//CREATE TABLE IF NOT EXISTS pcs_admins (
//	username varchar(200) PRIMARY KEY,
//	password varchar(200) NOT NULL
//);

const { pool } = require("../dbConfig");

// GET
function getPcsAdmin(username) {
  let result = []

  pool.query(`
      SELECT * FROM pcs_admins
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
function putPcsAdmin(username, password) {
  pool.query(
    `INSERT INTO pcs_admins(username, password)
    VALUES ($1, $2)
    RETURNING username, password`, [username, password],
    (err, res) => {
      if (err) {
        console.error('Error executing query', err.stack)
      }
      console.log(res.rows);
    }
  )
}


// DELETE
exports.getPcsAdmin = getPcsAdmin;
exports.putPcsAdmin = putPcsAdmin;