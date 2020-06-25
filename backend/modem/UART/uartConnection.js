const SerialPort = require('serialport')
const Regex = require('@serialport/parser-regex')
const {
	uartOptions,
	uartDeviceDetails,
	uartCommandParser,
} = require('./uartConfig')

let uartConnection = null
let currentCommand = null
let uartResponse = {
	command: '',
	data: '',
	error: null,
}
let uartResCallback = null
let incommingCallback = null
let callEndCallback = null
let isCallerIDEnabled = false

const onUARTMessage = dataUnformatted => {
	try {
		const data = dataUnformatted.trim().split(':')
		switch (data[0].trim()) {
			case currentCommand:
				uartResponse.command = data[0].trim()
				break
			case 'OK':
				uartResCallback(uartResponse)
				currentCommand = null
				break
			case 'ERROR':
				uartResponse.error = 'ERROR'
				uartResCallback(uartResponse)
				currentCommand = null
				break
			case 'RING':
				if (incommingCallback != null && !isCallerIDEnabled) {
					incommingCallback()
				}
				break
			case '+CLIP':
				if (incommingCallback != null && isCallerIDEnabled) {
					if (data[1].includes('"')) {
						// Extract callerID form data e.g. '+CLIP: "02151082965",129,"",,"",0'
						incommingCallback(data[1].split('"')[1])
					}
				}
				if (!data[1].includes('"')) {
					// +CLIP: 0,1
					uartResponse.data += `${dataUnformatted}\n`
				}
				break
			case '+CCINFO': // Call ended
				if (callEndCallback != null) {
					callEndCallback()
				}
				break
			default: {
				const re = new RegExp(/\+CM.\sERROR/)
				if (re.test(data)) {
					uartResponse.error = `ERROR: ${data.split(':')[1].trim()}`
					uartResCallback(uartResponse)
				} else if (data !== 'undefined') {
					uartResponse.data += `${dataUnformatted}\n`
				}
				break
			}
		}
	} catch (e) {
		console.log(e)
	}
}

const onUARTConnection = error => {
	try {
		if (error == null) {
			console.log('UART connection opened')
			const commandParser = uartConnection.pipe(
				new Regex(uartCommandParser)
			) // After connection is opened pipe all data to parser
			commandParser.on('data', onUARTMessage)
		}
	} catch (e) {
		console.log(e)
	}
}

const getSerialPortList = async () => {
	try {
		const portList = await SerialPort.list()
		return portList
	} catch (e) {
		console.log(e)
		return []
	}
}

const getUartDeviceDetails = async () => {
	try {
		const portList = (await getSerialPortList()) || []
		for (let i = 0; i < portList.length; i += 1) {
			if (
				portList[i].vendorId === uartDeviceDetails.vendorId &&
				portList[i].productId === uartDeviceDetails.productId
			) {
				return portList[i]
			}
		}
		return {}
	} catch (e) {
		console.log(e)
		return {}
	}
}

const initUARTConnection = async () => {
	try {
		const deviceDetails = await getUartDeviceDetails()
		if (deviceDetails.path) {
			uartConnection = new SerialPort(
				deviceDetails.path,
				uartOptions,
				onUARTConnection
			)
		} else {
			console.log('error')
		}
	} catch (e) {
		console.log(e)
	}
}

const sendUARTCommand = (command, callback) => {
	if (currentCommand == null) {
		// If no command is being executed
		currentCommand = command
		uartResponse = {
			command: '',
			data: '',
			error: null,
		}
		uartConnection.write(`${command}\n`, err => {
			if (err) {
				currentCommand = null
				return console.log(`UART failed to write: ${command}`)
			}
			uartResCallback = callback
			return console.log(`UART wrote: ${command}`)
		})
		return null
	}
	return console.log('Current command has not finished executing')
}

const setIncommingCallback = callback => {
	incommingCallback = callback
}

const setCallEndCallback = callback => {
	callEndCallback = callback
}

const setCallerIDEnabled = state => {
	isCallerIDEnabled = state
}

module.exports = {
	sendUARTCommand,
	initUARTConnection,
	setIncommingCallback,
	setCallEndCallback,
	setCallerIDEnabled,
}
