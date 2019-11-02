import styled from 'styled-components'
import Link from 'next/link'

const HeaderWrapper = styled.div`
	position: sticky;
	display: flex;
	height: 60px;
	top: 0;
	background-color: ${props => props.theme.white};
	align-items: center;
	padding: 8px 16px;
	box-shadow: 0 0px 8px 0px ${props => props.theme.grey};
`

const HeaderContainer = styled.div``
const LogoWrapper = styled.div``
const Logo = styled.img`
	width: 140px;
	cursor: pointer;
`

const Header = () => (
	<HeaderWrapper>
		<HeaderContainer>
			<LogoWrapper>
				<Link href="/">
					<Logo src="/images/icons/jz-jewels-logo.png" alt="Logo" />
				</Link>
			</LogoWrapper>
		</HeaderContainer>
	</HeaderWrapper>
)

export default Header
