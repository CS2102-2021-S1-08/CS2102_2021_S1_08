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
export function getUser(username) {
    let result = []

    pool.query(`
      SELECT * FROM users
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