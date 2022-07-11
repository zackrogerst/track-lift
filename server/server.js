if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const DATABASE_URL = process.env.DATABASE_URL;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});


const localUsers = [
    // {
    //     id: '1657295155237',
    //     name: '2',
    //     email: '2@2',
    //     password: '$2b$10$elEg92E.y5pTH7Ro3hqSAuinPKoq4CQ77Y7C0inyP.XfAYzJ7LkYa'
    // }
]

const express = require('express')
const path = require('path')
const app = express()
const flash = require('express-flash')
const session = require('express-session')
const bcrypt = require('bcrypt')
const passport = require('passport')
const methodOverride = require('method-override')
const initializePassport = require('./passport-config')

initializePassport(
    passport,
    email => localUsers.find(user => user.email === email),
    id => localUsers.find(user => user.id === id)
)

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"));
app.use(flash())
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

/////////////////// PAGES ///////////////////

app.get('/', checkAuthenticated, (req, res) => res.render('home.ejs', { name: req.user.name, email: req.user.email }, (err, html) => res.send(html)))

app.get('/login', checkNotAuthenticated, (req, res) => res.render('login.ejs', (err, html) => res.send(html)))

app.get('/register', checkNotAuthenticated, (req, res) => res.render('register.ejs', (err, html) => res.send(html)))

/////////////////// FILES ///////////////////

app.get('/css', (req, res) => res.sendFile(path.join(__dirname, '../public/styles.css')))

app.get('/jsHome', (req, res) => res.sendFile(path.join(__dirname, '../public/home.js')))

app.get('/axios', (req, res) => res.sendFile(path.join(__dirname, '../config/axios-config.js')))

/////////////////// USER ACCOUNT ///////////////////

app.post('/loginUser', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.post('/registerUser', checkNotAuthenticated, async (req, res) => {
    const { name, email, password } = req.body
    let id = Date.now().toString()
    const hashedPassword = await bcrypt.hash(password, 10)

    await sequelize.query(`
    INSERT INTO users (id, name, email, password)
    VALUES ('${id}', '${name}', '${email}', '${hashedPassword}');
    `)
        .then(dbRes => {
            try {
                localUsers.push({
                    id: Date.now().toString(),
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                })
                res.redirect('/login')
            } catch {
                res.redirect('/register')
            }
            console.log("localUsers:", localUsers)
        })
        .catch(err => console.log(err))
})

app.delete('/logout', checkAuthenticated, function (req, res, next) {
    req.logOut(function (err) {
        if (err) {
            return next(err)
        }
        res.redirect('/login')
    })
})

/////////////////// USER AUTH ///////////////////

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

/////////////////// LISTEN ///////////////////

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))