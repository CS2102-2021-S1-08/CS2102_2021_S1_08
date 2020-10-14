const express = require("express")
const app = express()
const session = require("express-session")
const flash = require("express-flash")
const passport = require("passport")
const initializePassport = require("./passportConfig")
const routes = require("./routes");

initializePassport(passport)

const PORT = process.env.PORT || 8080

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/users', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})