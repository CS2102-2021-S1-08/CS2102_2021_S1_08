/**
 * Model for availabilities 
 */
const { pool } = require("../dbConfig");

// GET for pet owner
function getAllAvailabilitiesForPetOwner(username, date, category) {
  return pool.query(`
    SELECT start_date, end_date, category, price
    FROM availabilities
    WHERE username = $1::text
    AND start_date < $2::date
    AND $2::date < end_date
    AND category = $3::text
    `,
    [username, date, category]
  )
}

// GET for care takers
function getAllAvailabilitiesForCareTaker(username) {
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
    VALUES ($1::text, $2::date, $3::date, $4::text)
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
exports.getAllAvailabilitiesForCareTaker = getAllAvailabilitiesForCareTaker
exports.getAllAvailabilitiesForPetOwner = getAllAvailabilitiesForPetOwner
exports.deleteAvailabilty = deleteAvailabilty