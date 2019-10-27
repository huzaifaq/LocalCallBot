import styled from 'styled-components'

const HeaderWrapper = styled.div`
	position: sticky;
	display: flex;
	height: 60px;
	top: 0;
	background-color: ${props => props.theme.white};
`

const HeaderContainer = styled.div``

const Header = () => (
	<HeaderWrapper>
		<HeaderContainer>HI THIS IS A HEADER</HeaderContainer>
	</HeaderWrapper>
)

export default Header
