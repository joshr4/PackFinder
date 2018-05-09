const User = require('./user')
const Pet = require('./pet')
const {Park, Visit, Address, Favorite} = require('./park')
const Event = require('./event')
const Review = require('./review')
const {Request, Message} = require('./contact')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
// Relations
  // User has many pets
User.hasMany(Pet, {
  as: 'pets',
  foreignKey: 'userId',
});


User.belongsToMany(Park, {through:'UserFavorites', as:'favorites'});

User.belongsToMany(User, { as: 'Friends', through: 'friends' });
User.belongsToMany(User, { as: 'Requestees', through: 'friendRequests', foreignKey: 'requesterId', onDelete: 'CASCADE'});
User.belongsToMany(User, { as: 'Requesters', through: 'friendRequests', foreignKey: 'requesteeId', onDelete: 'CASCADE'});


Event.belongsTo(User, {as:'creator'});
Event.belongsToMany(User, {through: 'eventParticipants', 
as:'attendees', foreignKey:'eventId', otherKey:'userId'});
User.belongsToMany(Event, {through:'eventParticipants'});
Event.belongsTo(Park);

// Message.hasOne(User, {as:'sender'});
// User.hasMany(Message, {as: 'sent'});
// Message.hasOne(User, {as:'recipient'});
// User.hasMany(Message, {as: 'inbox'});
// User.hasMany(Request);

Message.belongsTo(User, {as:'sender', foreignKey:'senderId'});
Message.belongsTo(User, {as:'recipient', foreignKey:'recipientId'});
User.hasMany(Message, {as: 'messageOutbox', foreignKey:'senderId'});
User.hasMany(Message, {as: 'messageInbox', foreignKey:'recipientId'});


// User.belongsToMany(Park, {through:Visit});
//User has getParks, setParks, addPark, addParks as magic methods
// Park.belongsToMany(User, {through:Visit});
//Park has getUsers, setUsers, addUser, addUsers as magic methods
  // User has many visits -> MtM to Park
  // Park has many visits -> MtM to User
Park.belongsTo(Address); //Park will have addressId
User.belongsTo(Address); //User will have addressId
// Visit.belongsTo(Address); <- no longer needed
Visit.belongsTo(Park);
Park.hasMany(Visit);
Visit.belongsTo(User);
User.hasMany(Visit);
  // Park has one address
  // Visit has one address
Park.hasMany(Review, {
  as: 'reviews',
  foreignKey: 'reviews'
})
  // Reviews?
    // Park has many reviews
    // User has many reviews
module.exports = {
  User,
  Pet,
  Park,
  Visit,
  Address,
  Event,
  Review,
  Message,
  Request
}
