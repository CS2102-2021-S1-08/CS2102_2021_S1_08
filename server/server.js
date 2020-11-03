const express = require("express");
const app = express();
const session = require("express-session");
var bodyParser = require("body-parser");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("./passportConfig");
const availabilityRouter = require("./routes/availability");
const authRouter = require("./routes/auth");
const leaveRouter = require("./routes/leaves");
const summaryRouter = require("./routes/summary");

initializePassport(passport);

const PORT = process.env.PORT || 8080;

app.set("views", "./views");
app.set("view engine", "ejs");
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
app.use("/availability", availabilityRouter)
app.use("/leave", leaveRouter);
app.use("/monthlysummary", summaryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
