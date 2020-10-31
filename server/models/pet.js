/**
 * Model for pets
 */
const { pool } = require("../dbConfig");

// TODO SQL QUERIES
// CREATE TABLE 

// GET
exports.get = function getAllPets(username) {
    return pool.query(`
        SELECT pname, profile, category, special_requirements
        FROM pets
        WHERE username = $1::text
        `,
        [username]
    )
}

// POST
function createPet(username, pname, profile, category, special_requirements) {
    return pool.query(`
        INSERT INTO pets
        VALUES ($1::text, $2::text, $3::text, $4::text, $5::text)
        `,
        [username, pname, profile, category, special_requirements]
    )
}

// DELETE
function deletePet(username, pname) {
    return pool.query(`
        DELETE FROM pets
        WHERE (username = $1::text AND pname = $2::pname)
        `,
            [username, pname]
    )
}
