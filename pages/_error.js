import React from 'react'
import PropTypes from 'prop-types'
import withLayout from '../components/Layout'

/**
 *
 * @param {*} ctx
 * @description checks whether response or error object in ctx has status code available to return, if not returns 404
 */
const checkContextforError = ctx => {
	if (ctx.res && ctx.res.statusCode) {
		return ctx.res.statusCode
	}
	if (ctx.err && ctx.err.statusCode) {
		return ctx.err.statusCode
	}
	return 404
}

const Error = ({ statusCode }) => {
	return (
		<p>
			{statusCode
				? `An ${statusCode} error occurred on server`
				: 'An error occurred on client'}
		</p>
	)
}

Error.getInitialProps = ctx => {
	const statusCode = checkContextforError(ctx)
	return { statusCode }
}

Error.propTypes = {
	statusCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
}

export default withLayout(Error)
