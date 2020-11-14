/**
 * Router for availabilities
 */
const {
  getAllAvailabilitiesForCareTaker,
  deleteAvailabilty,
  createAvailability,
} = require("../models/availability");

const { getAllCategories } = require("../models/basePrice");

const router = require("express").Router();

async function getController(req, res) {
  let categories = await getAllCategories();

  // console.log(categories);

  getAllAvailabilitiesForCareTaker(req.user.username)
    .then((data) => {
      res.render("availability", {
        user: req.user.username,
        usertype: req.user.usertype,
        data: data.rows,
        categories: categories.rows,
      });
    })
    .catch((err) => {
      res.render("error", { error: err });
    });
}

async function postController(req, res) {
  let categories = await getAllCategories();

  createAvailability(
    req.user.username,
    new Date(req.body.start_date),
    new Date(req.body.end_date),
    req.body.category
  )
    .then(
      (data) => {
      getAllAvailabilitiesForCareTaker(req.user.username)
        .then((data) => {
          console.log(data);
          res.render("availability", {
            user: req.user.username,
            usertype: req.user.usertype,
            data: data.rows,
            categories: categories.rows,
          });
        })
        .catch((err) => {
          res.render("error", { message: "Error", error: err });
        });
    })
    .catch((err) => {
      res.status(200);
      res.redirect("back");
    });
}

async function deleteController(req, res) {
  let categories = await getAllCategories();

  deleteAvailabilty(
    req.user.username,
    new Date(req.body.start_date),
    new Date(req.body.end_date),
    req.body.category
  )
    .then((data) => {
      getAllAvailabilitiesForCareTaker(req.user.username)
        .then((data) => {
          res.render("availability", {
            user: req.user.username,
            usertype: req.user.usertype,
            data: data.rows,
            categories: categories.rows,
          });
        })
        .catch((err) => {
          res.render("error", { message: "Error", error: err });
        });
    })
    .catch((err) => {
      res.render("error", { message: "Error", error: err });
    });
}

// TODO: Add authentication middleware NOT A PRIORITY
router.route("/").get(getController).post(postController);

router.route("/delete").post(deleteController);

module.exports = router;
