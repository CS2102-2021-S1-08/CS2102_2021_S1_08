const express = require("express")
const app = express()
const { pool } = require("./dbConfig")

const PORT = process.env.PORT || 8080

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/users/login', (req, res) => {
    res.render('login')
})

app.get('/users/register', (req, res) => {
    res.render('register')
})

app.get('/users/dashboard', (req, res) => {
    res.render('dashboard')
})

app.post('/users/register', async (req, res) => {
    let {username, password, confirm_password} = req.body

    console.log({
        username,
        password,
        confirm_password
    })

    let errors = [];

    if (!username  || !password || !confirm_password) {
        errors.push({message: "Please enter all fields"})
    }

    if (password.length < 6) {
        errors.push({message: "Password should be at least 6 characters long"})
    }

    if (password != confirm_password) {
        errors.push({message: "Password do not match"})
    }

    if(errors.length > 0) {
        res.render('register', { errors })
    } else {
        //passed
        pool.query(
            `SELECT * FROM users
            WHERE username = $1`,
          [username],
          (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log(results.rows);
            }
        )
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})