const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  url: {
    type: String,
    default:
      'https://i.pinimg.com/564x/74/46/9b/74469bd23df16c22231fcf75b7073fd2.jpg',
    optional: true,
  },
  contactNumber: {
    type: String,
    default: '',
    optional: true,
  },
  address: {
    type: String,
    default: '',
    optional: true,
  },
  city: {
    type: String,
    default: '',
    optional: true,
  },
  zipCode: {
    type: String,
    default: '',
    optional: true,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
  accountType: {
    type: String,
    default: 'free',
    optional: true,
  },
});

userSchema.methods.matchPassword = async function (incomingPassword) {
  return await bcrypt.compare(incomingPassword, this.password);
};

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(5);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
