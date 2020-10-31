const router = require("express").Router()
const passport = require("passport")
const { checkAuthenticated, checkNotAuthenticated } = require("../commons/auth")
const { pool } = require("../dbConfig")

const dashboardGet = function (req, res) {
    res.render("dashboard", { user: req.user.username })
};

router.get('/', (req, res) => dashboardGet(req, res));

module.exports = router;