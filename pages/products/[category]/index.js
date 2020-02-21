import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styled, { keyframes } from 'styled-components'

import withLayout from '../../../components/Layout'
import { fetchProducts } from '../../../actions/products/ActionCreator'
import ItemCard from '../../../components/ItemCard'
import { genericNoData, genericErrorMsg } from '../../../helpers/constants'
import { readIdentifierFromURL } from '../../../helpers/utils'

const ItemCardWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-bottom: 40px;
`

const ErrorContainer = styled.div`
	height: 440px;
	align-items: center;
	display: flex;
`

const placeHolderShimmer = keyframes`
	0% {
		background-position: -468px 0;
	}

	100% {
		background-position: 468px 0;
	}
`

const LoadingCardTemplate = styled.div`
	width: 350px;
	height: 450px;
	margin: 40px 12px 0;
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
		state => state.products
	)
	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		dispatch(fetchProducts(readIdentifierFromURL(router.query.category)))
	}, [router.query.category])

	if (isError) {
		return (
			<ItemCardWrapper>
				<ErrorContainer>{genericErrorMsg}</ErrorContainer>
			</ItemCardWrapper>
		)
	}

	if (isFetching || !isSuccess) {
		return (
			<ItemCardWrapper>
				<LoadingCardTemplate />
				<LoadingCardTemplate />
				<LoadingCardTemplate />
				<LoadingCardTemplate />
				<LoadingCardTemplate />
				<LoadingCardTemplate />
			</ItemCardWrapper>
		)
	}

	if (data && !data.length && isSuccess) {
		return (
			<ItemCardWrapper>
				<ErrorContainer>{genericNoData}</ErrorContainer>
			</ItemCardWrapper>
		)
	}

	return data.length ? (
		<ItemCardWrapper>
			{data.map(product => {
				return (
					<ItemCard
						category={product.category}
						heading={product.name}
						description={product.description}
						itemId={product.name}
						key={product.name}
					/>
				)
			})}
		</ItemCardWrapper>
	) : null
}

export default withLayout(Index)
