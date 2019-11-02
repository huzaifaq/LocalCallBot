const mongoose = require('mongoose')
const { galleryCollectionName } = require('../configurator')

const Gallery = new mongoose.Schema({
	name: { type: String, trim: true, default: '' },
	category: { type: String, trim: true, default: '' },
	description: { type: String, trim: true, default: '' },
	imagePath: { type: Array, default: [] },
	_id: { type: String, select: false },
})

module.exports = mongoose.model('Gallery', Gallery, galleryCollectionName)
