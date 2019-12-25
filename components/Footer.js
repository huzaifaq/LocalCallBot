import styled from 'styled-components'
import Link from 'next/link'

const FooterWrapper = styled.div`
	display: flex;
	height: 60px;
	background-color: ${props => props.theme.white};
	align-items: center;
	padding: 8px 16px;
	box-shadow: 0 0px 8px 0px ${props => props.theme.gray};
	justify-content: center;
	z-index: ${props => props.theme.HeaderZ};
	user-select: none;
`
const FooterContainer = styled.div`
	display: flex;
	width: 100%;
	max-width: ${props => props.theme.wrapperMaxWidth};
	justify-content: center;
	align-items: center;
`

const LogoWrapper = styled.div``
const SocialActionWrapper = styled.div``
const SocialActionContainer = styled.div``
const InfoWrapper = styled.div``
const InfoContainer = styled.div``
const Logo = styled.img`
	width: 140px;
`
const InfoHeading = styled.div``
const InfoEmail = styled.a``
const Footer = () => {
	return (
		<FooterWrapper>
			<FooterContainer>
				<LogoWrapper>
					<Link href="/" prefetch={false}>
						<Logo
							src="/images/icons/crafted-jewellers-logo-594x60.png"
							alt="Logo"
						/>
					</Link>
				</LogoWrapper>
				<SocialActionWrapper>
					<SocialActionContainer />
				</SocialActionWrapper>
				<InfoWrapper>
					<InfoContainer>
						<InfoHeading />
						<InfoEmail />
					</InfoContainer>
				</InfoWrapper>
			</FooterContainer>
		</FooterWrapper>
	)
}

export default Footer
