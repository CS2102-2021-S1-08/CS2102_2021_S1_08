/**
 * Model for bids
 */ 

const { pool } = require("../dbConfig");

// GET BID
function getBid(start_date, end_date, category, poname, pname, ctuname) {
  return pool.query(`
    SELECT *
    FROM bids
    WHERE start_date = $1::date, end_date = $2::date, category = $3::text, poname = $4::text, pname = $5::text, ctuname = $6::text
    `,
    [start_date, end_date, category, poname, pname, ctuname]
  )
}

// POST BID
function createBid(start_date, end_date, category, poname, pname, ctuname, bid_start_date, bid_end_date) {
  return pool.query(`
    INSERT INTO bids
    VALUES ($1::date, $2::date, $3::text, $4::text, $5::text, $6::text, $7::date, $8::date, null, null, false)
    `,
    [start_date, end_date, category, poname, pname, ctuname, bid_start_date, bid_end_date]
  )
}

// DELETE BID
function deleteBid(start_date, end_date, category, poname, pname, ctuname) {
  return pool.query(`
    DELETE FROM bids
    WHERE start_date = $1::date, end_date = $2::date, category = $3::text, poname = $4::text, pname = $5::text, ctuname = $6::text
    `,
    [start_date, end_date, category, poname, pname, ctuname]
  )
}

// DELETE REVIEW
function deleteReview(poname, pname, ctuname, start_date, end_date, category) {
  return pool.query(`
    UPDATE bids
    SET review = null
    WHERE poname = $1::text, pname = $2::pname, ctuname = $3::text, start_date = $4::date, end_date = $5::date, category = $6::text
    `,
    [start_date, end_date, category, poname, pname, ctuname]
  )
}

// DELETE RATING
function deleteRating(poname, pname, ctuname, start_date, end_date, category) {
  return pool.query(`
    UPDATE bids
    SET rating = null
    WHERE poname = $1::text, pname = $2::pname, ctuname = $3::text, start_date = $4::date, end_date = $5::date, category = $6::text
    `,
    [start_date, end_date, category, poname, pname, ctuname]
  )
}

// UPDATE REVIEW
function updateReview(poname, pname, ctuname, start_date, end_date, category, review) {
  return pool.query(`
    UPDATE bids
    SET review = $7::text
    WHERE poname = $1::text, pname = $2::pname, ctuname = $3::text, start_date = $4::date, end_date = $5::date, category = $6::text
    `,
    [start_date, end_date, category, poname, pname, ctuname, review]
  )
}

// UPDATE RATING
function updateRating(poname, pname, ctuname, start_date, end_date, category, rating) {
  return pool.query(`
    UPDATE bids
    SET rating = $7::int
    WHERE poname = $1::text, pname = $2::pname, ctuname = $3::text, start_date = $4::date, end_date = $5::date, category = $6::text
    `,
    [start_date, end_date, category, poname, pname, ctuname, rating]
  )
}

exports.getBid = getBid;
exports.createBid = createBid;
exports.deleteBid = deleteBid;
exports.updateRating = updateRating;
exports.deleteRating = deleteRating;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;
