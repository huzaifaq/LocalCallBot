import env from '../../env'

export const getBaseAPIUrl = () => {
	const protocol = env.PROTOCOL === 'HTTP2' ? 'https://' : 'http://'
	switch (env.TIER) {
		case 'production':
			return 'https://bot.huzaifa.info'
		case 'dev':
		default:
			return `${protocol}localhost:${env.PORT}`
	}
}

export const getExternalAPIUrl = () => {
	switch (env.TIER) {
		case 'production':
			return 'https://cms.huzaifa.info'
		case 'dev':
		default:
			return 'https://cms.huzaifa.info'
	}
}
