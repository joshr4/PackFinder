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
    },
    messageType: {
        type: Sequelize.ENUM('private', 'public'),
        defaultValue: 'private',
    }
});

const Request = db.define('request', {
    approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

const Post = db.define('post', {
    content: {
        type: Sequelize.TEXT
    }
})


module.exports = {Message, Request}
