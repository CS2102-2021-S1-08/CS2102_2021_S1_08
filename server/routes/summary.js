/**
 * Router for monthly summaries
 */

const router = require("express").Router();
const {
  checkAuthenticatedAsAdmin,
  checkAuthenticatedAsCareTaker,
} = require("../commons/auth");
const {
  getMonthlySummary,
  getAllMonthlySummary,
} = require("../models/summary");

module.exports = router;
// TODO: use middleware checkAuthenticatedAsAdmin
// TODO: Admin can view monthly summaries
async function viewMonthlySummaryAsAdmin(req, res) {
  let results = await getAllMonthlySummary();

  res.render("adminSummary", {
    user: req.user["username"],
    data: results,
  });
}

// TODO: use middleware checkAuthenticatedAsCareTaker
// TODO: Care Taker can view their own monthly sumary
async function viewMonthlySummaryForCurrentYearMonthAsCaretaker(req, res) {
  let d = new Date();

  let result = await getMonthlySummary(
    req.user["username"],
    d.getFullYear(),
    // Bug fix
    d.getMonth() + 1
  );

  let longMonth = d.toLocaleString("en-us", { month: "long" });

  console.log(result);

  res.render("summary", {
    user: result["user"],
    year: result["year"],
    month: longMonth,
    days: result["pet_days"],
    salary: result["salary"],
  });
}

router
  .route("/admin")
  .get(checkAuthenticatedAsAdmin, viewMonthlySummaryAsAdmin);
router
  .route("/me")
  .get(
    checkAuthenticatedAsCareTaker,
    viewMonthlySummaryForCurrentYearMonthAsCaretaker
  );

module.exports = router;
