/**
 * Router for authentication
 */

const router = require("express").Router()
const passport = require("passport")
const { checkAuthenticated, checkNotAuthenticated } = require("../commons/auth")
const { pool } = require("../dbConfig")
const dashboard = require("./dashboard")
const { createPCSAdmin, createUser } = require("../models/users");
const e = require("express")

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

    let usertype = {
        admin: type === 'admin',
        petowner: type === 'petowner' || type === 'petownerandfulltimer' || type === 'petownerandparttimer',
        caretaker: type === 'fulltimer' || type === 'parttimer' || type === 'petownerandfulltimer' || type === 'petownerandparttimer',
        fulltime: type === 'fulltimer' || type === 'petownerandfulltimer'
    }

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
                    if (usertype.admin) {
                        createPCSAdmin(username, password).then(results => {
                            console.log(results.rows)
                            req.flash('success_msg', "You are now registered. Please log in")
                            res.redirect('/users/login')
                        }).catch(err => {
                            res.render('error', { message: "Error", error: err })
                        });
                    } else {
                        createUser(username, password, usertype).then(results => {
                            console.log(results.rows)
                            req.flash('success_msg', "You are now registered. Please log in")
                            res.redirect('/users/login')
                        }).catch(err => {
                            res.render('error', { message: "Error", error: err })
                        });
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