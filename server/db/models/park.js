const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
    line_1: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    // line_2: Sequelize.STRING,
    city: {
      type: Sequelize.STRING,
      defaultValue: ""
    },
    state: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    zipcode: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    location: {
      type: Sequelize.JSON,
      defaultValue: {lat: 0, lng: 0},
    },
    fullAddress: {
        type: Sequelize.VIRTUAL,
        get() {
            return `${this.line_1} ${this.city} ${this.state} ${this.zipcode}`
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
        allowNull: false,
    },
    start: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    end: {
        type: Sequelize.DATE,
        allowNull: false,
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
    imageUrls: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      defaultValue: [],
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
