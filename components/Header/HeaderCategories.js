/* eslint-disable react/prop-types */
import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

import { genericNoData, genericErrorMsg } from '../../helpers/constants'
import { LoadingCardTemplate, MenuItem } from './Style'

const HeaderCategories = ({ isError, data, isFetching, isSuccess, query }) => {
	if (isError) {
		return <React.Fragment>{genericErrorMsg}</React.Fragment>
	}

	if (data && !data.length && isSuccess) {
		return <React.Fragment>{genericNoData}</React.Fragment>
	}

	if (isFetching || !isSuccess) {
		return (
			<React.Fragment>
				<LoadingCardTemplate />
				<LoadingCardTemplate />
				<LoadingCardTemplate />
				<LoadingCardTemplate />
			</React.Fragment>
		)
	}

	if (data.length && !isFetching) {
		return data.map(category => (
			<Link key={category.name} href={`/?category=${category.name}`}>
				<MenuItem
					imageSrc={category.image}
					active={query === category.name}
				/>
			</Link>
		))
	}

	return null
}

HeaderCategories.defaultProps = {
	isError: false,
	isSuccess: false,
	isFetching: false,
	data: [],
}

HeaderCategories.propTypes = {
	isError: PropTypes.bool,
	isSuccess: PropTypes.bool,
	isFetching: PropTypes.bool,
	data: PropTypes.shape({}),
}

export default HeaderCategories
