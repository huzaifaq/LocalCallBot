const {
	genericSuccessMsg,
	genericErrorMsg,
} = require('../../helpers/nodeConstants')
const modemConnection = require('./modemConnection')

const startCall = async number => {
	try {
		let res = null
		if (modemConnection.getIsModeminitialized()) {
			res = await modemConnection.sendUARTCommand('ATH') // Stop any existing call
			if (!res.error) {
				res = await modemConnection.sendUARTCommand(`ATD${number};`)
				if (!res.error) {
					return { message: genericSuccessMsg } // Call was answered
				}
				return { message: genericErrorMsg + res.error } // Declined OR Error
			}
		}
		return { message: genericErrorMsg } // Modem is not initialized
	} catch (e) {
		console.log(`Error: Unable to place call: ${e}`)
		return { message: genericErrorMsg }
	}
}

const stopCall = async () => {
	try {
		if (modemConnection.getIsModeminitialized()) {
			const res = await modemConnection.sendUARTCommand('ATH')
			if (!res.error) {
				return { message: genericSuccessMsg }
			}
		}
		return { message: genericErrorMsg }
	} catch (e) {
		console.log('Error: Stopping call')
		return { message: genericErrorMsg }
	}
}

module.exports = {
	startCall,
	stopCall,
}
