const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("./passportConfig");
const authRouter = require("./routes/auth");

initializePassport(passport);

const PORT = process.env.PORT || 8080;

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
