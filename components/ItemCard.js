import styled from 'styled-components'
import Link from 'next/link'
import PropTypes from 'prop-types'

const CardWrapper = styled.div`
	width: 350px;
	height: 450px;
	margin: 8px;
	cursor: pointer;
	border-radius: 8px;
	box-shadow: 0 0px 8px 0px ${props => props.theme.gray};
	background-color: ${props => props.theme.gray};
	border: 1px solid ${props => props.theme.gray};
`
const CardContainer = styled.div``
const CardImageWrapper = styled.div``
const CardImage = styled.img``
const CardInfoWrapper = styled.div``
const CardInfoHeading = styled.div``
const CardInfoDescription = styled.div``

const ItemCard = props => {
	const { category, itemId, imgPath, description, heading } = props

	return (
		<Link href="/[category]/[item]" as={`/${category}/${itemId}`}>
			<CardWrapper>
				<CardContainer>
					<CardImageWrapper>
						<CardImage src={imgPath} alt={itemId} />
					</CardImageWrapper>
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
