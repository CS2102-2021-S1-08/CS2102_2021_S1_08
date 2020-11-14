/**
 * Router for base prices
 */ 

const router = require("express").Router()

const {
    checkAuthenticatedAsAdmin,
  } = require("../commons/auth");
  const Bid = require("../models/bid");
  const { getAllAvailabilitiesForPetOwner } = require("../models/availability")

  function getAvailabilitiesForPetOwnerController(req, res) {
    getAllAvailabilitiesForPetOwner(req.user.username, new Date(req.body.bid_date), req.body.category)
        .then(data => {
            res.render('bidFindAvailability', { user: req.user.username, usertype: req.user.usertype, data: data.rows, bid_date: req.body.bid_date })
        })
        .catch(err => {
            res.render('error',  { message: "Error", error: err })
        });
  }

  function getBidForPetOwnerController(req, res) {
    Bid.getBidsForPetOwner(req.user.username)
      .then(data => {
        res.render('bidPetOwner', { 
          user: req.user.username, 
          usertype: req.user.usertype, 
          data1: data.rows.filter(row => !row.is_successful || row.is_successful === 'false'),
          data2: data.rows.filter(row => row.is_successful || row.is_successful === 'true')  
        })
      })
      .catch(err => {
        res.render('error',  { message: "Error", error: err })
      });
  }
  
  function postBidForPetOwnerController(req, res) {
    Bid.createBid(new Date(req.body.start_date), new Date(req.body.end_date), req.body.category, req.user.username, req.body.pname, req.body.ctuname, new Date(req.body.bid_date))
      .then(data => {
        Bid.getBidsForPetOwner(req.user.username)
          .then(data => {
            res.render('bidPetOwner', { 
              user: req.user.username, 
              usertype: req.user.usertype, 
              data1: data.rows.filter(row => !row.is_successful || row.is_successful === 'false'),
              data2: data.rows.filter(row => row.is_successful || row.is_successful === 'true')  
            })
          })
          .catch(err => {
            res.render('error', { message: "Error", error: err })
        })
      })
      .catch(err => {
        res.render('error', { message: "Error",error: err })
      })
  }
  
  function updateBidForPetOwnerController(req, res) {
    Bid.updateBidForPetOwner(new Date(req.body.start_date), new Date(req.body.end_date), req.body.category, req.user.username, req.body.pname, req.body.ctuname, new Date(req.body.bid_date), req.body.review || null, req.body.rating || null)
      .then(data => {
        Bid.getBidsForPetOwner(req.user.username)
          .then(data => {
            res.render('bidPetOwner', { 
              user: req.user.username, 
              usertype: req.user.usertype, 
              data1: data.rows.filter(row => !row.is_successful || row.is_successful === 'false'),
              data2: data.rows.filter(row => row.is_successful || row.is_successful === 'true')  
            })
          })
          .catch(err => {
            res.render('error', { message: "Error", error: err })
        })
      })
      .catch(err => {
        res.render('error', { message: "Error",error: err })
      })
  }

  function deleteBidForPetOwnerController(req, res) {
    Bid.deleteBid(new Date(req.body.start_date), new Date(req.body.end_date), req.body.category, req.user.username, req.body.pname, req.body.ctuname, new Date(req.body.bid_date))
      .then(data => {
        Bid.getBidsForPetOwner(req.user.username)
          .then(data => {
            res.render('bidPetOwner', { 
              user: req.user.username, 
              usertype: req.user.usertype, 
              data1: data.rows.filter(row => !row.is_successful || row.is_successful === 'false'),
              data2: data.rows.filter(row => row.is_successful || row.is_successful === 'true')  
            })
          })
          .catch(err => {
            res.render('error', { message: "Error", error: err })
        })
      })
      .catch(err => {
        res.render('error', { message: "Error", error: err })
      })
  }

  function getBidForCareTakerController(req, res) {
    Bid.getBidsForCareTaker(req.user.username)
      .then(data => {
        res.render('bidCareTaker', { 
          user: req.user.username, 
          usertype: req.user.usertype, 
          data1: data.rows.filter(row => !row.is_successful || row.is_successful === 'false'),
          data2: data.rows.filter(row => row.is_successful || row.is_successful === 'true')  
        })
      })
      .catch(err => {
        res.render('error',  { message: "Error", error: err })
      });
  }
  
  function updateBidForCareTakerControler(req, res) {
    Bid.updateBidForCareTaker(new Date(req.body.start_date), new Date(req.body.end_date), req.body.category, req.body.poname, req.body.pname, req.user.username, new Date(req.body.bid_date), req.body.is_successful)
      .then(data => {
        Bid.getBidsForCareTaker(req.user.username)
          .then(data => {
            res.render('bidCareTaker', { 
              user: req.user.username, 
              usertype: req.user.usertype, 
              data1: data.rows.filter(row => !row.is_successful || row.is_successful === 'false'),
              data2: data.rows.filter(row => row.is_successful || row.is_successful === 'true')  
            })
          })
          .catch(err => {
            res.render('error', { message: "Error", error: err })
        })
      })
      .catch(err => {
        res.render('error', { message: "Error",error: err })
      })
  }
  
  // TODO: Add authentication middleware NOT A PRIORITY
  router.route("/petOwner")
    .get(getBidForPetOwnerController)
    .post(postBidForPetOwnerController);

  router.route("/petOwner/update")
    .post(updateBidForPetOwnerController);

  router.route("/petOwner/delete")
    .post(deleteBidForPetOwnerController);

  router.route("/careTaker")
    .get(getBidForCareTakerController)

  router.route("/careTaker/update")
    .post(updateBidForCareTakerControler);
  
  router.route("/find")
    .get(function(req, res) { res.render('bidFindAvailability', { user: req.user.username, usertype: req.user.usertype, data: [] }) })
    .post(getAvailabilitiesForPetOwnerController)


  module.exports = router;