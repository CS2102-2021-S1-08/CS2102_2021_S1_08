/**
 * Model for bids
 */ 

const { pool } = require("../dbConfig");

// GET BID
function getBidAsPetOwner(poname) {
  return pool.query(`
    SELECT *
    FROM bids
    WHERE poname = $1::text
    `,
    [poname]
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
function deleteReview(start_date, end_date, category, poname, pname, ctuname) {
  return pool.query(`
    UPDATE bids
    SET review = null
    WHERE start_date = $1::date, end_date = $2::date, category = $3::text, poname = $4::text, pname = $5::text, ctuname = $6::text
    `,
    [start_date, end_date, category, poname, pname, ctuname]
  )
}

// DELETE RATING
function deleteRating(start_date, end_date, category, poname, pname, ctuname) {
  return pool.query(`
    UPDATE bids
    SET rating = null
    WHERE start_date = $1::date, end_date = $2::date, category = $3::text, poname = $4::text, pname = $5::text, ctuname = $6::text
    `,
    [start_date, end_date, category, poname, pname, ctuname]
  )
}

// UPDATE REVIEW
function updateReview(start_date, end_date, category, poname, pname, ctuname, review) {
  return pool.query(`
    UPDATE bids
    SET review = $7::text
    WHERE start_date = $1::date, end_date = $2::date, category = $3::text, poname = $4::text, pname = $5::text, ctuname = $6::text
    `,
    [start_date, end_date, category, poname, pname, ctuname, review]
  )
}

// UPDATE RATING
function updateRating(start_date, end_date, category, poname, pname, ctuname, rating) {
  return pool.query(`
    UPDATE bids
    SET rating = $7::int
    WHERE start_date = $1::date, end_date = $2::date, category = $3::text, poname = $4::text, pname = $5::text, ctuname = $6::text
    `,
    [start_date, end_date, category, poname, pname, ctuname, rating]
  )
}

// MARK BID AS SUCCESSFUL
function markBidAsSuccessful(start_date, end_date, category, poname, pname, ctuname) {
  return pool.query(`
    UPDATE bids
    SET is_successful = true
    WHERE start_date = $1::date, end_date = $2::date, category = $3::text, poname = $4::text, pname = $5::text, ctuname = $6::text
    `,
    [start_date, end_date, category, poname, pname, ctuname]
  )
}

exports.getBidAsPetOwner = getBidAsPetOwner;
exports.createBid = createBid;
exports.deleteBid = deleteBid;
exports.updateRating = updateRating;
exports.deleteRating = deleteRating;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;
