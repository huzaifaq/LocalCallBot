const Discord = require('discord.js')
const { prefix, token } = require('./discordConfig')
const { sendMessage } = require('./discordUtilities')

global.discordClient = new Discord.Client()

global.discordClient.login(token)

global.discordClient.once('ready', async () => {
	console.log('Info: Connection established to discord')
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
			default:
				break
		}
	}

	if (!message.guild) return

	if (message.content === '/join') {
		// Only try to join the sender's voice channel if they are in one themselves
		if (message.member.voice.channel) {
			const voiceConnection = await message.member.voice.channel.join()
		} else {
			message.reply('You need to join a voice channel first!')
		}
	}
})
