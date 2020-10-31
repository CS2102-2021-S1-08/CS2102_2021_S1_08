/**
 * Router for pets
 */ 

const router = require("express").Router()
const pets = require("../models/pet")
const { checkAuthenticatedAsPetOwner } = require("../commons/auth")

router.route('/')
    .get(checkAuthenticatedAsPetOwner, pets.getAllPets)
    .post(loginPost)
// TODO: use middleware checkAuthenticatedAsPetOwner
// TODO: Pet Owner can view their pets (GET)
// TODO: Pet Owner can add new pets (POST)
// TODO: Pet Owner can remove pets (DELETE)

module.exports = router;