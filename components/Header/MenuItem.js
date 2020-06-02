/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'

import { MenuItemImage, MenuItemHoverPill, MenuItemWrapper } from './Style'

const MenuItem = ({ imageSrc, active }) => {
	return (
		<MenuItemWrapper active={active}>
			<MenuItemHoverPill active={active} />
			<MenuItemImage
				imageSrc={`https://cms.huzaifa.info${imageSrc.url}`}
				active={active}
			/>
		</MenuItemWrapper>
	)
}

MenuItem.defaultProps = {
	imageSrc: {},
	active: false,
}

MenuItem.propTypes = {
	imageSrc: PropTypes.shape({
		url: PropTypes.string,
	}),
	active: PropTypes.bool,
}

export default MenuItem
