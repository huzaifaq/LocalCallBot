module.exports = {
	getBaseUrl: () => {
		switch (process.env.TIER) {
			case 'dev':
				return 'http://localhost:3000/'
			case 'production':
				return 'https://craftedjewellers.in/'
			default:
				return 'http://localhost:3000/'
		}
	},
}
