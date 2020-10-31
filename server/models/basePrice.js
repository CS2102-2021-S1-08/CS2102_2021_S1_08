/**
 * Model for base prices
 */ 

// TODO SQL QUERIES
// CREATE TABLE 

// GET
function getBasePrice(category) {
  return pool.query(`
    SELECT price
    FROM base_prices
    WHERE category = $1::text
    `,
    [category]
  )
}

// POST
function createBasePrice(category, price) {
  return pool.query(`
    INSERT INTO base_prices
    VALUES ($1::text, $2::int)
    `,
    [category, price]
  )
}

// DELETE