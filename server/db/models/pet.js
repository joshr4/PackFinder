const Sequelize = require('sequelize')
const db = require('../db')

// Relations: 1 owner (user), many locations (favorite locations)
// Fields: name, age, breed, photo, size/weight, description/bio
const Pet = db.define('pet', {
    name: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    age: {
      type: Sequelize.INTEGER,
      unique: false,
      allowNull: false
    },
    breed: {
        type: Sequelize.STRING,
        unique:false,
    },
    imageUrls: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue:[],
    },
    weight: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
    bio: {
        type:Sequelize.TEXT,
        defaultValue: "",
    }
})

module.exports = Pet
