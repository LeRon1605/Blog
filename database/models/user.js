const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	username: String,
	name: String,
	password: String,
	sologan: String,
	article: Array,
	avartar: String,
	isComplete: Boolean,
	following: Array,
	follower: Array
})

module.exports = mongoose.model('user', userSchema);