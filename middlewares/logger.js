const enableLogs = true

// const logger = store => next => action =>
const logger = () => next => action => {
	if (enableLogs)
		console.info(
			'\x1b[45m\x1b[30m%s\x1b[0m',
			` ${action.type || 'action creator '} `
		)

	const result = next(action)

	return result
}

export default logger
