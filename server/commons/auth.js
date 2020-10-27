/**
 * Collection of authentication middleware 
 */

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

exports.checkAuthenticatedAsAdmin = function (req, res, next) {
  // TODO
}

exports.checkAuthenticatedAsCareTaker = function (req, res, next) {
  // TODO
}

exports.checkAuthenticatedAsPetOwner = function (req, res, next) {
  // TODO
}