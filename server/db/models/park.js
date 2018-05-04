const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
    line1: Sequelize.STRING,
    // line_2: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.STRING,
    coordinates: {
        type: Sequelize.JSON,
        defaultValue: {
            latitude: null,
            longitude: null,
        }
    }
});
// One to many between park and visits
// One to many between user and visits
const Visit = db.define('visit', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    start: {
        type: Sequelize.DATE,
        defaultValue: null,
        // get() {
        //     let startTime = new Date(this.getDataValue('start'));
        //     return startTime;
        // },
    },
    end: {
        type: Sequelize.DATE,
        defaultValue: null,
        // get() {
        //     let endTime = new Date(this.getDataValue('end'));
        //     return endTime;
        // },
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: true
    }
})

Visit.prototype.startTime = function() {
    return new Date(this.start);
}
Visit.prototype.endTime = function() {
    return new Date(this.end);
}

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
    },
    // address: {
    //     type: Sequelize.JSON,
    //     defaultValue: {
    //         line_1: "",
    //         city: "",
    //         state: "",
    //         zip: "",            
    //     }
    // }
})

Park.prototype.getVisits = function(startTime, endTime) {
    Visit.findAll({
        where: {
            parkId: this.id
        }
        // [Op.lt]: new Date(),
        // [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
    }).then(visits => {
        let result = [];
        visits.forEach(visit => {
            if (visit.start < endTime || visit.end > startTime) {
                result.push(visit);
            }
        })
        return result;
    })
    // return all visits with time overlap here
}

module.exports = {Park, Visit, Address}
