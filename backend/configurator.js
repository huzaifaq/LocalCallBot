const fs = require('fs')
const path = require('path')

let connectionUrl
let dbName
let galleryCollectionName
let user
let userPassword

const fileLoc =
	process.env.NODE_ENV === 'production'
		? path.join(__dirname, '/../../dbConfig.json')
		: './dbConfig.json'

// Function to fetch the db config details
const getDBConfig = () => {
	try {
		const jsonData = fs.readFileSync(fileLoc, 'utf8')
		if (jsonData) {
			const data = JSON.parse(jsonData)
			connectionUrl = data.connectionUrl
			dbName = data.dbName
			galleryCollectionName = data.galleryCollectionName
			user = data.user
			userPassword = data.userPassword
		} else {
			console.error('Error: Failed to parse db configuration file')
		}
	} catch (error) {
		console.error('Error: Failed to read db configuration file')
		console.error(error)
	}
}

// Fetch the db config details and init the variables
getDBConfig()

module.exports = {
	connectionUrl,
	dbName,
	galleryCollectionName,
	user,
	userPassword,
}
