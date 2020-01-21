import styled from 'styled-components'
import Link from 'next/link'

const FooterWrapper = styled.div`
	display: flex;
	height: auto;
	background-color: ${props => props.theme.white};
	align-items: center;
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
	flex-direction: column;
`

const LogoWrapper = styled.div`
	display: flex;
	flex: 1;
	padding: 20px 0;
	width: 100%;
	border-bottom: 1px solid ${props => props.theme.gray};
	border-top: 1px solid ${props => props.theme.gray};
	justify-content: center;
`
const Logo = styled.img`
	width: 140px;
	cursor: pointer;
`
const SectionWrapper = styled.section`
	display: flex;
	flex-direction: row;
	width: 100%;
	padding: 16px 0;
	@media ${props => props.theme.mobileL} {
		flex-direction: column;
	}
`

const SocialActionWrapper = styled.div`
	display: flex;
	flex: 0.5;
	justify-content: flex-start;
	@media ${props => props.theme.mobileL} {
		flex: 1;
		justify-content: center;
	}
`
const SocialActionContainer = styled.div``
const InfoWrapper = styled.div`
	display: flex;
	flex: 0.5;
	justify-content: flex-end;
	@media ${props => props.theme.mobileL} {
		flex: 1;
		justify-content: center;
	}
`
const InfoContainer = styled.div`
	padding: 0 20px;
`
const InfoHeading = styled.div``
const InfoAnchor = styled.a`
	display: flex;
	color: ${props => props.theme.textBlack};
	&:hover {
		color: ${props => props.theme.activeText};
	}
`

const TermsWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
`
const TermsContainer = styled(Link)``

const TermsAnchor = styled.a`
	cursor: pointer;
	color: ${props => props.theme.textBlack};
	text-decoration: underline;
`

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
				<SectionWrapper>
					<TermsWrapper>
						<TermsContainer
							href="/terms-and-conditions"
							prefetch={false}
						>
							<TermsAnchor>Terms and Conditions</TermsAnchor>
						</TermsContainer>
					</TermsWrapper>
				</SectionWrapper>
				<SectionWrapper>
					<SocialActionWrapper>
						<SocialActionContainer />
					</SocialActionWrapper>
					<InfoWrapper>
						<InfoContainer>
							<InfoHeading>
								For queries please contact any of the following
							</InfoHeading>
							<InfoAnchor href="tel: +919820062432">
								Tel: +91982006243
							</InfoAnchor>
							<InfoAnchor href="tel: +919930757552">
								Tel: +919930757552
							</InfoAnchor>
							<InfoAnchor
								title="Send mail to support@craftedjewellers.in"
								href="mailto: support@craftedjewellers.in"
							>
								support@craftedjewellers.in
							</InfoAnchor>
						</InfoContainer>
					</InfoWrapper>
				</SectionWrapper>
			</FooterContainer>
		</FooterWrapper>
	)
}

export default Footer
