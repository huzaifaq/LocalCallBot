import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import {
	sidebarTimeout,
	genericNoData,
	genericErrorMsg,
	Staticlinks,
	activeCallIdentifier,
} from '../helpers/constants'
import {
	fetchPhoneNumbers,
	placeCall,
} from '../actions/placeCall/ActionCreator'

const SidebarWrapper = styled.div`
	background-color: ${props => props.theme.backgroundDark};
	position: fixed;
	width: 100%;
	max-width: 250px;
	left: 72px;
	top: 0px;
	padding: 8px 0;
	transition: all 0.2s ease-in;
	height: 100%;
	display: flex;
	user-select: none;
	z-index: ${props => props.theme.sidebarZ};

	&.transition-enter {
		left: -322px;
	}

	&.transition-enter-active {
		left: 72px;
	}

	&.transition-exit {
		left: 72px;
	}

	&.transition-exit-active {
		left: -322px;
	}
`

const SidebarContainer = styled.div`
	width: 100%;
`

const SidebarItemWrapper = styled.div`
	transition: font-size 0.1s ease-out;
	height: 60px;
	display: flex;
	align-items: center;
	cursor: pointer;
	color: ${props =>
		props.active ? props.theme.activeText : props.theme.textWhite};
	background-color: ${props => props.theme.backgroundLight};
	font-size: ${props => (props.active ? '18px' : '16px')};
	margin: 8px 8px;
	&:hover {
		background-color: ${props => props.theme.backgroundLighter};
		color: ${props => props.theme.activeText};
	}
	&:first-child {
		margin-top: 10px;
	}
`
const SidebarItemText = styled.h2`
	color: ${props =>
		props.active ? props.theme.activeText : props.theme.textWhite};
	font-size: ${props => (props.active ? '18px' : '16px')};
`
const SidebarItemImage = styled.div`
	background-image: url('${p => p.imageSrc}');
	background-position: center;
  	background-repeat: no-repeat;
	background-size: cover;
	height: 48px;
	width: 48px;
	border-radius: 24px;
	margin: 0 8px;
	align-items: center;
`
const placeHolderShimmer = keyframes`
	0% {
		background-position: -468px 0;
	}

	100% {
		background-position: 100vw 0;
	}
`

const LoadingCardTemplate = styled.div`
	width: 100%;
	height: calc(100vh - 32px);
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
	display: inline-block;
	position: relative;
	animation: ${placeHolderShimmer} 1s linear infinite forwards;
`

const ErrorContainer = styled.div`
	width: 100%;
	height: 440px;
	align-items: center;
	justify-content: center;
	display: flex;
`

let closeSidebarTimeout = null

const Sidebar = ({ closeSidebar }) => {
	const { data, isError, isFetching, isSuccess } = useSelector(
		state => state.numbers
	)
	const dispatch = useDispatch()

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

	useEffect(() => {
		dispatch(fetchPhoneNumbers())
	}, [])

	let currentView = null
	if (isError) {
		currentView = <ErrorContainer>{genericErrorMsg}</ErrorContainer>
	} else if (isFetching || !isSuccess) {
		currentView = <LoadingCardTemplate />
	} else if (data && !data.length && isSuccess && !isFetching) {
		currentView = <ErrorContainer>{genericNoData}</ErrorContainer>
	} else if (data.length && !isFetching) {
		currentView = data.map(number => (
			<SidebarItemWrapper
				key={number.number}
				active={false}
				onClick={() => {
					closeSidebar(false)
					dispatch(placeCall(number.number))
				}}
			>
				<SidebarItemImage
					imageSrc={`${Staticlinks.CMS}${number.image.url}`}
				/>
				<SidebarItemText>{number.name}</SidebarItemText>
			</SidebarItemWrapper>
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
