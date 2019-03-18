const mongoose      = require('mongoose');
const { Schema }    = mongoose;
const autoIncrement = require('mongoose-auto-increment');

const bcrypt = require('bcryptjs');

autoIncrement.initialize(mongoose.connection);

const UserSchema = new Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true },
  password: { type: String, required: true },
  isAdmin:  { type: Boolean, default: false },
  fidelity: { type: Number, default: 0},
  canjes:   { type: Number, default: 0},
  affiliateId: Number,
  date:     { type: Date, default: Date.now },
  facebook: {
    provider_id: String,
    provider: String,
    token: String,
    email: String,
    name: String,
    photo: String
  } 
});

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'affiliateId',
  startAt: 1000,
  incrementBy: 1
});

module.exports = mongoose.model('User', UserSchema);
