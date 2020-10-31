/**
 * Model for availabilities 
 */ 

// TODO SQL QUERIES
// CREATE TABLE 
exports.create_query = `
 CREATE TABLE IF NOT EXISTS availability {
  username VARCHAR(50) REFERENCES caretaker(username)
  start_date DATE,
  end_date DATE,
  category VARCHAR(50) REFEReNCES baseprice(category),
  price INT,
  PRIMARY KEY(username, start_date, end_date, category)
 } 
`

// GET
// POST
// DELETE