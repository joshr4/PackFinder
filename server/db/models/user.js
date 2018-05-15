const crypto = require('crypto')
const Sequelize = require('sequelize')
const {Message, Request} = require('./contact')

const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  lastName: {
    type: Sequelize.STRING,
    defaultValue: ''

  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get () {
      return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName')
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get () {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: "",
  },
  interests: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: [],
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.prototype.hasRequest = async function(otherUser) {
  let checkRequest = await Request.findOne({
    where: {
      $or: [{toId:this.id, fromId:otherUser.id}, {toId:otherUser.id, fromId:this.id}],
    }
  });
  return checkRequest;
}

User.prototype.sendRequest = async function(recipient) {
  let recipientUser = recipient;
  if (typeof recipient === "number" || typeof recipient === "string") {
    recipientUser = User.findById(recipient);
  }
  let reverseRequest = await thisUser.getRequesters({
    where:{
        id:recipientUser.id
    }
  });
  if (reverseRequest.length > 0) {
      await thisUser.removeRequester(recipientUser);
      await recipientUser.removeRequestee(recipientUser);
      // existingRequests[0].destroy();
      await thisUser.addFriend(recipientUser);
      await recipientUser.addFriend(thisUser);
  }
  else {
      await thisUser.addRequestee(recipientUser);
      await recipientUser.addRequester(recipientUser);
  }
  return recpientUser;
}

// User.prototype.visitedParks = function() {

// }

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
