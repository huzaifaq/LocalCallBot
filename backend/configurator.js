const fs = require('fs')
const path = require('path')

const fileLoc =
	process.env.NODE_ENV === 'production'
		? path.join(__dirname, '/../../dbConfig.json')
		: './dbConfig.json'

/**
 * @description Fetch the db config details and init the variables
 * @var connectionUrl
 * @var dbName
 * @var galleryCollectionName
 * @var categoriesCollectName
 * @var user
 * @var userPassword
 */
const getDBConfig = () => {
	try {
		const jsonData = fs.readFileSync(fileLoc, 'utf8')
		if (jsonData) {
			return JSON.parse(jsonData)
		}
		return {}
	} catch (error) {
		console.error('Error: Failed to parse/read db configuration file')
		console.error(error)
	}
	return {}
}

module.exports = {
	...getDBConfig(),
}
