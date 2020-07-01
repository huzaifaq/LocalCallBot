const {
	sendMessage,
	getChannel,
	getAllChannels,
} = require('../../backend/discord/discordUtilities')
const {
	playSoundInChannel,
} = require('../../backend/discord/discordDispatcher')
const { whiteListedNumbers } = require('../../backend/modem/modemConfig')
const { startCall } = require('../../backend/modem/modemDispatcher')

const performDiscordAction = async (ctx, command) => {
	try {
		let data = null
		let e = null
		switch (command) {
			case 'sendMessage':
				data = await sendMessage(ctx.query.message, ctx.query.channelId)
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
				e = new Error('Unknown command')
				e.name = 'Discord API'
				throw e
		}
		ctx.status = 200
		ctx.body = data
	} catch (e) {
		ctx.status = 500
		const res = {}
		res[e.name] = e.message
		ctx.body = res
	}
}

const performCallAction = async (ctx, command) => {
	try {
		let data = null
		let e = null
		switch (command) {
			case 'placeCall':
				// Check if number in white list
				if (
					whiteListedNumbers.find(
						element => element.number === ctx.query.phoneNumber
					)
				) {
					data = await startCall(ctx.query.phoneNumber)
					console.log(data)
				} else {
					e = new Error(
						'Dialed number is not whitelisted on the server'
					)
					e.name = 'Call API'
					throw e
				}
				break
			default:
				e = new Error('Unknown command')
				e.name = 'Call API'
				throw e
		}
		ctx.status = 200
		ctx.body = data
	} catch (e) {
		ctx.status = 500
		const res = {}
		res[e.name] = e.message
		ctx.body = res
	}
}

module.exports = {
	performDiscordAction,
	performCallAction,
}
