const Categories = require('../../backend/models/Categories')
const Sounds = require('../../backend/models/Sounds')
const {
	sendMessage,
	getChannel,
	getAllChannels,
} = require('../../backend/discord/discordUtilities')
const { genericErrorMsg } = require('../../helpers/nodeConstants')
const {
	playSoundInChannel,
} = require('../../backend/discord/discordDispatcher')

const dbMapObject = {
	categories: {
		model: Categories,
	},
	sounds: {
		model: Sounds,
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
				case 'playSound':
					data = await playSoundInChannel(null, ctx.query.assetLink)
					break
				default:
					throw new Error({ message: genericErrorMsg })
			}
			ctx.status = 200
			ctx.body = data
		} catch (error) {
			ctx.status = 500
			ctx.body = JSON.stringify(error)
		}
	},
}
