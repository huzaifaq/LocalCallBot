import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { CSSTransition } from 'react-transition-group'
import Sidebar from './Sidebar'
import Overlay from './Overlay'

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

const Header = () => {
	const [activeMenu, setActiveMenu] = useState(false)

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
							<MenuItem
								onClick={() => setActiveMenu(!activeMenu)}
							/>
							<MenuItem
								onClick={() => setActiveMenu(!activeMenu)}
							/>
							<MenuItem
								onClick={() => setActiveMenu(!activeMenu)}
							/>
							<MenuItem
								onClick={() => setActiveMenu(!activeMenu)}
							/>
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
