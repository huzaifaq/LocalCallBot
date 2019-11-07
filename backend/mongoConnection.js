const mongoose = require('mongoose')
const { connectionUrl, dbName, user, userPassword } = require('./configurator')

// Initialize the data base connection
try {
	const dbInstance = mongoose.connection

	mongoose
		.connect(connectionUrl, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			dbName,
			user,
			pass: userPassword,
		})
		.catch(error => console.error.bind(console, error))

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
} catch (error) {
	console.log('Error: Trying to initialize a connection to db')
	console.error(error)
}
