/**
 * Model for base prices
 */ 

// TODO SQL QUERIES
// CREATE TABLE 

// GET
function getBasePrice(category) {
  let result = false

  pool.query(`
    SELECT price
    FROM base_prices
    WHERE category = $1::text
    `,
    [category],
    (err, res) => {
      if (err) {
        console.error('Error executing query', err.stack)
      }
      result = true;
    })

  return result
}

// POST
function createBasePrice(category, price) {
  let result = false

  pool.query(`
    INSERT INTO base_prices
    VALUES ($1::text, $2::int)
    `,
    [category, price],
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