/**
 * Model for pets
 */ 

// TODO SQL QUERIES
// CREATE TABLE 

// GET
function getAllPets(username) {
    let result = []

    pool.query(`
    SELECT pname, profile, category, special_requirements
    FROM pets
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
function createAvailability(username, pname, profile, category, special_requirements) {
    let result = false

    pool.query(`
    INSERT INTO pets
    VALUES ($1::text, $2::text, $3::text, $4::text, $5::text)
    `,
        [username, pname, profile, category, special_requirements],
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
function createAvailability(username, pname) {
    let result = false

    pool.query(`
    DELETE FROM pets
    WHERE (username = $1::text AND pname = $2::pname)
    `,
        [username, pname],
        (err, res) => {
            if (err) {
                console.error('Error executing query', err.stack)
            } else {
                result = true
            }
        })

    return result
}
