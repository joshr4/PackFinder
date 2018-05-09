const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
    sent: {
        type: Sequelize.DATE,
        defaultValue: null,
    },
    content: {
        type: Sequelize.TEXT,
        defaultValue: null,
    }
});

const Request = db.define('request', {
    approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});


module.exports = {Message, Request}
