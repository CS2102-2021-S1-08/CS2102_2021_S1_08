/**
 * Router for availabilities 
 */
const { getAllAvailabilitiesForCareTaker, deleteAvailabilty, createAvailability } = require("../models/availability");

const router = require("express").Router()

function getController(req, res) {
  getAllAvailabilitiesForCareTaker(req.user.username)
    .then(data => {
      res.render('availability', { user: req.user.username, usertype: req.user.usertype, data: data.rows })
    })
    .catch(err => {
      res.render('error', { error: err })
    });
}

function postController(req, res) {
  createAvailability(req.user.username, new Date(req.body.start_date), new Date(req.body.end_date)  , req.body.category)
    .then(data => {
      getAllAvailabilitiesForCareTaker(req.user.username)
        .then(data => {
          res.render('availability', { user: req.user.username, usertype: req.user.usertype, data: data.rows })
        })
        .catch(err => {
          res.render('error', { message: "Error", error: err })
      })
    })
    .catch(err => {
      res.status(200);
      res.redirect("back");
    })
}

function deleteController(req, res) {
  deleteAvailabilty(req.user.username, new Date(req.body.start_date), new Date(req.body.end_date), req.body.category)
    .then(data => {
      getAllAvailabilitiesForCareTaker(req.user.username)
        .then(data => {
          res.render('availability', { user: req.user.username, usertype: req.user.usertype, data: data.rows })
        })
        .catch(err => {
          res.render('error', { message: "Error", error: err })
      })
    })
    .catch(err => {
      res.render('error', { message: "Error", error: err })
    })
}

// TODO: Add authentication middleware NOT A PRIORITY
router.route("/")
  .get(getController)
  .post(postController);

router.route("/delete")
  .post(deleteController);

module.exports = router;