const { getChannel } = require('./discordUtilities')
const {
	genericSuccessMsg,
	genericErrorMsg,
	genericPlayTimeout,
} = require('../../helpers/nodeConstants')

global.discordDispatcher = null
let connectedChannel = null
let leaveTimer = null

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
				clearTimeout(leaveTimer)
				global.io.broadcast('Sound', {
					type: 'Playing',
					url: soundFileUrl,
				})
				global.discordDispatcher = voiceConnection.play(soundFileUrl)
				global.discordDispatcher.on('finish', () => {
					global.io.broadcast('Sound', {
						type: 'Playing',
						url: '',
					})
					global.discordDispatcher.destroy()
					leaveTimer = setTimeout(() => {
						if (connectedChannel) {
							connectedChannel.leave()
						}
						connectedChannel = null
					}, genericPlayTimeout)
				})
				return { message: genericSuccessMsg }
			}
			throw new Error(
				'Error: Playing sound file in channel, no voice connection found'
			)
		} else {
			throw new Error(
				'Error: Playing sound file in channel,  no channel found'
			)
		}
	} catch (e) {
		console.log('Error: Playing sound file in channel')
		return { message: genericErrorMsg }
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
		console.log('Error: Stopping sound file in channel')
	}
}

const resumeSound = async () => {
	try {
		if (global.discordDispatcher && connectedChannel) {
			global.discordDispatcher.resume()
		}
	} catch (e) {
		console.log('Error: Resuming sound file in channel')
	}
}

module.exports = {
	playSoundInChannel,
	pauseSound,
	stopSound,
	resumeSound,
}
