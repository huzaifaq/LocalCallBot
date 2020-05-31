import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styled, { keyframes } from 'styled-components'

import withLayout from '../components/Layout'
import { fetchSounds } from '../actions/sounds/ActionCreator'
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
	grid-template-columns: repeat(auto-fill, 160px);
	row-gap: 25px;
	column-gap: 20px;
	justify-content: center;
`

const ItemCardWrapper = styled.div`
	display: flex;
	text-align: center;
	align-items: center:
	height: 200px;
	width: 160px;
	background-color: ${props => props.theme.backgroundLight};
	flex-direction: column;
`

const ItemCardHeader = styled.h2`
	color: red;
	margin: 0;
`

const ItemCardImage = styled.div`
	background-image: url('${p => p.imageSrc}');
	background-position: center;
  	background-repeat: no-repeat;
	background-size: cover;
	width: 140px;
	height: 140px;
	display: flex;
	border-radius: 80px;
	transition: 0.25s ease-in;
	margin: 10px auto 0 auto;
	&:hover {
		@media ${props => props.theme.laptop} {
			border-radius: 0px;
			width: 160px;
		}
	}
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

	let view = null
	if (isError) {
		view = <ErrorContainer>{genericErrorMsg}</ErrorContainer>
	} else if (isFetching || !isSuccess) {
		view = (
			<ItemListWrapper>
				<LoadingCardTemplate />
			</ItemListWrapper>
		)
	} else if (data && !data.length && isSuccess && !isFetching) {
		view = <ErrorContainer>{genericNoData}</ErrorContainer>
	} else if (data.length && !isFetching) {
		view = (
			<ItemListWrapper>
				{data.map(sounds => (
					<ItemCardWrapper key={sounds.name}>
						<ItemCardImage imageSrc={sounds.image} />
						<ItemCardHeader>{sounds.name}</ItemCardHeader>
					</ItemCardWrapper>
				))}
			</ItemListWrapper>
		)
	}

	return <PageWrapper>{view}</PageWrapper>
}

export default withLayout(Index)
