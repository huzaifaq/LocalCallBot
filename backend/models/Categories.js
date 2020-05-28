const mongoose = require('mongoose')
const { categoriesCollectionName } = require('../configurator')

const Categories = new mongoose.Schema({
	name: { type: String, trim: true, default: '' },
	image: { type: String, trim: true, default: '' },
	_id: { type: String, select: false },
})

module.exports = mongoose.model(
	'Categories',
	Categories,
	categoriesCollectionName
)
