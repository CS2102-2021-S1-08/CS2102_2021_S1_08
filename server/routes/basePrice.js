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

// TODO: use middleware checkAuthenticatedAsAdmin
// TODO: Admin can view base prices
async function viewAllBasePricesAsAdmin(req, res) {
    let results = await viewAllBasePrices();
  
    res.render("basePrices", {
      user: req.user["username"],
      data: results,
    });
  }

// TODO: Admin can add new base prices
async function addNewBasePriceAsAdmin(req, res) {
    let { category, price } = req.body

    let results = await createBasePrice(category, price);  

    res.render("basePrices", {
      user: req.user["username"],
      data: results,
    });
  }

// TODO: Admin can modify base prices
async function updateBasePriceAsAdmin(req, res) {
    let { category, price } = req.body

    let results = await updateBasePrice(category, price);  

    res.render("basePrices", {
      user: req.user["username"],
      data: results,
    });
  }

// TODO: Admin can remove base prices
async function removeBasePriceAsAdmin(req, res) {
    let { category } = req.body

    let results = await deleteBasePrice(category);  

    res.render("basePrices", {
      user: req.user["username"],
      data: results,
    });
  }

module.exports = router;