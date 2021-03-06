/**
 * Router for leaves
 */

const { getAllLeaves, createLeave, deleteLeave } = require('../models/leaves');

const router = require("express").Router();

function getController(req, res) {
  getAllLeaves(req.user.username)
    .then(data => {
      res.render('leave', { user: req.user.username, usertype: req.user.usertype, data: data.rows })
    })
    .catch(err => {
      res.render('error', { message: "Error", error: err })
    });
}

function postController(req, res) {
  createLeave(req.user.username, new Date(req.body.leave_date))
    .then(data => {
      getAllLeaves(req.user.username)
        .then(data => {
          res.render('leave', { user: req.user.username, usertype: req.user.usertype, data: data.rows })
        })
        .catch(err => {
          res.render('error', { message: "Error", error: err })
      })
    })
    .catch(err => {
      res.render('error', { message: "Error",error: err })
    })
}

function deleteController(req, res) {
  deleteLeave(req.user.username, new Date(req.body.leave_date))
    .then(data => {
      getAllLeaves(req.user.username)
        .then(data => {
          res.render('leave', { user: req.user.username, usertype: req.user.usertype, data: data.rows })
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