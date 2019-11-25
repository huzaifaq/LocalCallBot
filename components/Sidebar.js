import { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled, { keyframes } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import PropTypes from 'prop-types'
import {
	genericErrorMsg,
	genericNoData,
	sidebarTimeout,
} from '../helpers/constants'
import { convertToURLIdentifier, readIdentifierFromURL } from '../helpers/utils'

import { fetchCategories } from '../actions/categories/ActionCreator'

const SidebarWrapper = styled.div`
	background-color: white;
	position: absolute;
	width: 100%;
	max-width: 250px;
	right: 0;
	top: 84px;
	transition: all 0.2s ease-in;
	box-shadow: 0px 0px 2px 0px ${props => props.theme.gold};
	min-height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px 0px 0px 4px;
	user-select: none;

	&.fade-enter {
		@media ${props => props.theme.laptop} {
			right: -250px;
		}
		opacity: 0;
	}

	&.fade-enter-active {
		@media ${props => props.theme.laptop} {
			right: 0;
		}
		opacity: 1;
	}

	&.fade-exit {
		@media ${props => props.theme.laptop} {
			right: 0;
		}
		opacity: 1;
	}

	&.fade-exit-active {
		@media ${props => props.theme.laptop} {
			right: -250px;
		}
		opacity: 0;
	}
`

const SidebarContainer = styled.div`
	width: 80%;
`
const SidebarItem = styled.div`
	transition: font-size 0.1s ease-out;
	height: 60px;
	border-top: 1px solid ${props => props.theme.gold};
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

const placeHolderShimmer = keyframes`
	0% {
		background-position: -468px 0;
	}

	100% {
		background-position: 468px 0;
	}
`

const SidebarLoading = styled.div`
	width: 100%;
	height: 60px;
	margin: 8px 0px;
	background: #f6f7f8;
	background-image: linear-gradient(
		to right,
		#f6f7f8 0%,
		#e7e7e7 20%,
		#f6f7f8 40%,
		#f6f7f8 100%
	);
	background-repeat: no-repeat;
	background-size: 1400px auto;
	position: relative;
	animation: ${placeHolderShimmer} 1s linear infinite forwards;
`

let closeSidebarTimeout = null

const Sidebar = ({ closeSidebar }) => {
	const { data, isError, isFetching } = useSelector(state => state.categories)
	const dispatch = useDispatch()
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
		if (!data.length) dispatch(fetchCategories())
		return () => handleClearTimeout()
	}, [])

	let currentView = null

	if (isError) {
		currentView = genericErrorMsg
	} else if (isFetching) {
		currentView = (
			<React.Fragment>
				<SidebarLoading />
				<SidebarLoading />
				<SidebarLoading />
				<SidebarLoading />
				<SidebarLoading />
			</React.Fragment>
		)
	} else if (data && !data.length) {
		currentView = genericNoData
	} else {
		currentView = data.map(category => (
			<Link
				href="/products/[category]"
				as={`/products/${convertToURLIdentifier(category.name)}`}
				key={category.name}
			>
				<SidebarItem
					active={
						readIdentifierFromURL(router.query.category) ===
						category.name
					}
					onClick={() => closeSidebar(false)}
				>
					{category.name}
				</SidebarItem>
			</Link>
		))
	}

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
