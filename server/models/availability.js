/**
 * Model for availabilities 
 */
const { pool } = require("../dbConfig");

// TODO SQL QUERIES
// CREATE TABLE 
// exports.create_query = `
//  CREATE TABLE IF NOT EXISTS availability {
//   username VARCHAR(50) REFERENCES caretaker(username)
//   start_date DATE,
//   end_date DATE,
//   category VARCHAR(50) REFEReNCES baseprice(category),
//   price INT,
//   PRIMARY KEY(username, start_date, end_date, category)
//  } 
// `

// GET
function getAllAvailabilities(username) {
  return pool.query(`
    SELECT start_date, end_date, category, price
    FROM availabilities
    WHERE username = $1::text
    `,
    [username]
  )
}

// POST
function createAvailability(username, start_date, end_date, category) {
  return pool.query(`
    INSERT INTO availabilities
    VALUES ($1::text, $2::date, $3::date, $4::text, 0)
    `,
    [username, start_date, end_date, category]
  )
}

// DELETE
function deleteAvailabilty(username, start_date, end_date, category) {
  return pool.query(`
    DELETE FROM availabilities
    WHERE username = $1::text AND start_date = $2::date AND end_date = $3::date AND category = $4::text
  `,
  [username, start_date, end_date, category]
  )
}
// TODO

exports.createAvailability = createAvailability
exports.getAllAvailabilities = getAllAvailabilities
exports.deleteAvailabilty = deleteAvailabilty