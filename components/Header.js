import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import Link from 'next/link'
import { CSSTransition } from 'react-transition-group'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Sidebar from './Sidebar'
import Overlay from './Overlay'
import { fetchCategories } from '../actions/categories/ActionCreator'
import { genericNoData, genericErrorMsg } from '../helpers/constants'

const HeaderWrapper = styled.div`
	display: flex;
	width: 60px;
	height: calc(100vh - 16px);
	top: 0;
	background-color: ${props => props.theme.white};
	align-items: center;
	padding: 8px;
	box-shadow: 0 0px 8px 0px ${props => props.theme.utility};
	justify-content: center;
	z-index: ${props => props.theme.headerZ};
	user-select: none;
	position: sticky;
`
const HeaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	max-width: ${props => props.theme.wrapperMaxWidth};
`

const MenuWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
`

const MenuTopSpace = styled.div``
const MenuBottomSpace = styled.div``
const MenuCentreSpace = styled.div``

const MenuItem = styled.div`
	display: flex;
	width: 40px;
	height: 40px;
	border: 1px solid gray;
	margin: 10px 20px;
	cursor: pointer;
	&:hover {
		@media ${props => props.theme.laptop} {
			transform: scale(1.1);
		}
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

const LoadingCardTemplate = styled.div`
	width: 40px;
	height: 40px;
	border: 1px solid gray;
	margin: 10px 20px;
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
	display: flex;
	position: relative;
	animation: ${placeHolderShimmer} 1s linear infinite forwards;
`

const Header = () => {
	const [activeMenu, setActiveMenu] = useState(false)
	const { data, isError, isFetching, isSuccess } = useSelector(
		state => state.categories
	)
	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		dispatch(fetchCategories())
	}, [])

	return (
		<React.Fragment>
			<HeaderWrapper>
				<HeaderContainer>
					<MenuWrapper>
						<MenuTopSpace>
							<Link href="/" prefetch={false}>
								<MenuItem />
							</Link>
							<MenuItem
								onClick={() => setActiveMenu(!activeMenu)}
							/>
						</MenuTopSpace>
						<MenuCentreSpace>
							{isError && { genericErrorMsg }}
							{data &&
								!data.length &&
								isSuccess && { genericNoData }}
							{(isFetching || !isSuccess) && (
								<React.Fragment>
									<LoadingCardTemplate />
									<LoadingCardTemplate />
									<LoadingCardTemplate />
									<LoadingCardTemplate />
								</React.Fragment>
							)}
							{data.length &&
								data.map(category => (
									<Link href={`/?category=${category.name}`}>
										<MenuItem>{category.name}</MenuItem>
									</Link>
								))}
						</MenuCentreSpace>
						<MenuBottomSpace>
							<MenuItem
								onClick={() => setActiveMenu(!activeMenu)}
							/>
						</MenuBottomSpace>
					</MenuWrapper>
					<CSSTransition
						in={activeMenu}
						classNames="fade"
						timeout={300}
						unmountOnExit
						mountOnEnter
					>
						<Sidebar closeSidebar={setActiveMenu} />
					</CSSTransition>
				</HeaderContainer>
			</HeaderWrapper>
			<CSSTransition
				in={activeMenu}
				classNames="fade"
				timeout={300}
				unmountOnExit
				mountOnEnter
			>
				<Overlay onClick={() => setActiveMenu(!activeMenu)} />
			</CSSTransition>
		</React.Fragment>
	)
}

export default Header
