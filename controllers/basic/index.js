const Categories = require('../../backend/models/Categories')
const Products = require('../../backend/models/Products')

const dbMapObject = {
	categories: {
		model: Categories,
	},
	products: {
		model: Products,
	},
}

module.exports = {
	performDBCall: async (ctx, collection) => {
		try {
			const { model } = dbMapObject[collection]
			const data = await model.find(ctx.query)

			ctx.status = 200
			ctx.body = data
		} catch (error) {
			ctx.status = 500
			ctx.body = JSON.stringify(error)
		}
	},
}
