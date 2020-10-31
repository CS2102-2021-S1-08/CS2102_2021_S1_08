/**
 * Collection of authentication middleware 
 */

const { pool } = require("../dbConfig")

exports.checkAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
      return res.redirect('/users/dashboard')
  }
  return next()
}

exports.checkNotAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
      return next()
  }
  res.redirect('/users/login')
}

exports.checkNotAuthenticatedAsAdmin = function (req, res, next) {
  pool.query(`SELECT * FROM pcs_admins WHERE username = $1::text`,
    [req.user],
    (err, res) => {
      if (results.rows.length > 0) {
        next()
      } else {
        res.render('error', { message: 'Not authenticated as Admin' })
      }
    }
  )
}

exports.checkAuthenticatedAsCareTaker = function (req, res, next) {
  pool.query(`SELECT * FROM pcs_admins WHERE username = $1::text`,
    [req.user],
    (err, res) => {
      if (results.rows.length > 0) {
        next()
      } else {
        res.render('error', { message: "Not authenticated as Admin" })
      }
    }
  )
}

exports.checkAuthenticatedAsPetOwner = function (req, res, next) {
  pool.query(`SELECT * FROM pcs_admins WHERE username = $1::text`,
    [req.user],
    (err, res) => {
      if (results.rows.length > 0) {
        next()
      } else {
        res.render('error', { message: "Not authenticated as Admin" })
      }
    }
  )
}