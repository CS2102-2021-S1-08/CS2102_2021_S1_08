/**
 * Model for leaves 
 */
const { pool } = require("../dbConfig");

// GET
function getAllLeaves(username) {
  return pool.query(`
    SELECT leave_date
    FROM leaves
    WHERE username = $1::text
    `,
    [username]
  )
}

// POST
function createLeave(username, leave_date) {
  return pool.query(`
    INSERT INTO leaves
    VALUES ($1::text, $2::date)
    `,
    [username, leave_date]
  )
}

// DELETE
function deleteLeave(username, leave_date) {
  return pool.query(`
    DELETE FROM leaves
    WHERE username = $1::text AND leave_date = $2::date
  `,
  [username, leave_date]
  )
}
// TODO

exports.createLeave = createLeave
exports.getAllLeaves = getAllLeaves
exports.deleteLeave = deleteLeave