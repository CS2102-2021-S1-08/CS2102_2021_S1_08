/**
 * Router for authentication
 */

const router = require("express").Router()
const passport = require("passport")
const { checkAuthenticated, checkNotAuthenticated } = require("../commons/auth")
const { pool } = require("../dbConfig")

const loginGet = function (req, res) {
    res.render('login')
}

// TODO rename /users to /auth
const loginPost = passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
})

const logoutGet = function (req, res) {
    req.logOut()
    req.flash('success_msg', 'You have logged out')
    res.redirect('/users/login')
}

const dashboardGet = function (req, res) {
    res.render("dashboard", { user: req.user.username })
}

const registerGet = function (req, res) {
    res.render('register')
}

const registerPost = async function (req, res) {
    let { username, password, confirm_password } = req.body

    console.log({
        username,
        password,
        confirm_password
    })

    let errors = []

    if (!username || !password || !confirm_password) {
        errors.push({ message: "Please enter all fields" })
    }

    if (password.length < 6) {
        errors.push({ message: "Password should be at least 6 characters long" })
    }

    if (password != confirm_password) {
        errors.push({ message: "Password do not match" })
    }

    if (errors.length > 0) {
        res.render('register', { errors })
    } else {
        //passed
        pool.query(
            `SELECT * FROM users
            WHERE username = $1`,
            [username],
            (err, results) => {
                if (err) {
                    console.log(err)
                }
                console.log(results.rows)

                if (results.rows.length > 0) {
                    errors.push({ message: "The username is already taken" })
                    res.render('register', { errors })
                } else {
                    pool.query(
                        `INSERT INTO users (username, password)
                    VALUES ($1, $2)
                    RETURNING username, password`, [username, password], (err, results) => {
                        if (err) {
                            console.log(err)
                        }
                        console.log(results.rows)
                        req.flash('success_msg', "You are now registered. Please log in")
                        res.redirect('/users/login')
                    }
                    )
                }

            }
        )
    }
}

router.route('/login')
    .get(checkAuthenticated, loginGet)
    .post(loginPost)
router.route('/logout')
    .get(logoutGet)
router.route('/register')
    .get(checkAuthenticated, registerGet)
    .post(registerPost)
router.route('/dashboard')
    .get(checkNotAuthenticated, dashboardGet)

module.exports = router;