const mongoose = require('mongoose');
const {
  Schema
} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "User email must not empty"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    unique: [true, "User password already exists!"],
  },
  _salt: String,
}, {
  timestamps: true
});

userSchema.pre('save', function(next) {
  const user = this;
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.password, saltRounds, (error, hash) => {
      user.password = hash;
      user._salt = salt;
      next();
    });
  });
});

module.exports = mongoose.model("User", userSchema);
