import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { CDN } from '../helpers/constants'

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
	margin-top: 20px;

	&:first-child {
		margin-top: 0px;
	}

	&:last-child {
		margin-bottom: 50px;
	}

	@media ${props => props.theme.mobileL} {
		min-height: 300px;
		padding: 0px 16px;
	}
`
const SectionHeading = styled.h1`
	z-index: ${props => props.theme.elementsAboveVideoZ};
	color: ${props => props.theme.textBlack};
	text-align: center;
	@media ${props => props.theme.mobileL} {
		font-size: 20px;
	}
`

const SectionParagraph = styled.p`
	z-index: ${props => props.theme.elementsAboveVideoZ};
	color: ${props => props.theme.textBlack};
	font-size: 20px;
	@media ${props => props.theme.mobileL} {
		font-size: 16px;
	}
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
					src={`${CDN}videos/engagement-rings-nb.mp4`}
					autoPlay
					muted
					loop
					ref={videoRef}
				/>
				<SectionHeading>Welcome to Crafted Jewellers</SectionHeading>
				<SectionParagraph>
					One stop for all of the finest jewellery services
				</SectionParagraph>
			</Section>
			<Section>
				<SectionHeading>Precious Stones</SectionHeading>
				<SectionParagraph>
					Need a perfect diamond for the ring? Checkout our collection
					of precious stones
				</SectionParagraph>
			</Section>
			<Section>
				<SectionHeading>Polishing</SectionHeading>
				<SectionParagraph>
					Is your jewellery looking old or needs cleaning? Polish your
					jewellery to make it look new
				</SectionParagraph>
			</Section>
			<Section>
				<SectionHeading>Repairing</SectionHeading>
				<SectionParagraph>
					Does your jewellery look out of shape? Have you lost a piece
					of the earring? Let us have a look
				</SectionParagraph>
			</Section>
		</React.Fragment>
	)
}

export default connect()(withLayout(Index))
