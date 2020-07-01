/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'

import { MenuItemImage, MenuItemHoverPill, MenuItemWrapper } from './Style'

const MenuItem = ({ imageSrc, active, handleOnClick }) => {
	return (
		<MenuItemWrapper onClick={handleOnClick} active={active}>
			<MenuItemHoverPill active={active} />
			<MenuItemImage imageSrc={imageSrc} active={active} />
		</MenuItemWrapper>
	)
}

MenuItem.defaultProps = {
	imageSrc: {},
	active: false,
	handleOnClick: () => null,
}

MenuItem.propTypes = {
	imageSrc: PropTypes.string,
	active: PropTypes.bool,
	handleOnClick: PropTypes.func,
}

export default MenuItem
