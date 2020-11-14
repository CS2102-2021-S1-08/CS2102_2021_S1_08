const router = require("express").Router()
const passport = require("passport")
const { checkAuthenticated, checkAuthenticated: checkNotAuthenticated } = require("../commons/auth")
const { pool } = require("../dbConfig")
const { getUserType } = require("../models/users");

const accountType = function(req,res){
    let result = getUserType(req.user.username)
    result.then(response => {return response.rows[0]})
}
const dashboardGet = function (req, res) {
    console.log(req.body)
    let result = getUserType(req.user.username)
    result.then(response => res.render("dashboard", { user: req.user.username, account: response.rows[0].coalesce}))
};

router.get('/', (req, res) => dashboardGet(req, res));

module.exports = router;