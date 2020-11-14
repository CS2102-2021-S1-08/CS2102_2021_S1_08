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

function createPCSAdmin(username, password) {
  return pool.query(
    `INSERT INTO pcs_admins(username, password)
    VALUES ($1, $2)
    RETURNING username, password`, [username, password]
  );
}

function createUser(username, password, usertype) {
  return (async () => {
    const client = await pool.connect()
    let res = {};
    try {
      await client.query('BEGIN')
      res = await client.query(`
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING username, password`,
        [username, password])
      
      if (usertype.petowner) {
        res = await client.query(`
          INSERT INTO pet_owners (username)
          VALUES ($1)
          RETURNING username
        `, [username])
      }
      
      if (usertype.caretaker) {
        res = await client.query(`
            INSERT INTO care_takers (username)
            VALUES ($1)
            RETURNING username
          `, [username])
        if (usertype.fulltime) {
          res = await client.query(`
            INSERT INTO full_timers (username)
            VALUES ($1)
            RETURNING username
          `, [username])
        } else {
          res = await client.query(`
            INSERT INTO part_timers (username)
            VALUES ($1)
            RETURNING username
          `, [username])
        }
      }
       
      await client.query('COMMIT')

      return res;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  })();
}

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
exports.createUser = createUser;
exports.createPCSAdmin = createPCSAdmin;