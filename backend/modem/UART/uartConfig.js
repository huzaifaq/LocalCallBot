module.exports = {
	uartOptions: {
		baudRate: 9600,
		dataBits: 8,
		stopBits: 1,
		parity: 'none',
		rtscts: false,
		xon: false,
		xoff: false,
		xany: false,
	},
	uartDeviceDetails: {
		vendorId: '10c4',
		productId: 'ea60',
	},

	uartCommandParser: {
		regex: /\r\n/,
	},
}
