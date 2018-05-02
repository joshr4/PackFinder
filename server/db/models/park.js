const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
    line_1: Sequelize.STRING,
    // line_2: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.STRING,
});
// One to many between park and visits
// One to many between user and visits
const Visit = db.define('visit', {
    start: {
        type: Sequelize.DATE,
        defaultValue: null,
    },
    end: {
        type: Sequelize.DATE,
        defaultValue: null,
    }
})
const Park = db.define('park', {
    name: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER,
        unique: false,
        defaultValue: null,
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: "",
    },
    schedule: {
        type: Sequelize.JSON,
        defaultValue: {},
    }
})

module.exports = {Park, Visit, Address}