if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const users = [
    {
      id: '1657295155237',
      name: '2',
      email: '2@2',
      password: '$2b$10$elEg92E.y5pTH7Ro3hqSAuinPKoq4CQ77Y7C0inyP.XfAYzJ7LkYa'
    }
  ] ////db?

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
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
) ///// db?

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"));
app.use(flash())
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

/////////////////// PAGES ///////////////////

app.get('/', checkAuthenticated, (req, res) => {
    res.render('home.ejs', { name: req.user.name, email:req.user.email }, function (err, html) {
        res.send(html)
    })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs', function (err, html) {
        res.send(html)
    })
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs', function (err, html) {
        res.send(html)
    })
})

/////////////////// FILES ///////////////////

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/styles.css'))
})

app.get('/jsHome', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.js'))
})

app.get('/axios', (req, res) => {
    res.sendFile(path.join(__dirname, './axios.min.js'))
})

/////////////////// USER ACCOUNT ///////////////////

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })    //////db?
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users)
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