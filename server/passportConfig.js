const LocalStrategy = require("passport-local").Strategy
const { pool } = require("./dbConfig")

function initialize(passport) {
    const authenticateUser = (username, password, done) => {
        pool.query(
            `SELECT * FROM users
            WHERE username = $1`, [username], (err, results) => {
            if (err) {
                throw err
            }
            console.log(results.rows)

            if (results.rows.length > 0) {
                //found user in database
                const user = results.rows[0]

                if (user.password == password) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: 'Password is incorrect' })
                }
            } else {
                //no user found in databse
                return done(null, false, { message: 'Username is not found' })
            }

        }
        )
    }

    passport.use(
        new LocalStrategy({
            usernameField: "username",
            passwordField: "password"
        },
            authenticateUser
        )
    )

    passport.serializeUser((user, done) => done(null, user.username))

    passport.deserializeUser((username, done) => {
        pool.query(
            `SELECT * FROM users
            WHERE username = $1`, [username], (err, results) => {
            if (err) {
                throw err
            } else {
                return done(null, results.rows[0])
            }
        }
        )
    })

}

module.exports = initialize