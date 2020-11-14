const express = require("express");
const app = express();
const session = require("express-session");
var bodyParser = require("body-parser");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("./passportConfig");
const availabilityRouter = require("./routes/availability");
const authRouter = require("./routes/auth");
const basePriceRouter = require("./routes/basePrice");
const leaveRouter = require("./routes/leaves");
const careTakerRouter = require("./routes/careTakers");
const summaryRouter = require("./routes/summary");
const petRouter = require("./routes/pet");
const bidRouter = require("./routes/bid");
const { checkNotAuthenticated } = require("./commons/auth");

initializePassport(passport);

const PORT = process.env.PORT || 8080;

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("index");
});

// TODO rename /users to /auth
app.use("/users", authRouter);
app.use("/availability", checkNotAuthenticated, availabilityRouter);
app.use("/basePrice", checkNotAuthenticated, basePriceRouter);
app.use("/leave", checkNotAuthenticated, leaveRouter);
app.use("/bid", checkNotAuthenticated, bidRouter);
app.use("/caretaker", checkNotAuthenticated, careTakerRouter);
app.use('/pets', checkNotAuthenticated, petRouter)
app.use("/monthlysummary", checkNotAuthenticated, summaryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
