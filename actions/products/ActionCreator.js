import fetch from 'isomorphic-unfetch'
import { getBaseUrl } from '../../API/Basic'
import { requestProducts, receiveProducts, failedProducts } from './Actions'

export const fetchProducts = category => async dispatch => {
	try {
		dispatch(requestProducts())
		const res = await fetch(
			`${getBaseUrl()}api/products?category=${encodeURIComponent(
				category
			)}`
		)
		if (res.status === 200) {
			const data = await res.json()
			dispatch(receiveProducts(data))
			return
		}
		throw res
	} catch (error) {
		console.log('Error: Failed to fetch products')
		console.error(error)
		dispatch(failedProducts())
	}
}

export default null
