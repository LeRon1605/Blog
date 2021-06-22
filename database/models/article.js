const mongoose = require('mongoose');
const now = new Date().toDateString();
const articleSchema = new mongoose.Schema({
	title: String,
	content: String,
	author: Object,
	rated: Number,
	tag: Array,
	image: String,
	feedback: Array,
	createdAt: { type: String, required: true, default: now }
})

module.exports = mongoose.model('article', articleSchema);