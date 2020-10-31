/**
 * Model for pet_owners
 */

//CREATE TABLE IF NOT EXISTS pet_owners (
//	username varchar(200) PRIMARY KEY NOT NULL REFERENCES users(username)
//);

const { pool } = require("../dbConfig");

// GET
function getPetOwner(username) {
  let result = []

  pool.query(`
      SELECT * FROM pet_owners
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
function putPetOwner(username) {
  pool.query(
    `INSERT INTO pet_owners (username)
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
exports.getPetOwner = getPetOwner;
exports.putPetOwner = putPetOwner;
