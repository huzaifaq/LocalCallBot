const Products = require('../../backend/models/Categories')
const {
	sendMessage,
	getChannel,
	getAllChannels,
} = require('../../backend/discord/discordUtilities')

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
				case 'getChannelInformation':
					data = await getChannel(ctx.query.channelId)
					break
				case 'getAllChannels':
					data = await getAllChannels()
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
