import {
	REQUEST_CATEGORIES,
	RECEIVE_CATEGORIES,
	FAILED_CATEGORIES,
} from './ActionTypes'

export const requestCategories = () => ({
	type: REQUEST_CATEGORIES,
	payload: {
		isError: false,
		isFetching: true,
	},
})

export const receiveCategories = categories => ({
	type: RECEIVE_CATEGORIES,
	payload: {
		isFetching: false,
		categories,
	},
})
export const failedCategories = () => ({
	type: FAILED_CATEGORIES,
	payload: {
		isError: true,
		isFetching: false,
	},
})
