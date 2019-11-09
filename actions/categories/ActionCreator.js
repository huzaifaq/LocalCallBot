import fetch from 'isomorphic-unfetch'
import { getBaseUrl } from '../../API/Basic'
import {
	requestCategories,
	receiveCategories,
	failedCategories,
} from './Actions'

export const fetchCategories = () => async dispatch => {
	try {
		dispatch(requestCategories())
		const res = await fetch(`${getBaseUrl()}api/categories`)
		const data = await res.json()
		dispatch(receiveCategories(data))
	} catch (error) {
		console.log('Error: Failed to fetch categories')
		console.error(error)
		dispatch(failedCategories())
	}
}

export default null
