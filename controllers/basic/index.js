const Products = require('../../backend/models/Categories')
const { sendMessage } = require('../../backend/discord/discordUtilities')

const dbMapObject = {
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
	performDiscordAction: async (ctx, command) => {
		try {
			let data = null
			switch (command) {
				case 'sendMessage':
					data = await sendMessage(
						ctx.query.message,
						ctx.query.channelId
					)
					break
				default:
					throw new Error('No Command Found')
			}
			ctx.status = 200
			ctx.body = data
		} catch (error) {
			ctx.status = 500
			ctx.body = JSON.stringify(error)
		}
	},
}
