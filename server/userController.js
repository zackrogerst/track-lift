const bcrypt = require('bcrypt');

let localUsers = {
    id: '1657295155237',
    name: '2',
    email: '2@2',
    password: '$2b$10$elEg92E.y5pTH7Ro3hqSAuinPKoq4CQ77Y7C0inyP.XfAYzJ7LkYa'
}

module.exports = {
    usersExport: localUsers,
    registerUser: async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
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
        console.log(localUsers)
    }
}