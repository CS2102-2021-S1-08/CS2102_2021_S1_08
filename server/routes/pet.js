/**
 * Router for pets
 */ 

const router = require("express").Router()
const pets = require("../models/pet")
const { checkAuthenticatedAsPetOwner } = require("../commons/auth")

const getPets = function (req, res) {
    getPets(username).then(data => res.render('pets', {user:req.user.username, data}))
}

const postPets = function (req, res) {

}

const deletePets = function (req, res) {

}
router.route('/')
    .get(checkAuthenticatedAsPetOwner, getPets)
    .post(checkAuthenticatedAsPetOwner, postPets)
    .delete(checkAuthenticatedAsPetOwner, deletePets)

// TODO: use middleware checkAuthenticatedAsPetOwner
// TODO: Pet Owner can view their pets (GET)
// TODO: Pet Owner can add new pets (POST)
// TODO: Pet Owner can remove pets (DELETE)

module.exports = router;