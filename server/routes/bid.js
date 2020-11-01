/**
 * Router for bids
 */ 

const router = require("express").Router()
const {
    checkAuthenticatedAsCareTaker,
    checkAuthenticatedAsPetOwner,
  } = require("../commons/auth");
  const {
    getBidAsPetOwner,
    createBid,
    deleteBid,
    updateRating,
    deleteRating,
    updateReview,
    deleteReview,
    markBidAsSuccessful
  } = require("../models/bid");

// TODO: use middleware checkAuthenticatedAsPetOwner
// TODO: Pet owner can get all bids they have made (GET)
async function getBidsAsPetOwner(req, res) {
    let results = await getBidAsPetOwner(req.user["username"]);
  
    res.render("bidsMade", {
        user: req.user["username"],
        data: results,
    });
  }

// TODO: Pet owner can place a bid (POST)
const placeBidAsPetOwner = function (req, res) {
    let results = await createBid(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname, 
        new Date(req.body.bid_start_date), 
        new Date(req.body.bid_end_date)
    );

    res.render("bidPlaced", {
        user: req.user["username"],
        data: results,
    });
}

// TODO: Pet owner can delete a bid (DELETE)
const deleteBidAsPetOwner = function (req, res) {
    let results = await deleteBid(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname
    );

    res.render("bidDeleted", {
        user: req.user["username"],
        data: results,
    });
}

// TODO: Pet owner can add a review/rating
const addReviewAsPetOwner = function (req, res) {
    let results = await updateReview(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname,
        req.body.review
    );

    res.render("reviewAdded", {
        user: req.user["username"],
        data: results,
    });
}

const addRatingAsPetOwner = function (req, res) {
    let results = await updateRating(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname,
        req.body.rating
    );

    res.render("reviewModified", {
        user: req.user["username"],
        data: results,
    });
}

// TODO: Pet owner can modify a review/rating
const modifyReviewAsPetOwner = function (req, res) {
    let results = await updateReview(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname,
        req.body.review
    );

    res.render("reviewModified", {
        user: req.user["username"],
        data: results,
    });
}

const modifyRatingAsPetOwner = function (req, res) {
    let results = await updateRating(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname,
        req.body.rating
    );

    res.render("ratingModified", {
        user: req.user["username"],
        data: results,
    });
}

// TODO: Pet owner can delete a review/rating
const deleteReviewAsPetOwner = function (req, res) {
    let results = await deleteReview(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname,
        req.body.review
    );

    res.render("reviewModified", {
        user: req.user["username"],
        data: results,
    });
}

const deleteRatingAsPetOwner = function (req, res) {
    let results = await deleteRating(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname,
        req.body.rating
    );

    res.render("ratingModified", {
        user: req.user["username"],
        data: results,
    });
}

// TODO: use middleware checkAuthenticaedAsCareTaker
// TODO: Care Taker can accept a bid (PUT)
const acceptBidAsCareTaker = function (req, res) {
    let results = await markBidAsSuccessful(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname
    );

    res.render("bidMarkedAsSuccessful", {
        user: req.user["username"],
        data: results,
    });
}

module.exports = router;