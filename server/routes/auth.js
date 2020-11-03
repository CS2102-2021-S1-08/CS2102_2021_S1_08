/**
 * Router for authentication
 */

const router = require("express").Router()
const passport = require("passport")
const { checkAuthenticated, checkNotAuthenticated } = require("../commons/auth")
const { pool } = require("../dbConfig")
const dashboard = require("./dashboard")
const petOwners = require("../models/petOwners")
const careTakers = require("../models/careTakers")
const pcsAdmins = require("../models/pcsAdmins")

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

const registerGet = function (req, res) {
    res.render('register')
}

const registerPost = async function (req, res) {
    let { username, password, confirm_password, type } = req.body

    console.log({
        username,
        password,
        confirm_password,
        type
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
            `SELECT * FROM accounts
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

                    switch (type) {
                        case 'petOwner':
                            petOwners.putPetOwner(username)
                            break;
                        case 'fullTimer':
                            careTakers.putFullTimer(username)
                            break;
                        case 'partTimer':
                            careTakers.putPartTimer(username)
                            break;
                        case 'both_fullTimer':
                            petOwners.putPetOwner(username)
                            careTakers.putFullTimer(username)
                            break;
                        case 'both_partTimer':
                            petOwners.putPetOwner(username)
                            careTakers.putPartTimer(username)
                            break;
                        case 'admin':
                            pcsAdmins.putPcsAdmin(username);
                            break;
                    }
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
router.use('/dashboard', checkNotAuthenticated, dashboard)

module.exports = router;