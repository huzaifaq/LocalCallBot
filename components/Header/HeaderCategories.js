/* eslint-disable react/prop-types */
import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

import {
	genericNoData,
	genericErrorMsg,
	Staticlinks,
} from '../../helpers/constants'
import { LoadingCardTemplate } from './Style'
import MenuItem from './MenuItem'

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
				<div className="todo_remove">
					<MenuItem
						imageSrc={Staticlinks.CMS + category.image.url}
						active={query === category.name}
					/>
				</div>
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
	data: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			image: PropTypes.shape({}),
		})
	),
}

export default HeaderCategories
