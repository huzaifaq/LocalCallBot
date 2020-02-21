import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { CSSTransition } from 'react-transition-group'
import Sidebar from './Sidebar'
import theme from '../themes'
import Overlay from './Overlay'

const HeaderWrapper = styled.div`
	position: sticky;
	display: flex;
	height: 60px;
	top: 0;
	background-color: ${props => props.theme.white};
	align-items: center;
	padding: 8px 16px;
	box-shadow: 0 0px 8px 0px ${props => props.theme.lightBrown};
	justify-content: center;
	z-index: ${props => props.theme.headerZ};
	user-select: none;
	border-bottom-left-radius: 40px;
	border-bottom-right-radius: 40px;
`
const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	max-width: ${props => props.theme.wrapperMaxWidth};
`
const LogoWrapper = styled.div`
	display: flex;
	height: 20px;
	max-width: 210px;
	@media ${props => props.theme.mobileL} {
		height: 60px;
		max-width: 100px;
	}
`
const LogoPicture = styled.picture``

const LogoImg = styled.img`
	cursor: pointer;
	height: 100%;
`

const MenuWrapper = styled.div`
	display: flex;
	align-items: center;
`
const MenuItem = styled.div`
	display: flex;
	margin: 10px 20px;
	cursor: pointer;
	&:hover {
		@media ${props => props.theme.laptop} {
			transform: scale(1.1);
		}
	}
`

const Header = () => {
	const [activeMenu, setActiveMenu] = useState(false)

	return (
		<React.Fragment>
			<HeaderWrapper>
				<HeaderContainer>
					<LogoWrapper>
						<Link href="/" prefetch={false}>
							<LogoPicture>
								<source
									media={theme.mobileL}
									srcSet="/images/icons/crafted-jewellers-192.png"
								/>
								<LogoImg
									src="/images/icons/crafted-jewellers-logo-594x60.png"
									alt="Logo"
								/>
							</LogoPicture>
						</Link>
					</LogoWrapper>
					<MenuWrapper>
						<Link href="/" prefetch={false}>
							<MenuItem>Home</MenuItem>
						</Link>
						<MenuItem onClick={() => setActiveMenu(!activeMenu)}>
							Products
						</MenuItem>
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
