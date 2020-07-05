const Discord = require('discord.js')
const { prefix, token } = require('./discordConfig')
const { sendMessage } = require('./discordUtilities')
const {
	playSoundInChannel,
	stopSound,
	pauseSound,
	resumeSound,
} = require('./discordDispatcher')

const initDiscordConnection = () => {
	try {
		global.discordClient = new Discord.Client()
		global.discordClient.login(token)

		global.discordClient.once('ready', () => {
			console.log(
				'\x1b[42m\x1b[37m%s\x1b[0m',
				'Info: Connection established to discord'
			)
		})

		global.discordClient.on('message', async message => {
			// Voice only works in guilds, if the message does not come from a guild,
			// we ignore it

			if (message.content.startsWith(prefix)) {
				const { content = '' } = message
				const commandParams = content.split(' ')
				const commandDirector = commandParams[1]
				const commandArguements = commandParams.slice(2)

				switch (commandDirector) {
					case 'Ping':
						await sendMessage('Pong', message.channel.id)
						break
					case 'Play':
						await playSoundInChannel(
							message.member.voice.channel.id,
							commandArguements[0]
						)
						break
					case 'Stop':
						stopSound()
						break
					case 'Pause':
						pauseSound()
						break
					case 'Resume':
						resumeSound()
						break
					default:
						break
				}
			}
		})
	} catch (e) {
		console.log(e)
	}
}

module.exports = {
	initDiscordConnection,
}
