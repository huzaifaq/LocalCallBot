const { channelId: defaultChannelId } = require('./discordConfig')

const getChannel = async channelId => {
	const tempChannelId = channelId || defaultChannelId
	try {
		return await global.discordClient.channels.fetch(tempChannelId)
	} catch (e) {
		console.log('Error: Trying to get channel')
		return null
	}
}

const getAllChannels = async () => {
	// todo
}

const sendMessage = async (message, channelId) => {
	try {
		const channel = await getChannel(channelId)
		if (channel) {
			return await channel.send(message)
		}
		return null
	} catch (e) {
		console.log('Error: Trying to send message')
		return null
	}
}

module.exports = {
	getChannel,
	sendMessage,
}
