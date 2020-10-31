const router = require("express").Router()
const passport = require("passport")
const pet = require('./pet.js')
const { checkAuthenticated, checkNotAuthenticated } = require("../commons/auth")
const { pool } = require("../dbConfig")

const dashboardGet = function (req, res) {
    console.log(req.body)
    res.render("dashboard", { user: req.user.username })
};

router.get('/', (req, res) => dashboardGet(req, res));

router.use('/pets', pet)

module.exports = router;