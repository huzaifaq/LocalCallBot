import { REQUEST_SOUNDS, RECEIVE_SOUNDS, FAILED_SOUNDS } from './ActionTypes'

export const requestSounds = () => ({
	type: REQUEST_SOUNDS,
	payload: {
		isError: false,
		isFetching: true,
		isSuccess: false,
	},
})

export const receiveSounds = data => ({
	type: RECEIVE_SOUNDS,
	payload: {
		isFetching: false,
		data,
		isSuccess: true,
	},
})
export const failedSounds = () => ({
	type: FAILED_SOUNDS,
	payload: {
		isError: true,
		isFetching: false,
		isSuccess: false,
	},
})
