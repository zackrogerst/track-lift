require('dotenv').config();
const bcrypt = require('bcrypt')

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

module.exports = {
    registerUser: async (req, res) => {
        const { name, email, password } = req.body
        let idNow = Date.now().toString()
        const hashedPassword = await bcrypt.hash(password, 10)

        await sequelize.query(`
        INSERT INTO users (id, name, email, password)
        VALUES ('${idNow}', '${name}', '${email}', '${hashedPassword}');
        `)
            .then(dbRes => {
                try {
                    // localUsers.push({
                    //     id: idNow,
                    //     name: req.body.name,
                    //     email: req.body.email,
                    //     password: hashedPassword
                    // })
                    console.log(`user registered: ${dbRes[0]}`)
                    res.redirect('/login')
                } catch {
                    console.log("error creating user")
                    res.redirect('/register')
                }
            })
            .catch(err => console.log(err))
    }
}