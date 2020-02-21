import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styled, { keyframes } from 'styled-components'
import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types'

import withLayout from '../../../components/Layout'

const Index = props => {
	const dispatch = useDispatch()
	const router = useRouter()
	return (
		<React.Fragment>
			<h1>Products</h1>
			<ul>
				{/* {products.map(product => (
					<li key={product.id}>
						<Link
							href="/[category]/[id]"
							as={`/${product.category.toLowerCase()}/${product.id.toLowerCase()}`}
						>
							<div>{product.name}</div>
						</Link>
					</li>
				))} */}
			</ul>
		</React.Fragment>
	)
}

Index.defaultProps = {
	products: [],
}

Index.propTypes = {
	products: PropTypes.arrayOf(PropTypes.shape({})),
}

export default withLayout(Index)
