const UartConnection = require('./UART/uartConnection')
const { whiteListedNumbers } = require('./modemConfig')

let startAudioCallback = () => null
let stopAudioCallback = () => null
let isModeminitialized = false

const sendUARTCommand = command => {
	try {
		return new Promise((resolve, reject) => {
			UartConnection.sendUARTCommand(command, data => {
				if (data.error != null) {
					return reject(data.error)
				}
				return resolve(data)
			})
		})
	} catch (e) {
		return e
	}
}

const modemIncommingCallback = async callerID => {
	try {
		if (callerID) {
			// If callerID is provided check whitelist
			let isWhitelisted = false
			console.log(callerID)
			for (let index = 0; index < whiteListedNumbers.length; index += 1) {
				const element = whiteListedNumbers[index]
				if (element.number === callerID) {
					isWhitelisted = true
					break
				}
			}
			if (isWhitelisted) {
				await sendUARTCommand('ATA') // Accept call
				startAudioCallback()
			} else {
				await sendUARTCommand('ATH') // Decline call
			}
		} else {
			// If no callerID accept call
			await sendUARTCommand('ATA')
			startAudioCallback()
		}
	} catch (e) {
		console.log(e)
	}
}

const modemEndCallback = async () => {
	try {
		console.log('Call ended')
		stopAudioCallback()
	} catch (e) {
		console.log(e)
	}
}

const initModem = async () => {
	try {
		let error = null
		let res = null

		await UartConnection.initUARTConnection()
		res = await sendUARTCommand('ATI') // Test command
		console.log(res)
		if (res.error) {
			error = `Test command failed: ${res.error}`
		}

		if (!error) {
			res = await sendUARTCommand('AT+QEXTUNSOL="CC",2') // check if call ended event is enabled
			if (res.data.trim()[res.data.trim().length - 1] === '0') {
				res = await sendUARTCommand('AT+QEXTUNSOL="CC",1')
				if (res.error) {
					error = `CC set command failed: ${res.error}`
				}
			} else if (res.data.trim()[res.data.trim().length - 1] === '1') {
				// correct state no action required
			} else {
				error = `CC check command failed: ${res.error}`
			}
		}

		if (!error) {
			res = await sendUARTCommand('AT+CLIP?') // check if callerID is enabled
			if (
				res.data
					.split(':')[1]
					.split(',')[0]
					.trim() === '0'
			) {
				res = await sendUARTCommand('AT+CLIP=1')
				if (!res.error) {
					UartConnection.setCallerIDEnabled(true)
				} else {
					error = `Unable to enable callerID: ${res.error}`
				}
			} else if (
				res.data
					.split(':')[1]
					.split(',')[0]
					.trim() === '1'
			) {
				UartConnection.setCallerIDEnabled(true)
			} else {
				error = `Unable to get callerID enabled status: ${res.error}`
			}
		}

		if (!error) {
			res = await sendUARTCommand('AT+COLP?') // check if caller answer detection is enabled
			if (
				res.data
					.split(':')[1]
					.split(',')[0]
					.trim() === '0'
			) {
				res = await sendUARTCommand('AT+COLP=1')
				if (!res.error) {
					// correct state no action required
				} else {
					error = `Unable to enable Call answer detection: ${res.error}`
				}
			} else if (
				res.data
					.split(':')[1]
					.split(',')[0]
					.trim() === '1'
			) {
				// correct state no action required
			} else {
				error = `Unable to enable Call answer detection: ${res.error}`
			}
		}

		if (!error) {
			UartConnection.setIncommingCallback(modemIncommingCallback) // Set incomming call callback
			UartConnection.setCallEndCallback(modemEndCallback) // Set call ended Callback
			isModeminitialized = true
			return console.log('Modem initlized')
		}
		return console.log(`Unable to initlize Modem\n ${error}`)
	} catch (e) {
		return console.log(e)
	}
}

const setStartAudioCallback = callback => {
	startAudioCallback = callback
}

const setStopAudioCallback = callback => {
	stopAudioCallback = callback
}

const getIsModeminitialized = () => {
	return isModeminitialized
}

module.exports = {
	initModem,
	setStartAudioCallback,
	setStopAudioCallback,
	getIsModeminitialized,
	sendUARTCommand,
}
