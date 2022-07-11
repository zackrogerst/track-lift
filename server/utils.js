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
    getUsers: async () => await sequelize.query("SELECT * FROM users")
    .then(dbRes => dbRes[0])
}