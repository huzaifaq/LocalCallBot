import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'

import withLayout from '../components/Layout'

const SlideIn = keyframes`
	from {
		margin-top: 50px;
  	}

	to {
		margin-top: 0px;
	}
`

const Section = styled.section`
	background-color: ${props => props.theme.white};
	min-height: 500px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	animation: ${SlideIn} 0.3s ease-in;
	position: relative;
	@media ${props => props.theme.mobileL} {
		min-height: 300px;
	}
`
const SectionHeading = styled.h1`
	z-index: ${props => props.theme.elementsAboveVideoZ};
	color: ${props => props.theme.textBlack};
	text-align: center;
`

const SectionParagraph = styled.p`
	z-index: ${props => props.theme.elementsAboveVideoZ};
	color: ${props => props.theme.textBlack};
	font-size: 20px;
`

const SectionVideo = styled.video`
	width: 100%;
	position: absolute;
	z-index: ${props => props.theme.backgroundVideoZ};
	object-fit: cover;
	height: 100%;
`

const Index = () => {
	const videoRef = React.createRef()

	useEffect(() => {
		videoRef.current.playbackRate = 0.4
	}, [])

	return (
		<React.Fragment>
			<Section>
				<SectionVideo
					src="https://d1lacrj6vu9hj5.cloudfront.net/videos/engagement-rings-nb.mp4"
					autoPlay
					muted
					loop
					ref={videoRef}
				/>
				<SectionHeading>Welcome to Crafted Jewellers</SectionHeading>
				<SectionParagraph>
					One stop for all of the finest jewellery
				</SectionParagraph>
			</Section>
		</React.Fragment>
	)
}

const mapStateToProps = () => {
	return {}
}

export default connect(mapStateToProps)(withLayout(Index))
