const User = require('./user')
const Pet = require('./pet')
const {Park, Visit, Address} = require('./park')
const Event = require('./event')
const Review = require('./review')

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
User.belongsToMany(Park, {through:Visit}); 
//User has getParks, setParks, addPark, addParks as magic methods 
Park.belongsToMany(User, {through:Visit}); 
//Park has getUsers, setUsers, addUser, addUsers as magic methods
  // User has many visits -> MtM to Park
  // Park has many visits -> MtM to User
Park.belongsTo(Address); //Park will have address Id
Visit.belongsTo(Address);
Visit.belongsTo(Park);
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
  Review
}
