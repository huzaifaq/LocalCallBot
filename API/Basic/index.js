import env from '../../env'

const getBaseUrl = () => {
	const protocol = env.PROTOCOL === 'HTTP2' ? 'https://' : 'http://'
	switch (env.TIER) {
		case 'production':
			return 'https://soundlocalbot.in/'
		case 'dev':
		default:
			return `${protocol}localhost:${env.PORT}/`
	}
}

module.exports = getBaseUrl
