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
  getMonthlySummariesForCareTaker
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

function getMonthlySummariesForCareTakerController(req, res) {
  getMonthlySummariesForCareTaker(req.user.username)
    .then(data => {
      res.render('summary', { user: req.user.username, usertype: req.user.usertype, data: data.rows })
    })
    .catch(err => {
      res.render('error', { message: "Error", error: err })
    });
}

// router
//   .route("/admin")
//   .get(checkAuthenticatedAsAdmin, viewMonthlySummaryAsAdmin);
// router
//   .route("/me")
//   .get(
//     checkAuthenticatedAsCareTaker,
//     viewMonthlySummaryForCurrentYearMonthAsCaretaker
//   );

router.route("/")
  .get(getMonthlySummariesForCareTakerController);

module.exports = router;
