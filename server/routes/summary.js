/**
 * Router for monthly summaries
 */

const router = require("express").Router();
const {
  checkAuthenticatedAsAdmin: checkNotAuthenticatedAsAdmin,
  checkAuthenticatedAsCareTaker,
} = require("../commons/auth");
const { getMonthlySummary } = require("../models/summary");

module.exports = router;
// TODO: use middleware checkAuthenticatedAsAdmin
// TODO: Admin can view monthly summaries
async function accessMonthlySummary(req, res) {
  console.log(getMonthlySummary("caretaker1", 2020, 10));
  return getMonthlySummary("caretaker1", 2020, 10);
}

// TODO: use middleware checkAuthenticatedAsCareTaker
// TODO: Care Taker can view their own monthly sumary
async function accessMonthlySummaryForCurrentYearMonthAsCaretaker(req, res) {
  return getMonthlySummary("caretaker1", 2020, 10);
}

router.route("/").get(checkNotAuthenticatedAsAdmin, accessMonthlySummary);
router.route("/mysummary").get(checkNotAuthenticatedAsAdmin, accessMonthlySummary);

module.exports = router;
