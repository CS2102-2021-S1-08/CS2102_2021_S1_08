/**
 * Model for monthly summaries
 */ 

// TODO SQL QUERIES
// CREATE TABLE 

// GET
function getMonthlySummary(ctname, year, month) {
    // async/await
    const query = 'SELECT * \
                    FROM monthly_summary \
                    WHERE ctname=$1, year=$2, month=$3'
    const values = [ctname, year, month]

    try {
        const res = await client.query(query, values)
        console.log(res.rows[0])
    } catch (err) {
        console.log(err.stack)
    }
}

// POST
// function createMonthlySummary() {}

// DELETE
// function deleteMonthlySummary(ctname, year, month) {
    
// }