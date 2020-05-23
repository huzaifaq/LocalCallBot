import { REQUEST_STATUS, RECEIVE_STATUS, FAILED_STATUS } from './ActionTypes'

export const requestStatus = () => ({
	type: REQUEST_STATUS,
	payload: {
		isError: false,
		isFetching: true,
		isSuccess: false,
	},
})

export const receiveStatus = data => ({
	type: RECEIVE_STATUS,
	payload: {
		isFetching: false,
		data,
		isSuccess: true,
	},
})
export const failedStatus = () => ({
	type: FAILED_STATUS,
	payload: {
		isError: true,
		isFetching: false,
		isSuccess: false,
	},
})
