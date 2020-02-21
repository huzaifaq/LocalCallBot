import styled from 'styled-components'
import PropTypes from 'prop-types'
import withLayout from '../components/Layout'

const ErrorWrapper = styled.p`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
`

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
		<ErrorWrapper>
			{statusCode
				? `An ${statusCode} error occurred on server`
				: 'An error occurred on client'}
		</ErrorWrapper>
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
