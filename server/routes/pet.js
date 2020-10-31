/**
 * Router for pets
 */ 

const router = require("express").Router()
const passport = require("passport")
const pets = require("../models/pet")
const { checkNotAuthenticatedAsPetOwner } = require("../commons/auth")

const getPets = function (req, res) {
    pets.get(req.user.username).then(data => res.render('pets', {user:req.user.username, data}))
}

const postPets = function (req, res) {
    pets.post(req.user.username, req.body.pname, req.body.profile, req.body.category, req.body.special_requirements)
    res.status(200).end()
}

const deletePets = function (req, res) {

}
// router.route('/')
//     .get(checkAuthenticatedAsPetOwner, getPets)
//     .post(checkAuthenticatedAsPetOwner, postPets())
//     .delete(checkAuthenticatedAsPetOwner, deletePets())

// TODO: use middleware checkAuthenticatedAsPetOwner
// TODO: Pet Owner can view their pets (GET)
// TODO: Pet Owner can add new pets (POST)
// TODO: Pet Owner can remove pets (DELETE)

module.exports = router;