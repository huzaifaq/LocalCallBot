import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styled, { keyframes } from 'styled-components'

import withLayout from '../components/Layout'
import { fetchSounds, playSound } from '../actions/sounds/ActionCreator'
import { genericNoData, genericErrorMsg } from '../helpers/constants'
import { readIdentifierFromURL } from '../helpers/utils'

const PageWrapper = styled.div`
	background-color: ${props => props.theme.background};
	justify-items: center;
	align-items: center;
	display: block;
`
const ItemListWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, 120px);
	grid-auto-rows: 1fr;
	row-gap: 25px;
	column-gap: 20px;
	justify-content: center;
`

const ItemCardWrapper = styled.div`
	display: flex;
	text-align: center;
	align-items: center;
	min-height: 180px;
	width: 120px;
	background-color: ${props => props.theme.backgroundLight};
	flex-direction: column;
`

const ItemCardHeader = styled.h2`
	color: white;
	margin: 0;
	font-size: 13px;
`

const ItemCardImage = styled.div`
	background-image: url('${p => p.imageSrc}');
	background-position: center;
  	background-repeat: no-repeat;
	background-size: cover;
	clip-path: circle(52px at 50% 50%);
	width: 120px;
	height: 120px;
	transition: 0.25s ease-in;
	margin: 0;
	overflow: hidden;
	&:hover {
		clip-path: circle(100% at 50% 50%);
		transform: scale(1.1);
	}
`

const ItemCardImageWrapper = styled.div`
	width: 120px;
	height: 120px;
	display: flex;
	margin: 0;
	overflow: hidden;
`

const ErrorContainer = styled.div`
	width: 100%;
	height: 440px;
	align-items: center;
	justify-content: center;
	display: flex;
`

const placeHolderShimmer = keyframes`
	0% {
		background-position: -468px 0;
	}

	100% {
		background-position: 100vw 0;
	}
`

const LoadingCardTemplate = styled.div`
	width: 100%;
	height: calc(100vh - 32px);
	background: #f6f7f8;
	background-image: linear-gradient(
		to right,
		#f6f7f8 0%,
		#e7e7e7 20%,
		#f6f7f8 40%,
		#f6f7f8 100%
	);
	background-repeat: no-repeat;
	background-size: 1400px auto;
	display: inline-block;
	position: relative;
	animation: ${placeHolderShimmer} 1s linear infinite forwards;
`

const Index = () => {
	const { data, isError, isFetching, isSuccess } = useSelector(
		state => state.sounds
	)
	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		dispatch(fetchSounds(readIdentifierFromURL(router.query.category)))
	}, [router.query.category])

	const fireSound = assetLink => {
		dispatch(playSound(assetLink))
	}

	let view = null
	if (isError) {
		view = <ErrorContainer>{genericErrorMsg}</ErrorContainer>
	} else if (isFetching || !isSuccess) {
		view = <LoadingCardTemplate />
	} else if (data && !data.length && isSuccess && !isFetching) {
		view = <ErrorContainer>{genericNoData}</ErrorContainer>
	} else if (data.length && !isFetching) {
		view = (
			<ItemListWrapper>
				{data.map(sounds => (
					<ItemCardWrapper
						key={sounds.name}
						onClick={() =>
							fireSound(
								`https://cms.huzaifa.info${sounds.assetLink.url}`
							)
						}
					>
						<ItemCardImageWrapper>
							<ItemCardImage
								imageSrc={`https://cms.huzaifa.info${sounds.image.url}`}
							/>
						</ItemCardImageWrapper>
						<ItemCardHeader>{sounds.name}</ItemCardHeader>
					</ItemCardWrapper>
				))}
			</ItemListWrapper>
		)
	}

	return <PageWrapper>{view}</PageWrapper>
}

export default withLayout(Index)
