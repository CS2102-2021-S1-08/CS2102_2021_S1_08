/**
 * Model for bids
 */ 

// TODO SQL QUERIES
// CREATE TABLE 

// GET
function getBid(start_date, end_date, category, pname) {
    // async/await
    const query = 'SELECT * FROM bids WHERE start_date=$1, end_date=$2, category=$3, pname = $4'
    const values = [start_date, end_date, category, pname]

    try {
        const res = await client.query(query, values)
        console.log(res.rows[0])
    } catch (err) {
        console.log(err.stack)
    }
}

// POST
function createBid(start_date, end_date, category, pname, bid_start_date, bid_end_date) {
  let result = false

  pool.query(`
    INSERT INTO bids
    VALUES ($1::date, $2::date, $3::text, $4::text, $5::text, $6::text, null, null, false)
    `,
    [start_date, end_date, category, pname, bid_start_date, bid_end_date],
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
// function deleteBid(start_date, end_date, category, pname) {