const mongoose = require('mongoose')
const { connectionUrl, dbName, user, pass } = require('./configurator')

// Initialize the data base connection
const initializeDBConnection = () => {
	try {
		const dbInstance = mongoose.connection

		mongoose.connect(connectionUrl, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			dbName,
			user,
			pass,
		})

		dbInstance.on(
			'error',
			console.error.bind(console, 'Error: Trying to connect to the db')
		)
		dbInstance.on(
			'disconnected',
			console.info.bind(console, 'Info: Disconnected from the db')
		)
		dbInstance.on(
			'connected',
			console.info.bind(console, 'Info: Connection established to the db')
		)
		dbInstance.once(
			'open',
			console.info.bind(console, 'Info: Connection open to the db')
		)
	} catch (error) {
		console.log('Error: Trying to initialize a connection to db')
		console.error(error)
	}
}

module.exports = {
	initializeDBConnection,
}
