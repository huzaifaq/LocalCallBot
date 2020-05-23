import styled from 'styled-components'

const FooterWrapper = styled.div`
	display: flex;
	height: auto;
	background-color: ${props => props.theme.white};
	align-items: center;
	box-shadow: 0 0px 8px 0px ${props => props.theme.utility};
	justify-content: center;
	z-index: ${props => props.theme.HeaderZ};
	user-select: none;
	border-top-right-radius: 40px;
	border-top-left-radius: 40px;
	overflow: hidden;
`
const FooterContainer = styled.div`
	display: flex;
	width: 100%;
	max-width: ${props => props.theme.wrapperMaxWidth};
	justify-content: center;
	align-items: center;
	flex-direction: column;
`
const Footer = () => {
	return (
		<FooterWrapper>
			<FooterContainer>FOOTER</FooterContainer>
		</FooterWrapper>
	)
}

export default Footer
