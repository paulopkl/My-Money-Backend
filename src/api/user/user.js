const restFul = require('node-restful');
const mongoose = restFul.mongoose;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, min: 6, max: 12, required: true }
});

module.exports = restFul.model('User', userSchema);