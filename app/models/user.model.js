var config = require('../../config/config');
var mongoose = require('../../config/mongoose/mongoose.config');
var collectionName = config.get('users:collection');
const bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  username: {
    type: String,
    trim: true,
    unique: true
  },
  password: String,
  provider: String,
  providerId: String,
  providerData: {}
});

userSchema.pre('save', function (next) {
  if (this.password) {
    // Hash the password here
    let rawPassword = this.password;
    this.password = bcrypt.hashSync(rawPassword, 10);
  }
  next();
});

// userSchema.methods.authenticate = function (password) {
//   // Decrypt hashed password for comparison
//   return bcrypt.compareSync(this.password, password);
// };

// userSchema.statics.findUniqueUsername = function (username, suffix, callback) {
//   var _this = this;
//   var possibleUsername = username + (suffix || '');

//   _this.findOne(
//     { username: possibleUsername },
//     function (err, user) {
//       if (!err) {
//         if (user) {
//           callback(possibleUsername);
//         } else {
//           return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
//         }
//       } else {
//         callback(null);
//       }
//     }
//   );
// };

var User = mongoose.model(collectionName, userSchema);

module.exports = User;
