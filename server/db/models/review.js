const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
    rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: "",
    }
});

module.exports = Review