const Categories = require('../../backend/models/Categories')

const getDBModel = async queryIdentifier => {
	switch (queryIdentifier) {
		case 'categories-all':
			return Categories.find()
		default:
			return null
	}
}

module.exports = {
	performDBCall: async (ctx, queryIdentifier) => {
		try {
			const data = await getDBModel(queryIdentifier)
			ctx.status = 200
			ctx.body = data
		} catch (error) {
			ctx.status = 500
			ctx.body = JSON.stringify(error)
		}
	},
}
