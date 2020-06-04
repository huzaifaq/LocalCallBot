import {
	REQUEST_SOUNDS,
	RECEIVE_SOUNDS,
	FAILED_SOUNDS,
	REQUEST_SOUNDS_PLAY,
	RECEIVE_SOUNDS_PLAY,
	FAILED_SOUNDS_PLAY,
	ACTIVE_SOUND_NAME,
} from './ActionTypes'

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

export const requestSoundPlay = () => ({
	type: REQUEST_SOUNDS_PLAY,
	payload: {
		isError: false,
		isFetching: true,
		isSuccess: false,
	},
})

export const receiveSoundPlay = data => ({
	type: RECEIVE_SOUNDS_PLAY,
	payload: {
		isFetching: false,
		data,
		isSuccess: true,
	},
})
export const failedSoundPlay = () => ({
	type: FAILED_SOUNDS_PLAY,
	payload: {
		isError: true,
		isFetching: false,
		isSuccess: false,
	},
})

export const activeSoundPlaying = activeUrl => ({
	type: ACTIVE_SOUND_NAME,
	payload: {
		activeUrl,
	},
})
