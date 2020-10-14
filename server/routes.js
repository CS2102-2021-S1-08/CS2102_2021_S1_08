const router = require('express').Router()

var userController = require('./controllers/usersController')

router.route('/login')
    .get(checkAuthenticated, userController.loginGet)
    .post(userController.loginPost)
router.route('/logout')
    .get(userController.logoutGet)
router.route('/register')
    .get(checkAuthenticated, userController.registerGet)
    .post(userController.registerPost)
router.route('/dashboard')
    .get(checkNotAuthenticated, userController.dashboardGet)


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/dashboard')
    }
    next()
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/users/login')
}

module.exports = router;