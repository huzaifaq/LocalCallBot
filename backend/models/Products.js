const mongoose = require('mongoose')
const { productsCollectionName } = require('../configurator')

const Products = new mongoose.Schema({
	name: { type: String, trim: true, default: '' },
	category: { type: String, trim: true, default: '' },
	description: { type: String, trim: true, default: '' },
	imagePath: { type: Array, default: [] },
	_id: { type: String },
})

module.exports = mongoose.model('Products', Products, productsCollectionName)
