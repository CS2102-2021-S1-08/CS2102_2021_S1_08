/**
 * Router for pets
 */ 

const router = require("express").Router()
const passport = require("passport")
const pets = require("../models/pet")
const { checkNotAuthenticatedAsPetOwner } = require("../commons/auth")

const getPets = function (req, res) {
    pets.get(req.user.username).then(data => {
        console.dir(data.rows)
        res.render('pets', {user:req.user.username, data: data.rows})
    })
}

const postPets = function (req, res) {
    pets.post(req.user.username, req.body.pname, req.body.profile, req.body.category, req.body.special_requirements)
    res.status(200)
    res.redirect('back')
}

const deletePets = function (req, res) {
    console.log(req.body.pname)
    pets.delete(req.user.username, req.body.pname)
    res.status(200)
    res.redirect('back')
}
 router.route('/')
     .get(getPets)
     .post(postPets)
     .delete(deletePets)

router.route('/delete')
    .post(deletePets)

// TODO: use middleware checkAuthenticatedAsPetOwner
// TODO: Pet Owner can view their pets (GET)
// TODO: Pet Owner can add new pets (POST)
// TODO: Pet Owner can remove pets (DELETE)

module.exports = router;