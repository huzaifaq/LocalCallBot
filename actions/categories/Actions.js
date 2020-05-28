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
		isSuccess: false,
	},
})

export const receiveCategories = data => ({
	type: RECEIVE_CATEGORIES,
	payload: {
		isFetching: false,
		data,
		isSuccess: true,
	},
})
export const failedCategories = () => ({
	type: FAILED_CATEGORIES,
	payload: {
		isError: true,
		isFetching: false,
		isSuccess: false,
	},
})
