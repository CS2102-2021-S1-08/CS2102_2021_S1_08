/**
 * Model for users
 */

//CREATE TABLE IF NOT EXISTS users (
//	username varchar(200) PRIMARY KEY NOT NULL,
//	password varchar(200) NOT NULL,
//	name varchar(200) NOT NULL,
//	profile varchar(200)
//);

const { pool } = require("../dbConfig");

// GET
// function getUser(username) {
//     let result = []

//     pool.query(`
//       SELECT * FROM users
//       WHERE username = $1
//       `,
//         [username],
//         (err, res) => {
//             if (err) {
//                 console.error('Error executing query', err.stack)
//             }
//             result = res;
//         })

//     return result
// }

function getUserType(username) {
    return pool.query(`
      SELECT COALESCE(
        (SELECT 'admin' FROM pcs_admins WHERE username = $1::text),
        (SELECT 'both' FROM (SELECT * FROM pet_owners INTERSECT SELECT * FROM care_takers) result WHERE username = $1::text),
        (SELECT 'pet_owner' FROM pet_owners WHERE username = $1::text),
        (SELECT 'care_taker' FROM care_takers WHERE username = $1::text)
      );
      `,
      [username]
    )
}

// exports.getUser = getUser;
exports.getUserType = getUserType;