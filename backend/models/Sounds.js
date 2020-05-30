const mongoose = require('mongoose')
const { soundsCollectionName } = require('../configurator')

const Sounds = new mongoose.Schema({
	name: { type: String, trim: true, default: '' },
	assetLink: { type: String, trim: true, default: '' },
	image: { type: String, trim: true, default: '' },
	_id: { type: String, select: false },
	category: { type: String, trim: true, default: '' },
})

module.exports = mongoose.model('Sounds', Sounds, soundsCollectionName)
