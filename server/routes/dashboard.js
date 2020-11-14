const router = require("express").Router()
const passport = require("passport")
const pet = require('./pet.js')
const bid = require('./bid.js')
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

router.use('/pets', pet)
router.use('/bids', bid)

module.exports = router;