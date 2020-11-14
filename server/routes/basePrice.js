/**
 * Router for base prices
 */ 

const router = require("express").Router()

const {
    checkAuthenticatedAsAdmin,
  } = require("../commons/auth");
  const {
    getBasePrice,
    createBasePrice,
    deleteBasePrice,
    viewAllBasePrices,
    updateBasePrice
  } = require("../models/basePrice");

  function getController(req, res) {
    viewAllBasePrices()
      .then(data => {
        res.render('basePrice', { user: req.user.username, usertype: req.user.usertype, data: data.rows })
      })
      .catch(err => {
        res.render('error',  { message: "Error", error: err })
      });
  }
  
  function postController(req, res) {
    createBasePrice(req.body.category, req.body.price)
      .then(data => {
        viewAllBasePrices()
          .then(data => {
            res.render('basePrice', { user: req.user.username, usertype: req.user.usertype, data: data.rows })
          })
          .catch(err => {
            res.render('error', { message: "Error", error: err })
        })
      })
      .catch(err => {
        res.render('error', { message: "Error",error: err })
      })
  }
  
  function updateController(req, res) {
    updateBasePrice(req.body.category, req.body.price)
      .then(data => {
        viewAllBasePrices()
          .then(data => {
            res.render('basePrice', { user: req.user.username, usertype: req.user.usertype, data: data.rows })
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
    deleteBasePrice(req.body.category)
      .then(data => {
        viewAllBasePrices()
          .then(data => {
            res.render('basePrice', { user: req.user.username, usertype: req.user.usertype, data: data.rows })
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
    .post(postController)

  router.route("/update")
    .post(updateController)

  router.route("/delete")
    .post(deleteController);
  
  module.exports = router;