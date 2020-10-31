/**
 * Collection of authentication middleware
 */

const { pool } = require("../dbConfig");

exports.checkAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/dashboard");
  }
  return next();
};

exports.checkNotAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/login");
};

exports.checkAuthenticatedAsAdmin = function (req, res, next) {
  pool.query(
    "SELECT * FROM pcs_admins WHERE username=$1::text",
    [req.user["username"]],
    (err, result) => {
      if (result.rows.length > 0) {
        next();
      } else {
        res.render("error", { message: "Not authenticated as Admin" });
      }
    }
  );
};

exports.checkAuthenticatedAsCareTaker = function (req, res, next) {
  pool.query(
    `SELECT * FROM care_takers WHERE username = $1::text`,
    [req.user["username"]],
    (err, res) => {
      if (res.rows.length > 0) {
        next();
      } else {
        res.render("error", { message: "Not authenticated as care taker" });
      }
    }
  );
};

exports.checkNotAuthenticatedAsPetOwner = function (req, res, next) {
  pool.query(
    `SELECT * FROM pet_owners WHERE username = $1::text`,
    [req.user["username"]],
    (err, res) => {
      if (res.rows.length > 0) {
        next();
      } else {
        res.render("error", { message: "Not authenticated as pet owner" });
      }
    }
  );
};
