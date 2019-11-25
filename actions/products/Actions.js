import {
	REQUEST_PRODUCTS,
	RECEIVE_PRODUCTS,
	FAILED_PRODUCTS,
} from './ActionTypes'

export const requestProducts = () => ({
	type: REQUEST_PRODUCTS,
	payload: {
		isError: false,
		isFetching: true,
		isSuccess: false,
	},
})

export const receiveProducts = data => ({
	type: RECEIVE_PRODUCTS,
	payload: {
		isFetching: false,
		data,
		isSuccess: true,
	},
})
export const failedProducts = () => ({
	type: FAILED_PRODUCTS,
	payload: {
		isError: true,
		isFetching: false,
		isSuccess: false,
	},
})
