import { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { sidebarTimeout } from '../helpers/constants'
import { convertToURLIdentifier, readIdentifierFromURL } from '../helpers/utils'

const SidebarWrapper = styled.div`
	background-color: white;
	position: absolute;
	width: 100%;
	max-width: 250px;
	right: 0;
	top: 96px;
	transition: all 0.2s ease-in;
	box-shadow: 0px 0px 2px 0px ${props => props.theme.utility};
	min-height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 40px 0px 0px 40px;
	user-select: none;
	z-index: ${props => props.theme.headerZ};

	&.fade-enter {
		right: -250px;
		opacity: 0;
	}

	&.fade-enter-active {
		right: 0;
		opacity: 1;
	}

	&.fade-exit {
		right: 0;
		opacity: 1;
	}

	&.fade-exit-active {
		right: -250px;
		opacity: 0;
	}
`

const SidebarContainer = styled.div`
	width: 80%;
`
const SidebarItem = styled.div`
	transition: font-size 0.1s ease-out;
	height: 60px;
	border-top: 1px solid ${props => props.theme.utility};
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	color: ${props =>
		props.active ? props.theme.activeText : props.theme.textBlack};
	font-size: ${props => (props.active ? '18px' : '16px')};

	&:hover {
		font-size: 18px;
	}
	&:first-child {
		border-top: 0px;
	}
`

let closeSidebarTimeout = null

const Sidebar = ({ closeSidebar }) => {
	const menus = ['Sounds', 'Status', 'Settings']
	const router = useRouter()
	const handleClearTimeout = () => {
		clearTimeout(closeSidebarTimeout)
	}

	const handleCloseSidebar = () => {
		closeSidebarTimeout = setTimeout(
			() => closeSidebar(false),
			sidebarTimeout
		)
	}

	useEffect(() => {
		handleClearTimeout()
		handleCloseSidebar()
		return () => handleClearTimeout()
	}, [])

	let currentView = null

	currentView = menus.map(category => (
		<Link
			href="/products/[category]"
			as={`/products/${convertToURLIdentifier(category)}`}
			key={category}
		>
			<SidebarItem
				active={
					readIdentifierFromURL(router.query.category) === category
				}
				onClick={() => closeSidebar(false)}
			>
				{category}
			</SidebarItem>
		</Link>
	))

	return (
		<SidebarWrapper
			onMouseLeave={handleCloseSidebar}
			onMouseEnter={handleClearTimeout}
		>
			<SidebarContainer>{currentView}</SidebarContainer>
		</SidebarWrapper>
	)
}

Sidebar.propTypes = {
	closeSidebar: PropTypes.func.isRequired,
}

export default Sidebar
