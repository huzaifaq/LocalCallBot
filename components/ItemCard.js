import styled, { keyframes } from 'styled-components'
import Link from 'next/link'
import PropTypes from 'prop-types'
import theme from '../themes'
import { convertToURLIdentifier } from '../helpers/utils'

const fadeIn = keyframes`
	from {
		opacity: 0;
		margin-top: 80px;
  	}

	to {
		opacity: 1;
		margin-top: 40px;
	}
`
const CardWrapper = styled.div`
	width: 350px;
	height: 450px;
	margin: 40px 12px 0;
	cursor: pointer;
	border-radius: 8px;
	box-shadow: 0 0px 8px 0px ${props => props.theme.gray};
	background-color: ${props => props.theme.white};
	border: 1px solid ${props => props.theme.gray};
	animation: ${fadeIn} 0.3s ease-in;
	overflow: hidden;
	@media ${props => props.theme.mobileS} {
		width: 300px;
	}
	@media ${props => props.theme.mobileL} {
		width: 320px;
	}
	&:hover {
		transform: scale(1.01);
		border-color: ${props => props.theme.gold};
	}
`
const CardContainer = styled.div``
const CardPictureWrapper = styled.div`
	height: 350px;
`
const CardPicture = styled.picture``
const CardInfoWrapper = styled.div`
	width: 100;
	height: 100%;
	padding: 20px;
`
const CardInfoHeading = styled.div`
	font-weight: bold;
	color: ${props => props.theme.textBlack};
`
const CardInfoDescription = styled.div`
	font-size: 14px;
	padding-top: 8px;
`

const ItemCard = props => {
	const { category, itemId, imgPath, description, heading } = props
	return (
		<Link
			href="/[category]/[item]"
			as={`/${convertToURLIdentifier(category)}/${convertToURLIdentifier(
				itemId
			)}`}
		>
			<CardWrapper>
				<CardContainer>
					<CardPictureWrapper>
						<CardPicture>
							<source
								media={theme.mobileS}
								data-srcset="https://via.placeholder.com/300x350/000000.png?text=Dummy+Jewellery+Image"
							/>
							<source
								media={theme.mobileL}
								data-srcset="https://via.placeholder.com/320x350/000000.png?text=Dummy+Jewellery+Image"
							/>
							<source
								media={theme.desktop}
								data-srcset="https://via.placeholder.com/350x350/000000.png?text=Dummy+Jewellery+Image"
							/>
							<img
								data-src="https://via.placeholder.com/350x350/000000.png?text=Dummy+Jewellery+Image"
								alt={heading}
								className="lazyload"
							/>
						</CardPicture>
					</CardPictureWrapper>
					<CardInfoWrapper>
						<CardInfoHeading>{heading}</CardInfoHeading>
						<CardInfoDescription>{description}</CardInfoDescription>
					</CardInfoWrapper>
				</CardContainer>
			</CardWrapper>
		</Link>
	)
}

ItemCard.defaultProps = {
	category: '',
	itemId: '',
	imgPath: '',
	description: '',
	heading: '',
}

ItemCard.propTypes = {
	category: PropTypes.string,
	itemId: PropTypes.string,
	imgPath: PropTypes.string,
	description: PropTypes.string,
	heading: PropTypes.string,
}

export default ItemCard
