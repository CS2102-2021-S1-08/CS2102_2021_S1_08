const express = require("express")
const app = express()
const { pool } = require("./dbConfig")
const session = require("express-session")
const flash = require("express-flash")
const passport = require("passport")
const initializePassport = require("./passportConfig")

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

app.get('/users/login', checkAuthenticated, (req, res) => {
    res.render('login')
})

app.get('/users/logout', (req, res) => {
    req.logOut()
    req.flash('success_msg', 'You have logged out')
    res.redirect('/users/login')
})

app.get('/users/register', checkAuthenticated, (req, res) => {
    res.render('register')
})

app.get('/users/dashboard', checkNotAuthenticated, (req, res) => {
    res.render("dashboard", { user: req.user.username });
})

app.post('/users/register', async (req, res) => {
    let { username, password, confirm_password } = req.body

    console.log({
        username,
        password,
        confirm_password
    })

    let errors = [];

    if (!username || !password || !confirm_password) {
        errors.push({ message: "Please enter all fields" })
    }

    if (password.length < 6) {
        errors.push({ message: "Password should be at least 6 characters long" })
    }

    if (password != confirm_password) {
        errors.push({ message: "Password do not match" })
    }

    if (errors.length > 0) {
        res.render('register', { errors })
    } else {
        //passed
        pool.query(
            `SELECT * FROM users
            WHERE username = $1`,
            [username],
            (err, results) => {
                if (err) {
                    console.log(err)
                }
                console.log(results.rows)

                if (results.rows.length > 0) {
                    errors.push({ message: "The username is already taken" })
                    res.render('register', { errors })
                } else {
                    pool.query(
                        `INSERT INTO users (username, password)
                    VALUES ($1, $2)
                    RETURNING username, password`, [username, password], (err, results) => {
                        if (err) {
                            console.log(err)
                        }
                        console.log(results.rows)
                        req.flash('success_msg', "You are now registered. Please log in")
                        res.redirect('/users/login')
                    }
                    )
                }

            }
        )
    }
})

app.post('/users/login', passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
}))

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/dashboard')
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/users/login')
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})