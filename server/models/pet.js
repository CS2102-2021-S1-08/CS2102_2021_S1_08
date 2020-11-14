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
        WHERE poname = $1::text
        `,
        [username]
    )
}

// POST
exports.post = function createPet(username, pname, profile, category, special_requirements) {
    return pool.query(`
        INSERT INTO pets
        VALUES ($1::text, $2::text, $3::text, $4::text, $5::text)
        `,
        [username, pname, profile, category, special_requirements]
    )
}

// DELETE
exports.delete = function deletePet(username, pname) {
    return pool.query(`
        DELETE FROM pets
        WHERE (poname = $1::text AND pname = $2::text)
        `,
            [username, pname]
    )
}
