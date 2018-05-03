const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
    start: {
        type: Sequelize.DATE,
        defaultValue: null,
    },
    end: {
        type: Sequelize.DATE,
        defaultValue: null,
    },
    private: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: "",
    }
});

module.exports = Event
