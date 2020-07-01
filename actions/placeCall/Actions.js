import {
	REQUEST_NUMBERS,
	RECEIVE_NUMBERS,
	FAILED_NUMBERS,
	REQUEST_PLACE_CALL,
	RECEIVE_PLACE_CALL,
	FAILED_PLACE_CALL,
	ACTIVE_CALL_NAME,
} from './ActionTypes'

export const requestNumbers = () => ({
	type: REQUEST_NUMBERS,
	payload: {
		isError: false,
		isFetching: true,
		isSuccess: false,
	},
})

export const receiveNumbers = data => ({
	type: RECEIVE_NUMBERS,
	payload: {
		isFetching: false,
		data,
		isSuccess: true,
	},
})

export const failedNumbers = () => ({
	type: FAILED_NUMBERS,
	payload: {
		isError: true,
		isFetching: false,
		isSuccess: false,
	},
})

export const requestPlaceCall = () => ({
	type: REQUEST_PLACE_CALL,
	payload: {
		isError: false,
		isFetching: true,
		isSuccess: false,
	},
})

export const receivePlaceCall = data => ({
	type: RECEIVE_PLACE_CALL,
	payload: {
		isFetching: false,
		data,
		isSuccess: true,
	},
})
export const failedPlaceCall = () => ({
	type: FAILED_PLACE_CALL,
	payload: {
		isError: true,
		isFetching: false,
		isSuccess: false,
	},
})

export const activeCallPlaced = activeNumber => ({
	type: ACTIVE_CALL_NAME,
	payload: {
		activeNumber,
	},
})
