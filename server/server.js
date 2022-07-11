if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const { registerUser } = require('./controller.js')
const { getUsers } = require('./utils.js')


const express = require('express')
const path = require('path')
const app = express()
const flash = require('express-flash')
const session = require('express-session')

const methodOverride = require('method-override')
const bcrypt = require('bcrypt')

const passport = require('passport')
const initializePassport = require('./passport-config')
const refreshAccounts = () => getUsers().then(dbRes => {
    initializePassport(
        passport,
        email => dbRes.find(user => user.email === email),
        id => dbRes.find(user => user.id === id)
    )
})

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

app.post('/registerUser', checkNotAuthenticated, registerUser)

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
    refreshAccounts()

    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    refreshAccounts()

    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

/////////////////// LISTEN ///////////////////

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))