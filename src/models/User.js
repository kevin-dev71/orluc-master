const mongoose      = require('mongoose');
const { Schema }    = mongoose;

const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true },
  password: { type: String, required: true },
  isAdmin:  { type: Boolean, default: false },
  fidelity: { type: Number, default: 0},
  canjes:   { type: Number, default: 0},
  provider: { type: String, default: 'local' },
	provider_id: {type: String, unique: true},
	photo: String,
  date:     { type: Date, default: Date.now }
});

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
