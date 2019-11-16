import { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import PropTypes from 'prop-types'

import { fetchCategories } from '../actions/categories/ActionCreator'

const SidebarWrapper = styled.div`
	background-color: white;
	position: absolute;
	width: 100%;
	max-width: 250px;
	right: 0;
	top: 84px;
	transition: opacity 0.2s ease-in;
	box-shadow: 0px 0px 8px 0px ${props => props.theme.gray};
	min-height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px 0px 0px 4px;
	user-select: none;

	&.fade-enter {
		opacity: 0;
	}

	&.fade-enter-active {
		opacity: 1;
	}

	&.fade-exit {
		opacity: 1;
	}

	&.fade-exit-active {
		opacity: 0;
	}
`

const SidebarContainer = styled.div`
	width: 80%;
`
const SidebarItem = styled.div`
	transition: font-size 0.1s ease-out;
	height: 60px;
	border-top: 1px solid ${props => props.theme.lightGray};
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

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

const Sidebar = ({ closeSidebar }) => {
	const { data, isError, isFetching } = useSelector(state => state.categories)
	const dispatch = useDispatch()
	let closeSidebarTimeout = null

	const handleClearTimeout = () => {
		clearTimeout(closeSidebarTimeout)
	}

	useEffect(() => {
		if (!data.length) dispatch(fetchCategories())
	}, [])

	const handleCloseSidebar = () => {
		closeSidebarTimeout = setTimeout(() => closeSidebar(false), 1000)
	}

	let currentView = null

	if (isError) {
		currentView = 'Something went wrong :('
	}

	if (isFetching) {
		currentView = (
			<SidebarWrapper>
				<SidebarContainer>
					<SidebarLoading />
					<SidebarLoading />
					<SidebarLoading />
					<SidebarLoading />
					<SidebarLoading />
				</SidebarContainer>
			</SidebarWrapper>
		)
	}

	if (data && !data.length) {
		currentView = 'No Categories Available'
	} else {
		currentView = data.map(category => (
			<Link
				href='/products/[category]'
				as={`/products/${category.name}`}
				key={category.name}
			>
				<SidebarItem>{category.name}</SidebarItem>
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
