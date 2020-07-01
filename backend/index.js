const discordConnection = require('./discord/discordConnection')
const modemConnection = require('./modem/modemConnection')
// const audioStream = require('./audio/audioStream')

modemConnection.setStartAudioCallback(() => {
	return null
})

modemConnection.setStopAudioCallback(() => {
	return null
})

discordConnection.initDiscordConnection()
modemConnection.initModem()
