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
  let result = []

  pool.query(`
    SELECT start_date, end_date, category, price
    FROM availabilities
    WHERE username = $1::text
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

// POST
function createAvailability(username, start_date, end_date, category) {
  let result = false

  pool.query(`
    INSERT INTO availabilities
    VALUES ($1::text, $2::date, $3::date, $4::text)
    `,
    [username, start_date, end_date, category],
    (err, res) => {
      if (err) {
        console.error('Error executing query', err.stack)
      } else {
        result = true
      }
    })

  return result
}

// DELETE
// TODO