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
                    console.log(`user registered: ${dbRes[0]}`)
                    res.redirect('/login')
                } catch {
                    console.log("error creating user")
                    res.redirect('/register')
                }
            })
            .catch(err => console.log(err))
    },
    addLift: async (req, res) => {
        const { userEmail,
            liftId,
            date,
            liftType,
            weightAmount,
            repsCompleted,
            rpeExertion,
            liftNotes } = req.body;

        let userId;

        await sequelize.query(`
        SELECT * FROM users
        WHERE email = '${userEmail}'
        `)
            .then(dbRes => {
                userId = dbRes[0][0].user_id
            })

        await sequelize.query(`
        INSERT INTO lifts (user_id, lift_name, weight, reps, rpe, add_date)
        VALUES ('${userId}','${liftType}', '${weightAmount}', '${repsCompleted}', '${rpeExertion}', '${date}');
        `)
            .then(dbRes => {
                try {
                    console.log(`lift added`)
                    res.sendStatus(200)
                } catch {
                    console.log("error adding lift")
                    res.sendStatus(400)
                }
            })
            .catch(err => console.log(err))
    },
    retrieveLifts: async (req, res) => {
        let userId;
        await sequelize.query(`
        SELECT * FROM users
        WHERE email = '${req.body.userEmail}'
        `)
            .then(dbRes => {
                userId = dbRes[0][0].user_id
            })

        await sequelize.query(`
        SELECT * FROM lifts
        WHERE user_id = '${userId}' AND lift_name = '${req.body.liftType}'
        ORDER BY lift_id ASC
        LIMIT 100;
        `)
            .then(dbRes => res.send(dbRes[0]))
    }
}