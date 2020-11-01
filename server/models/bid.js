/**
 * Model for bids
 */ 

const { pool } = require("../dbConfig");

// GET BID
function getBid(start_date, end_date, category, pname) {
  return pool.query(`
    SELECT *
    FROM bids
    WHERE start_date = $1::date, end_date = $2::date, category = $3::text, pname = $4::text
    `,
    [start_date, end_date, category, pname]
  )
}

// POST BID
function createBid(start_date, end_date, category, pname, bid_start_date, bid_end_date) {
  return pool.query(`
    INSERT INTO bids
    VALUES ($1::date, $2::date, $3::text, $4::text, $5::text, $6::text, null, null, false)
    `,
    [start_date, end_date, category, pname, bid_start_date, bid_end_date],
  )
}

// DELETE BID
function deleteBid(start_date, end_date, category, pname) {
  return pool.query(`
    DELETE FROM bids
    WHERE start_date = $1::date, end_date = $2::date, category = $3::text, pname = $4::text
    `,
    [start_date, end_date, category, pname]
  )
}

// ADD REVIEW
function addReview(start_date, end_date, category, pname, review) {
  return pool.query(`
    UPDATE bids
    SET review = $1::text
    WHERE start_date = $2::date, end_date = $3::date, category = $4::text, pname = $5::text
    `,
    [review, start_date, end_date, category, pname],
  )
}

// ADD RATING
function addRating(start_date, end_date, category, pname, rating) {
  return pool.query(`
    UPDATE bids
    SET rating = $1::int
    WHERE start_date = $2::date, end_date = $3::date, category = $4::text, pname = $5::text
    `,
    [rating, start_date, end_date, category, pname],
  )
}

// DELETE REVIEW
function deleteReview(start_date, end_date, category, pname, review) {
  return pool.query(`
    UPDATE bids
    SET review = null
    WHERE start_date = $1::date, end_date = $2::date, category = $3::text, pname = $4::text
    `,
    [start_date, end_date, category, pname],
  )
}

// DELETE RATING
function deleteRating(start_date, end_date, category, pname, rating) {
  return pool.query(`
    UPDATE bids
    SET rating = null
    WHERE start_date = $1::date, end_date = $2::date, category = $3::text, pname = $4::text
    `,
    [start_date, end_date, category, pname],
  )
}

exports.getBid = getBid;
exports.createBid = createBid;
exports.deleteBid = deleteBid;
exports.addRating = addRating;
exports.deleteRating = deleteRating;
exports.addReview = addReview;
exports.deleteReview = deleteReview;
