const { getChannel } = require('./discordUtilities')

global.discordDispatcher = null
let connectedChannel = null

const playSoundInChannel = async (channelId, soundFileUrl) => {
	try {
		connectedChannel = await getChannel(channelId)
		if (
			connectedChannel &&
			connectedChannel.type === 'voice' &&
			soundFileUrl
		) {
			const voiceConnection = await connectedChannel.join()
			if (voiceConnection) {
				global.discordDispatcher = voiceConnection.play(soundFileUrl)
				global.discordDispatcher.on('finish', () => {
					global.discordDispatcher.destroy()
					connectedChannel.leave()
					connectedChannel = null
				})
			} else {
				throw new Error(
					'Error: Playing sound file in channel, no voice connection found'
				)
			}
		} else {
			throw new Error(
				'Error: Playing sound file in channel,  no channel found'
			)
		}
	} catch (e) {
		console.log('Error: Playing sound file in channel')
	}
}

const pauseSound = async () => {
	try {
		if (global.discordDispatcher) {
			global.discordDispatcher.pause()
		}
	} catch (e) {
		console.log('Error: Pausing sound file in channel')
	}
}

const stopSound = async () => {
	try {
		if (global.discordDispatcher && connectedChannel) {
			global.discordDispatcher.destroy()
			connectedChannel.leave()
			connectedChannel = null
		}
	} catch (e) {
		console.log(e)
		console.log('Error: Stopping sound file in channel')
	}
}

const resumeSound = async () => {
	try {
		if (global.discordDispatcher && connectedChannel) {
			global.discordDispatcher.resume()
		}
	} catch (e) {
		console.log(e)
		console.log('Error: Resuming sound file in channel')
	}
}

module.exports = {
	playSoundInChannel,
	pauseSound,
	stopSound,
	resumeSound,
}
