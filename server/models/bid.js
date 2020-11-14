/**
 * Model for bids
 */ 

const { pool } = require("../dbConfig");

// GET BID
function getBidsForPetOwner(poname) {
  return pool.query(`
    SELECT *
    FROM bids
    WHERE poname = $1::text
    `,
    [poname]
  )
}

function getBidsForCareTaker(ctuname) {
  return pool.query(`
    SELECT *
    FROM bids
    WHERE ctuname = $1::text
    `,
    [ctuname]
  )
} 

// POST BID
function createBid(start_date, end_date, category, poname, pname, ctuname, bid_date) {
  return pool.query(`
    INSERT INTO bids
    VALUES ($1::date, $2::date, $3::text, $4::text, $5::text, $6::text, $7::date, null, null, false)
    `,
    [start_date, end_date, category, poname, pname, ctuname, bid_date]
  )
}

// DELETE BID
function deleteBid(start_date, end_date, category, poname, pname, ctuname, bid_date) {
  return pool.query(`
    DELETE FROM bids
    WHERE start_date = $1::date 
    AND end_date = $2::date
    AND category = $3::text
    AND poname = $4::text
    AND pname = $5::text
    AND ctuname = $6::text
    AND bid_date = $7::date
    `,
    [start_date, end_date, category, poname, pname, ctuname, bid_date]
  )
}

// UPDATE BID
function updateBidForPetOwner(start_date, end_date, category, poname, pname, ctuname, bid_date, review, rating) {
  return pool.query(`
    UPDATE bids
    SET 
    review = $8::text,
    rating = $9::int
    WHERE start_date = $1::date 
    AND end_date = $2::date
    AND category = $3::text
    AND poname = $4::text
    AND pname = $5::text
    AND ctuname = $6::text
    AND bid_date = $7::date
    `,
    [start_date, end_date, category, poname, pname, ctuname, bid_date, review, rating]
  )
}

function updateBidForCareTaker(start_date, end_date, category, poname, pname, ctuname, bid_date, is_successful) {
  return pool.query(`
    UPDATE bids
    SET is_successful = $8::boolean
    WHERE start_date = $1::date 
    AND end_date = $2::date
    AND category = $3::text
    AND poname = $4::text
    AND pname = $5::text
    AND ctuname = $6::text
    AND bid_date = $7::date
    `,
    [start_date, end_date, category, poname, pname, ctuname, bid_date, is_successful]
  )
}

exports.getBidsForPetOwner = getBidsForPetOwner;
exports.getBidsForCareTaker = getBidsForCareTaker;
exports.createBid = createBid;
exports.deleteBid = deleteBid;
exports.updateBidForCareTaker = updateBidForCareTaker;
exports.updateBidForPetOwner = updateBidForPetOwner;