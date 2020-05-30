import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styled, { keyframes } from 'styled-components'

import withLayout from '../components/Layout'
import { fetchSounds } from '../actions/sounds/ActionCreator'
import { genericNoData, genericErrorMsg } from '../helpers/constants'
import { readIdentifierFromURL } from '../helpers/utils'

const PageWrapper = styled.div`
	background-color: ${props => props.theme.lightGray};
	justify-items: center;
	align-items: center;
	display: flex;
`
const ItemListWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 10px;
	grid-auto-rows: minmax(100px, auto);
`

const ItemCardWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 40px;
	height: 260px;
	width: 260px;
	border: 1px solid red;
	margin: 10px;
	margin-bottom: 40px;
`

const ImageCardWrapper = styled.div`
	background-image: url('${p => p.imageSrc}');
	background-position: center;
  	background-repeat: no-repeat;
	background-size: cover;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	position: relative;
	border: 1px solid red;
	h2 {
		color: Red;
		z-index: 1;
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
	}

	if (isFetching || !isSuccess) {
		view = <LoadingCardTemplate />
	}

	if (data && !data.length && isSuccess && !isFetching) {
		view = <ErrorContainer>{genericNoData}</ErrorContainer>
	}

	if (data.length && !isFetching) {
		view = (
			<ItemListWrapper>
				{data.map(sounds => (
					<ItemCardWrapper key={sounds.name}>
						<ImageCardWrapper imageSrc={sounds.image}>
							<h2>{sounds.name}</h2>
						</ImageCardWrapper>
					</ItemCardWrapper>
				))}
			</ItemListWrapper>
		)
	}

	return <PageWrapper>{view}</PageWrapper>
}

export default withLayout(Index)
