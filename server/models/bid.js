/**
 * Model for bids
 */ 

// TODO SQL QUERIES
// CREATE TABLE 

// GET
function getBid(start_date, end_date, category, pname) {
  return pool.query(`
    SELECT *
    FROM bids
    WHERE start_date = $1::date, end_date = $2::date, category = $3::text, pname = $4::text
    `,
    [start_date, end_date, category, pname]
  )
}

// POST
function createBid(start_date, end_date, category, pname, bid_start_date, bid_end_date) {
  return pool.query(`
    INSERT INTO bids
    VALUES ($1::date, $2::date, $3::text, $4::text, $5::text, $6::text, null, null, false)
    `,
    [start_date, end_date, category, pname, bid_start_date, bid_end_date],
  )
}

// DELETE
// function deleteBid(start_date, end_date, category, pname) {