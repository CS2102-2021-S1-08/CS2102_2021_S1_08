/**
 * Router for caretakers
 */

const router = require("express").Router();

const {
  getCareTakerTotalPetDays,
  getCareTakerTotalPetDaysForMonth,
} = require("../models/careTakers");

async function viewCareTakerTotalPetDays(req, res) {
  let d = new Date();
  let month = d.getMonth() + 1;

  let resultsGetCareTakerTotalPetDays = await getCareTakerTotalPetDays(
    req.user["username"]
  );

  let resultsGetCareTakerTotalPetDaysForMonth = await getCareTakerTotalPetDaysForMonth(
    req.user["username"],
    month
  );

  res.render("careTaker", {
    user: req.user["username"],
    usertype: req.user.usertype,
    petDays: resultsGetCareTakerTotalPetDays["total_pet_days"],
    monthPetDays: parseInt(
      resultsGetCareTakerTotalPetDaysForMonth["pet_days_for_month"]
    ),
  });
}

router.route("/info").get(viewCareTakerTotalPetDays);

module.exports = router;
